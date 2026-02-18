import { dbConnect } from "@/lib/db";
import assignmentModel from "@/models/Assignment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const assignmentId = searchParams.get("id");

    const assignmentDetails = await assignmentModel.find({ _id: assignmentId });
    if (!assignmentDetails) {
      return new Response("No batches created so far", { status: 404 });
    }
    return new Response(JSON.stringify(assignmentDetails), { status: 201 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
