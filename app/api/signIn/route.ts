import { dbConnect } from "@/lib/db";
import studentModel from "@/models/Student";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    //auto-login
    const rememeberToken = request.cookies.get("rememberMeToken")?.value;

    if (rememeberToken) {
      const userFound = await studentModel.findOne({
        rememberMeToken: rememeberToken,
      });
      if (!userFound) {
        const response = NextResponse.next();
        response.cookies.delete("rememberMeToken");
        return response;
      }
    }

    //self-login
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await studentModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Sign in unsuccessful" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Sign in successful",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.error("Error in signIn route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
