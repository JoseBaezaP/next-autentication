import { TaskPriorityType } from "@/models/task.model";
import { TaskService } from "@/services/task.service";
import Link from "next/link";
import DeleteTask from "./components/deleteTask";

export default async function Page() {
  const allTasks = await TaskService.getAllTasks();
  return (
    <div>
      <div className="flex justify-between items-center p-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <Link href="/tasks/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Create Task
          </button>
        </Link>
      </div>
      <div className="flex gap-4 items-center py-2">
        {allTasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-500 capitalize">
              {TaskPriorityType[task.priority as keyof typeof TaskPriorityType]}
            </p>
            <p className="text-gray-500">Created At: {task.created_at}</p>
            <DeleteTask id={task.id} />
            <Link href={`/tasks/${task.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2">
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
