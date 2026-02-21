import { dbConnect } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import assignmentSubmissionModel from "@/models/AssignmentSubmission";
import assignmentModel from "@/models/Assignment";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);

  const assignment = formData.get("assignment") as string;
  const assignedBy = formData.get("assignedBy") as string;
  const submittedBy = formData.get("submittedBy") as string;
  const createdAt = formData.get("createdAt") as string;
  const status = formData.get("status") as string;
  const studentComment = formData.get("studentComment") as string;
  const marksScored = Number(formData.get("marksScored"));
  const file = formData.get("submissionLink") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const existingAssignmentSubmit = await assignmentSubmissionModel.findOne({
    assignment,
  });
  if (existingAssignmentSubmit) {
    return new Response("Assignment already exists", { status: 409 });
  } else {
    try {
      await dbConnect();
      const dateTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const filePath = `assignmentSubmissions/${file.name}-${dateTime}`;
      const { error } = await supabase.storage
        .from("Adhyayan-Backend")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image: ", error);
        return null;
      }

      const { data } = supabase.storage
        .from("Adhyayan-Backend")
        .getPublicUrl(filePath);

      console.log("PDF link -> ", data.publicUrl);

      const newAssignmentSubmit = new assignmentSubmissionModel({
        assignment,
        assignedBy,
        submittedBy,
        createdAt,
        status,
        marksScored,
        studentComment,
        submissionLink: data.publicUrl,
      });

      const savedAssignmentSubmit = await newAssignmentSubmit.save();

      // const tobeDeletedAssignment = await assignmentModel.findByIdAndDelete({
      //   _id: assignment,
      // });

      // console.log("tobeDeletedAssignment: ", tobeDeletedAssignment);

      return NextResponse.json(
        {
          _id: savedAssignmentSubmit._id,
          assignment,
          assignedBy,
          submittedBy,
          createdAt,
          status,
          marksScored,
          studentComment,
          submissionLink: data.publicUrl,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("Upload failed", error);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  }
}
