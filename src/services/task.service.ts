import { getUserSession } from "@/app/lib/session";
import { Task } from "@/models/task.model";

export class TaskService {
  static async getAllTasks(): Promise<Task[]> {
    const response = await fetch("http://localhost:3001/api/v1/task", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getUserSession(),
      },
    });
    const data = await response.json();
    return data;
  }

  static async createTask(raw: Task): Promise<void> {
    const res = await fetch("http://localhost:3001/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getUserSession(),
      },
      body: JSON.stringify(raw),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }
  }

  static async updateTask(raw: Task): Promise<void> {
    const res = await fetch(`http://localhost:3001/api/v1/task/${raw.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getUserSession(),
      },
      body: JSON.stringify(raw),
    });

    const data = await res.json();
    return data;
  }

  static async deleteTask(id: string): Promise<void> {
    const res = await fetch(`http://localhost:3001/api/v1/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getUserSession(),
      },
    });

    const data = await res.json();
    return data;
  }
  static async getTaskById(id: string): Promise<Task> {
    const res = await fetch(`http://localhost:3001/api/v1/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await getUserSession(),
      },
    });

    const data = await res.json();
    return data as Task;
  }
}

const controller = new TaskService();
export default controller;
