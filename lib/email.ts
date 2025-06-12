import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    // Production email configuration (e.g., SendGrid, AWS SES, etc.)
    return nodemailer.createTransport({
      service: "gmail", // or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // Development configuration using Ethereal Email (test emails)
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ethereal.user@ethereal.email",
        pass: "ethereal.pass",
      },
    });
  }
};

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: from || process.env.EMAIL_FROM || "noreply@glbiashara.com",
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email sent successfully!");
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Email templates
export const emailTemplates = {
  academyApproved: (academyName: string, userName: string, academySlug: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🎉 Academy Approved!</h1>
      </div>
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1f2937; margin-top: 0;">Congratulations ${userName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          We're excited to inform you that your academy "<strong>${academyName}</strong>" has been approved and is now live on our platform!
        </p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
          <ul style="color: #4b5563; line-height: 1.6;">
            <li>Your academy is now visible to potential students</li>
            <li>You can start receiving inquiries and applications</li>
            <li>Update your profile regularly to attract more students</li>
            <li>Respond promptly to student inquiries</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/sports/academies/${academySlug}" 
             style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            View Your Academy
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          <strong>GLBiashara Sports Team</strong>
        </p>
      </div>
    </div>
  `,

  talentApproved: (userName: string, sport: string, position: string, talentId: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🌟 Talent Profile Approved!</h1>
      </div>
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1f2937; margin-top: 0;">Congratulations ${userName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          Your talent profile has been approved and is now live on our platform! Academies, coaches, and scouts can now discover your skills.
        </p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Your Profile</h3>
          <p style="color: #4b5563; margin: 5px 0;"><strong>Sport:</strong> ${sport}</p>
          <p style="color: #4b5563; margin: 5px 0;"><strong>Position:</strong> ${position}</p>
        </div>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Tips for Success</h3>
          <ul style="color: #4b5563; line-height: 1.6;">
            <li>Keep your profile updated with latest achievements</li>
            <li>Upload highlight videos to showcase your skills</li>
            <li>Respond promptly to academy inquiries</li>
            <li>Stay active and engaged on the platform</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/sports/talents/${talentId}" 
             style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            View Your Profile
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          <strong>GLBiashara Sports Team</strong>
        </p>
      </div>
    </div>
  `,

  newReview: (targetName: string, reviewerName: string, rating: number, comment: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">⭐ New Review Received!</h1>
      </div>
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1f2937; margin-top: 0;">You have a new review!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          ${reviewerName} has left a review for ${targetName}.
        </p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="color: #F59E0B; font-size: 18px; margin-right: 10px;">
              ${'⭐'.repeat(rating)}${'☆'.repeat(5 - rating)}
            </span>
            <span style="color: #1f2937; font-weight: bold;">${rating}/5 stars</span>
          </div>
          <p style="color: #4b5563; font-style: italic; line-height: 1.6;">
            "${comment}"
          </p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 15px;">
            - ${reviewerName}
          </p>
        </div>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
          Reviews help build trust and credibility on our platform. Thank you for providing excellent service!
        </p>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          <strong>GLBiashara Sports Team</strong>
        </p>
      </div>
    </div>
  `,

  welcomeMessage: (userName: string, userType: "academy" | "talent") => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #6366F1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🏆 Welcome to GLBiashara Sports!</h1>
      </div>
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1f2937; margin-top: 0;">Welcome ${userName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          Thank you for joining GLBiashara Sports, Tanzania's premier platform for connecting sports academies and talented athletes.
        </p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Getting Started</h3>
          <ul style="color: #4b5563; line-height: 1.6;">
            ${userType === "academy" ? `
              <li>Complete your academy profile with detailed information</li>
              <li>Upload high-quality photos of your facilities</li>
              <li>List your training programs and specializations</li>
              <li>Wait for admin approval (usually within 24-48 hours)</li>
            ` : `
              <li>Complete your talent profile with your sports background</li>
              <li>Upload highlight videos showcasing your skills</li>
              <li>List your achievements and experience</li>
              <li>Wait for admin approval (usually within 24-48 hours)</li>
            `}
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/sports" 
             style="background-color: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Explore Platform
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          If you have any questions, feel free to contact our support team.<br><br>
          Best regards,<br>
          <strong>GLBiashara Sports Team</strong>
        </p>
      </div>
    </div>
  `,
};
