import { dbConnect } from "@/lib/db";
import assignmentModel from "@/models/Assignment";
import batchModel from "@/models/Batch";
import assignmentSubmissionModel from "@/models/AssignmentSubmission";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");
    const subject = searchParams.get("subjectName");

    if (!studentId || !subject) {
      return new Response("Missing parameters", { status: 400 });
    }

    const batchDetails = await batchModel.find({
      students: studentId,
      subject,
    });

    if (!batchDetails.length) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const batchIds = batchDetails.map((b) => b._id);

    const assignments = await assignmentModel.find(
      { assignedTo: { $in: batchIds }, subject },
      { _id: 1 },
    );

    const numberOfAssignments = assignments.length;

    if (!assignments.length) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const assignmentIds = assignments.map((a) => a._id);

    const submissions = await assignmentSubmissionModel
      .find(
        {
          assignment: { $in: assignmentIds },
          submittedBy: studentId,
        },
        { marksScored: 1, submissionDate: 1 },
      )
      .sort({ submissionDate: 1 });

    const result = {
      stats: {
        numberOfAssignments,
        numberOfSubmissions: submissions.length,
        subject
      },
      marks: submissions,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
