import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  await dbConnect();
  try {
    const response = NextResponse.json({
      message: "Sign out successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.error("Error in signOut route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
