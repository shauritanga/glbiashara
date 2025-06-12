import mongoose, { Schema, Document } from "mongoose";

// Message Interface and Schema
export interface IMessage extends Document {
  _id: Schema.Types.ObjectId;
  conversation: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    messageType: { type: String, enum: ["text", "image", "file"], default: "text" },
    fileUrl: { type: String },
    fileName: { type: String },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

// Conversation Interface and Schema
export interface IConversation extends Document {
  _id: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  type: "academy_talent" | "academy_user" | "talent_user";
  subject?: string;
  relatedAcademy?: Schema.Types.ObjectId;
  relatedTalent?: Schema.Types.ObjectId;
  lastMessage?: Schema.Types.ObjectId;
  lastMessageAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    type: { 
      type: String, 
      enum: ["academy_talent", "academy_user", "talent_user"], 
      required: true 
    },
    subject: { type: String },
    relatedAcademy: { type: Schema.Types.ObjectId, ref: "SportsAcademy" },
    relatedTalent: { type: Schema.Types.ObjectId, ref: "SportsTalent" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    lastMessageAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Inquiry Interface and Schema (for initial contact)
export interface IInquiry extends Document {
  _id: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  targetType: "Academy" | "Talent";
  targetId: Schema.Types.ObjectId;
  subject: string;
  message: string;
  contactInfo: {
    phone?: string;
    email?: string;
    preferredContact: "phone" | "email" | "platform";
  };
  status: "pending" | "responded" | "closed";
  conversation?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["Academy", "Talent"], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    contactInfo: {
      phone: { type: String },
      email: { type: String },
      preferredContact: { 
        type: String, 
        enum: ["phone", "email", "platform"], 
        default: "platform" 
      },
    },
    status: { 
      type: String, 
      enum: ["pending", "responded", "closed"], 
      default: "pending" 
    },
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  },
  { timestamps: true }
);

// Create indexes for better performance
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ isRead: 1 });

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.index({ type: 1 });

inquirySchema.index({ from: 1, to: 1 });
inquirySchema.index({ targetType: 1, targetId: 1 });
inquirySchema.index({ status: 1 });

// Export models
export const Message =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", messageSchema);

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

export const Inquiry =
  mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", inquirySchema);
