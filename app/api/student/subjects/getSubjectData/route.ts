import { dbConnect } from "@/lib/db";
import studentModel from "@/models/Student";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    const studentDetails = await studentModel.find({ _id: studentId });
    if (!studentDetails) {
      return new Response("No students with the id present so far", { status: 404 });
    }
    return new Response(JSON.stringify(studentDetails[0].subjects), { status: 201 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
