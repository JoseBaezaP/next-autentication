"use server";

import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "../lib/task/definitions";
import { TaskService } from "@/services/task.service";
import { Task } from "@/models/task.model";
import { revalidatePath } from "next/cache";

export async function createTask(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw: Task = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    priority: formData.get("priority")?.toString() || "",
  };

  const validatedFields = SignupFormSchema.safeParse(raw);

  if (!validatedFields.success) {
    return {
      values: raw,
      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  try {
    await TaskService.createTask(raw);
    return {
      values: raw,
      message: "success",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      values: raw,
      errors: {},
      message: `Ocurrió un error al crear la tarea, \n ${error.errors.join(
        "\n"
      )}`,
      timestamp: Date.now(),
    };
  }
}

export async function deleteTask(id: string | undefined) {
  try {
    if (id) {
      await TaskService.deleteTask(id);
    }
  } catch (error) {
    console.error("Error creating task:", error);
  }
  revalidatePath("/tasks");
}

export async function updateTask(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const raw: Task = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    priority: formData.get("priority")?.toString() || "",
  };

  const validatedFields = SignupFormSchema.safeParse(raw);

  if (!validatedFields.success) {
    return {
      values: raw,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  raw.id = state?.values?.id;

  try {
    await TaskService.updateTask(raw);
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      values: raw,
      errors: {},
      message: "Ocurrió un error al crear la tarea.",
    };
  }

  redirect("/tasks");
}
