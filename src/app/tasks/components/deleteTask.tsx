"use client";

import { deleteTask } from "@/app/actions/taks";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteTask({ id }: { id: string | undefined }) {
  const [isPending, startTransaction] = useTransition();
  const handleDeleteTask = (id: string | undefined) => {
    startTransaction(() => {
      deleteTask(id);
      toast.success("Tarea eliminada con éxito");
    });
  };
  return (
    <button
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
      onClick={() => handleDeleteTask(id)}
    >
      Delete
    </button>
  );
}
