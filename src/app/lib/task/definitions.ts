import { z } from "zod";

export const SignupFormSchema = z.object({
  title: z.string(),
  priority: z.string({ message: "Priority is required." }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string({ message: "Password is required." }).trim(),
});

export type FormState =
  | {
      values?: {
        id?: string;
        title?: string;
        description?: string;
        priority?: string;
      };
      errors?: {
        title?: string[];
        description?: string[];
        priority?: string[];
      };
      timestamp?: number;
      message?: string;
    }
  | undefined;
