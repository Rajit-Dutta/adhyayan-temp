import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    const retrievedToken = request.cookies.get("token")?.value;
    const decodedToken: any = jwt.verify(
      retrievedToken!,
      process.env.JWT_SECRET!
    );
    return decodedToken.id;
  } catch (error) {
    console.error("Error in getDataFromToken:", error);
    return null;
  }
}
