import studentModel from "@/models/Student";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    // const hashedToken = crypto.randomBytes(32).toString("hex");
    console.log("hashed token -> ", hashedToken);

    if (emailType === "VERIFY") {
      console.log("Hellow from verify");
      const updatedUser = await studentModel.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }, // 1 hour expiry
        { new: true }
      );
      console.log("Updated user -> ", updatedUser);
    } else if (emailType === "RESET") {
      await studentModel.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        }, // 1 hour expiry
        { new: true }
      );
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "21e822b530e987",
        pass: "e80c1ca69f7ecd",
      },
    });

    const mailOptions = {
      from: "ADHYAYAN <no-reply@adhyayan.com>",
      to: `${email}`,
      subject: "Hi aspirant, please verify your email",
      text: "Hello world?", // plain‑text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your mail" : "reset your password"
      }or copy and paste the link below in your browser. <br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
