import mongoose, { Schema, Document } from "mongoose";
import { Student } from "./Student";

export interface Teacher extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  createdAt?: Date;
  students?: Student[];
}

const teacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, match: [/^\d{10}$/, "please use a valid phone number"] },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);


const teacherModel = (mongoose.models.Teacher as mongoose.Model<Teacher>) || mongoose.model<Teacher>("teachers", teacherSchema);
export default teacherModel;