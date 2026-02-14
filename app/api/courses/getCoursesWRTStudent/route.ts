import { dbConnect } from "@/lib/db";
import batchModel from "@/models/Batch";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    const batchDetails = await batchModel.find({ _id: studentId });
    if (!batchDetails) {
      return new Response("No batches created so far", { status: 404 });
    }
    return new Response(JSON.stringify(batchDetails), { status: 201 });
  } catch (error) {
    console.error("Error in getting batch details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
