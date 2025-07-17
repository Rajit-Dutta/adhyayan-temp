import { dbConnect } from "@/lib/db";
import studentModel from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    await dbConnect();  // Ensure connection is awaited

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      standard,
      marks,
      phone,
      isVerified = false,
      verifyToken,
      verifyTokenExpiry = new Date(),
      rememberMeToken,
      rememberMeExpiry = new Date(),
    } = body;

    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new studentModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      standard,
      marks,
      phone,
      isVerified,
      verifyToken,
      verifyTokenExpiry: new Date(verifyTokenExpiry),
      rememberMeToken,
      rememberMeExpiry: new Date(rememberMeExpiry),
    });

    const savedUser = await newStudent.save();

    try {
      await sendEmail({
        email: savedUser.email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json(
      {
        message: "Student registered successfully. Verification email sent.",
        success: true,
        student: savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST request:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

