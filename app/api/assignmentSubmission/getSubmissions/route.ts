import { dbConnect } from "@/lib/db";
import assignmentSubmissionModel from "@/models/AssignmentSubmission";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    const retrievedSubmissions = await assignmentSubmissionModel.find({
      submittedBy: studentId,
    });
    if (!retrievedSubmissions) {
      return new Response("No assignment submitted so far", { status: 404 });
    }
    return new Response(JSON.stringify(retrievedSubmissions), { status: 201 });
  } catch (error) {
    console.error("Error in fetching assignment submission details", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
