import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";