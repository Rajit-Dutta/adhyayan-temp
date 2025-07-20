import { sendEmail } from "@/helpers/mailer";
import { dbConnect } from "@/lib/db";
import adminModel from "@/models/Admin";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role = "teacher",
      isVerified = false,
      forgotPasswordToken,
      forgotPasswordExpiry = new Date(),
      verifyToken,
      verifyTokenExpiry = new Date(),
      rememberMeToken,
      rememberMeExpiry = new Date(),
    } = body;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 400 }
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAdmin = new adminModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role,
        isVerified,
        forgotPasswordToken,
        forgotPasswordExpiry: new Date(forgotPasswordExpiry),
        verifyToken,
        verifyTokenExpiry: new Date(verifyTokenExpiry),
        rememberMeToken,
        rememberMeExpiry: new Date(rememberMeExpiry),
      });
      const savedAdmin = await newAdmin.save();

      try {
        await sendEmail({
          email: savedAdmin.email,
          emailType: "VERIFY",
          userId: savedAdmin._id,
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }
      return NextResponse.json(
        {
          message: "Student registered successfully. Verification email sent.",
          success: true,
          student: savedAdmin,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in admin route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
