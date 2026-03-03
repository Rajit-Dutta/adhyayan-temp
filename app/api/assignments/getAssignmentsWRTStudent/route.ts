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

    const batchDetails = await batchModel.find({ students: studentId });

    const batchIds = batchDetails.map((batch: any) => batch._id);
    const assignmentDetails = await assignmentModel.find({
      assignedTo: { $in: batchIds },
    });

    console.log("pending assignment: ",assignmentDetails);
    const retrievedSubmissions = await assignmentSubmissionModel.find({
      submittedBy: studentId,
    });
    console.log("submitted assignment: ",retrievedSubmissions)
    const filteredAssignmentDetails = assignmentDetails.filter(
      (assignment: any) =>
        !retrievedSubmissions.some(
          (sub) =>
            sub.assignment.toString() === assignment._id.toString() &&
            (sub.status === "submitted" || sub.status === "graded"),
        ),
    );
    console.log("filtered: ",filteredAssignmentDetails);

    if (!filteredAssignmentDetails) {
      return new Response("No batches created so far", { status: 404 });
    }
    return new Response(JSON.stringify(filteredAssignmentDetails), { status: 201 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
