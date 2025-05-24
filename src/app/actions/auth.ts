"use server";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/app/lib/definitions";

import { redirect } from "next/navigation";
import AuthServiceController from "@/services/auth.service";
import { createSession } from "../lib/session";

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validatedFields = SignupFormSchema.safeParse(raw);

  if (!validatedFields.success) {
    return {
      values: raw,
      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  const { name, email, password } = validatedFields.data;

  const res = await fetch("http://localhost:3001/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (data.status !== 200) {
    return {
      values: raw,
      errors: {},
      message: "Ocurrió un error al crear tu cuenta.",
      timestamp: Date.now(),
    };
  }

  await createSession(data.token);
  redirect("/profile");
}

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
  const validatedFields = LoginFormSchema.safeParse(raw);

  if (!validatedFields.success) {
    return {
      values: raw,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
      timestamp: Date.now(),
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const data = await AuthServiceController.login(email, password);
    await createSession(data.token);
    return {
      values: raw,
      errors: {},
      message: "success",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      values: raw,
      errors: {},
      message: error,
      timestamp: Date.now(),
    };
  }
}
