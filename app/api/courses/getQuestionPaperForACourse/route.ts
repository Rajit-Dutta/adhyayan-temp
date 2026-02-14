import { dbConnect } from "@/lib/db";
import assignmentModel from "@/models/Assignment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const batchID = searchParams.get("id");

    const assignmentDetails = await assignmentModel.find({
      assignedTo: batchID,
    });
    if (!assignmentDetails) {
      return new Response("No assignments created so far", { status: 404 });
    }
    const assignmentResult = assignmentDetails.map((assignment) => ({
      name: assignment.title,
      link: assignment.questionPaperLink,
    }));
    console.log(assignmentResult);
    return new Response(JSON.stringify(assignmentResult), { status: 201 });
  } catch (error) {
    console.error("Error in getting question paper details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
