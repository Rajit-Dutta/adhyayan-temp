import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import studentModel from "@/models/Student";

export async function POST(req: NextRequest) {
  const { email, isRemembered } = await req.json();

  if (!isRemembered) return NextResponse.json({ message: "Not remembered" });

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

  return NextResponse.json({ message: "Token set successfully" });
}
