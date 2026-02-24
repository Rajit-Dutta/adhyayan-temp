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

    const batchDetails = await batchModel.find({
      students: studentId,
      subject: subject,
    });
    
    if (batchDetails.length === 0) {
      return new Response(JSON.stringify(0), { status: 200 });
    }

    const assignmentDetails = await assignmentModel.find({
      assignedTo: batchDetails[0]._id,
    });
    
    if (assignmentDetails.length === 0) {
      return new Response(JSON.stringify(0), { status: 200 });
    }

    const assignmentIds = assignmentDetails.map((a) => a._id);

    const marksScoredDetails = await assignmentSubmissionModel.find({
      assignment: { $in: assignmentIds },
      submittedBy: studentId,
    });
    
    if (marksScoredDetails.length === 0) {
      return new Response(JSON.stringify(0), { status: 200 });
    }
    const marks = marksScoredDetails.map((a) => a.marksScored);
    return new Response(JSON.stringify(marks), { status: 200 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
