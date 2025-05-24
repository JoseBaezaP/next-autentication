import { TaskService } from "@/services/task.service";
import TaskCreateForm from "../create/components/TaskCreateForm";
import { Task } from "@/models/task.model";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task: Task = await TaskService.getTaskById(id);

  return <TaskCreateForm task={task} />;
}
