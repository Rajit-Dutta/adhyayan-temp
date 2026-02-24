import { dbConnect } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import studentModel from "@/models/Student";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function POST(request: NextRequest) {
  const userId = getDataFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    const user = await studentModel
      .findById({ _id: userId })
      .select("-password");
    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  }
}
