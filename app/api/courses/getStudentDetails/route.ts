import { dbConnect } from "@/lib/db";
import { NextRequest } from "next/server";
import studentModel from "@/models/Student";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");
    const studentDetails = await studentModel.findOne({ _id: studentId });
    if (!studentDetails) {
      return new Response("No students like this created so far", { status: 404 });
    }
    return new Response(JSON.stringify(studentDetails), { status: 201 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
