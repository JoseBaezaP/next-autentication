"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(userData: string) {
  const cookieStore = await cookies();
  cookieStore.set("userData", userData);
}

export async function logoutSession() {
  const cookieStore = await cookies();
  cookieStore.delete("userData");
  redirect("/");
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData");
  return userData?.value || "";
}
