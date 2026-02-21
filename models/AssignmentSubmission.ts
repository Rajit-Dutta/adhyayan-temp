import mongoose, { Schema } from "mongoose";

const assignmentSubmissionSchema = new Schema({
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  assignedBy: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  submissionLink: { type: String, required: true },
  marksScored: { type: Number, default: 0 },
  studentComment: { type: String },
  teacherFeedback: { type: String },
  status: {
    type: String,
    enum: ["submitted", "graded", "pending"],
    default: "pending",
  },
});

const assignmentSubmissionModel =
  mongoose.models.AssignmentSubmission ||
  mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);

export default assignmentSubmissionModel;
