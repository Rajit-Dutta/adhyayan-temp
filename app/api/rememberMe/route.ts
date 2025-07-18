import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import studentModel from "@/models/Student";
import { dbConnect } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { email, isRemembered } = body;

    if (!email || typeof isRemembered !== "boolean") {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    if (!isRemembered) {
      return NextResponse.json({ message: "Not remembered" });
    }

    const token = crypto.randomBytes(64).toString("hex");

    const updatedUser = await studentModel.findOneAndUpdate(
      { email },
      {
        $set: {
          rememberMeToken: token,
          rememberMeExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const response = NextResponse.json({
      message: "RememberToken set successfully",
    });
    response.cookies.set({
      name: "rememberMeToken",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("API Error in rememberMe:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
