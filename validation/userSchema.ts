// schemas/user.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8,"password must be atleast 8 characters").max(100,"password should not be more than 100 characters")
});
