"use server";

import dbConnect from "@/lib/mongodb";
import { Message, Conversation, Inquiry } from "@/models/messaging";
import { SportsAcademy, SportsTalent } from "@/models/sports";
import { ActionResponse } from "@/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail, emailTemplates } from "@/lib/email";

// Send inquiry to academy or talent
export async function sendInquiry(
  targetType: "Academy" | "Talent",
  targetId: string,
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to send an inquiry",
      };
    }

    await dbConnect();

    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const preferredContact = formData.get("preferredContact") as string;

    if (!subject || !message) {
      return {
        success: false,
        message: "Subject and message are required",
      };
    }

    // Get target information and owner
    let target;
    let targetOwner;
    
    if (targetType === "Academy") {
      target = await SportsAcademy.findById(targetId).populate("createdBy", "name email");
      targetOwner = target?.createdBy;
    } else {
      target = await SportsTalent.findById(targetId).populate("user", "name email");
      targetOwner = target?.user;
    }

    if (!target || !targetOwner) {
      return {
        success: false,
        message: `${targetType} not found`,
      };
    }

    // Create inquiry
    const inquiry = new Inquiry({
      from: session.user.id,
      to: targetOwner._id,
      targetType,
      targetId,
      subject,
      message,
      contactInfo: {
        phone: phone || undefined,
        email: email || undefined,
        preferredContact: preferredContact || "platform",
      },
    });

    await inquiry.save();

    // Send email notification to target owner
    try {
      await sendEmail({
        to: targetOwner.email,
        subject: `New Inquiry: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📩 New Inquiry Received</h1>
            </div>
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1f2937; margin-top: 0;">Hello ${targetOwner.name}!</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                You have received a new inquiry about your ${targetType.toLowerCase()}: <strong>${target.name || "profile"}</strong>
              </p>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Inquiry Details</h3>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Message:</strong></p>
                <p style="color: #4b5563; font-style: italic; background-color: #f9fafb; padding: 15px; border-radius: 6px; line-height: 1.6;">
                  ${message}
                </p>
                ${phone ? `<p style="color: #4b5563; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ""}
                ${email ? `<p style="color: #4b5563; margin: 5px 0;"><strong>Email:</strong> ${email}</p>` : ""}
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/messages" 
                   style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  View & Respond
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                <strong>GLBiashara Sports Team</strong>
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send inquiry notification email:", emailError);
    }

    revalidatePath("/messages");

    return {
      success: true,
      message: "Inquiry sent successfully! You will be notified when they respond.",
    };
  } catch (error) {
    console.error("Error sending inquiry:", error);
    return {
      success: false,
      message: "Failed to send inquiry. Please try again.",
    };
  }
}

// Get user's conversations
export async function getUserConversations() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    await dbConnect();

    const conversations = await Conversation.find({
      participants: session.user.id,
      isActive: true,
    })
      .populate("participants", "name email image")
      .populate("lastMessage")
      .populate("relatedAcademy", "name slug")
      .populate("relatedTalent", "user")
      .sort({ lastMessageAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(conversations));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

// Get user's inquiries
export async function getUserInquiries() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { sent: [], received: [] };
    }

    await dbConnect();

    const [sentInquiries, receivedInquiries] = await Promise.all([
      Inquiry.find({ from: session.user.id })
        .populate("to", "name email")
        .sort({ createdAt: -1 })
        .lean(),
      Inquiry.find({ to: session.user.id })
        .populate("from", "name email")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return {
      sent: JSON.parse(JSON.stringify(sentInquiries)),
      received: JSON.parse(JSON.stringify(receivedInquiries)),
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return { sent: [], received: [] };
  }
}

// Start conversation from inquiry
export async function startConversationFromInquiry(
  inquiryId: string
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to start a conversation",
      };
    }

    await dbConnect();

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return {
        success: false,
        message: "Inquiry not found",
      };
    }

    // Check if user is involved in this inquiry
    if (inquiry.from.toString() !== session.user.id && inquiry.to.toString() !== session.user.id) {
      return {
        success: false,
        message: "Unauthorized to access this inquiry",
      };
    }

    // Check if conversation already exists
    if (inquiry.conversation) {
      return {
        success: true,
        message: "Conversation already exists",
      };
    }

    // Create new conversation
    const conversation = new Conversation({
      participants: [inquiry.from, inquiry.to],
      type: inquiry.targetType === "Academy" ? "academy_user" : "talent_user",
      subject: inquiry.subject,
      relatedAcademy: inquiry.targetType === "Academy" ? inquiry.targetId : undefined,
      relatedTalent: inquiry.targetType === "Talent" ? inquiry.targetId : undefined,
    });

    await conversation.save();

    // Create initial message
    const message = new Message({
      conversation: conversation._id,
      sender: inquiry.from,
      content: inquiry.message,
    });

    await message.save();

    // Update conversation with last message
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;
    await conversation.save();

    // Update inquiry status
    inquiry.status = "responded";
    inquiry.conversation = conversation._id;
    await inquiry.save();

    revalidatePath("/messages");

    return {
      success: true,
      message: "Conversation started successfully",
    };
  } catch (error) {
    console.error("Error starting conversation:", error);
    return {
      success: false,
      message: "Failed to start conversation",
    };
  }
}

// Send message in conversation
export async function sendMessage(
  conversationId: string,
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to send a message",
      };
    }

    await dbConnect();

    const content = formData.get("content") as string;
    if (!content?.trim()) {
      return {
        success: false,
        message: "Message content is required",
      };
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return {
        success: false,
        message: "Conversation not found",
      };
    }

    // Check if user is participant
    if (!conversation.participants.includes(session.user.id as any)) {
      return {
        success: false,
        message: "Unauthorized to send message in this conversation",
      };
    }

    // Create message
    const message = new Message({
      conversation: conversationId,
      sender: session.user.id,
      content: content.trim(),
    });

    await message.save();

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;
    await conversation.save();

    revalidatePath("/messages");
    revalidatePath(`/messages/${conversationId}`);

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "Failed to send message",
    };
  }
}

// Get messages in conversation
export async function getConversationMessages(conversationId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    await dbConnect();

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(session.user.id as any)) {
      return [];
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name image")
      .sort({ createdAt: 1 })
      .lean();

    // Mark messages as read
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: session.user.id },
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    return [];
  }
}
