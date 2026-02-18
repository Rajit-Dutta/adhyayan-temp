import { dbConnect } from "@/lib/db";
import assignmentSubmissionModel from "@/models/AssignmentSubmission";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { assigment, submittedBy } = body;

    const exisitingSubmission = await assignmentSubmissionModel.findOne({
      assignment: assigment,
      submittedBy: submittedBy,
    });
    if (exisitingSubmission) {
      return Response.json(
        { error: "Submission already exists" },
        { status: 500 },
      );
    }
    const confirmSubmission = await assignmentSubmissionModel.create(body);
    const response = NextResponse.json(
      {
        message: "Submission successful",
        success: true,
        student: confirmSubmission,
      },
      {
        status: 200,
      },
    );
    return response;
  } catch (error) {
    return Response.json(
      { error: "Failed to create submission" },
      { status: 500 },
    );
  }
}
