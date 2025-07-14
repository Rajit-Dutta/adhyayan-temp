import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6, {message:"Password must be at least 6 characters long"}),
  age: z.number().min(0).optional(),
  standard: z.string().min(1).max(100),
  phone: z.string().max(10),
});


