// import {NextAuthOptions} from "next-auth";
// import { CredentialsProvider } from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "@/lib/db";

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "Enter your email" },
//                 password: { label: "Password", type: "password", placeholder: "Enter your password" }
//             }
//             async authorize() {

//             }
//         })
//     ]
// }