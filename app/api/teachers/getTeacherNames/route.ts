import { dbConnect } from "@/lib/db";
import teacherModel from "@/models/Teacher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const standard = searchParams.get("id");

    const teacherDetails = await teacherModel.find();

    if (!teacherDetails) {
      return new Response("No teacher created so far", { status: 404 });
    }
    return new Response(JSON.stringify(teacherDetails), { status: 201 });
  } catch (error) {
    console.error("Error in getting teacher name:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
