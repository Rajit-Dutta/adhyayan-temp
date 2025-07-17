import crypto from "crypto";
import studentModel from "@/models/Student";

export async function rememberMeHandler(
  email: string,
  isRemembered: boolean
): Promise<any> {
  try {
    if (isRemembered) {
      const token = crypto.randomBytes(64).toString("hex");
      const foundUser = await studentModel.findOneAndUpdate(
        { email },
        {
          $set: {
            rememberMeToken: token,
            rememberMeExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
        },
        { new: true }
      );
      if (!foundUser) {
        throw new Error("User not found");
      }
    }
  } catch (error) {
    console.error("Error in rememberMeHandler:", error);
    return null;
  }
}
