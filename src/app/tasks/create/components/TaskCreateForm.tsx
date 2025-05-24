"use client";

import { createTask, updateTask } from "@/app/actions/taks";
import { Task } from "@/models/task.model";
import { useActionState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type TaskCreateFormProps = {
  task?: Task | undefined;
};

export default function TaskCreateForm({
  task = undefined,
}: TaskCreateFormProps) {
  const actionFn = task?.id ? updateTask : createTask;

  const initialState = task?.id
    ? {
        values: {
          id: task?.id,
          title: task?.title,
          description: task?.description,
          priority: task?.priority,
        },
      }
    : {};

  const [state, action, pending] = useActionState(actionFn, initialState);

  useEffect(() => {
    if (state?.timestamp && state?.message === "success") {
      toast.success("Tarea creada con éxito");
      redirect("/tasks");
    }
  }, [state?.timestamp, state?.message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {task?.id ? "Update" : "Create"} Task
      </h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={action}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Task Title"
            defaultValue={state?.values?.title}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {state?.errors?.title && (
            <p className="text-red-500 text-xs italic">{state.errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Task Description"
            defaultValue={state?.values?.description}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {state?.errors?.description && (
            <p className="text-red-500 text-xs italic">
              {state.errors.description}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Priority
          </label>
          <Select name="priority" defaultValue={state?.values?.priority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectItem value="1">Low</SelectItem>
                <SelectItem value="2">Medium</SelectItem>
                <SelectItem value="3">High</SelectItem>
                <SelectItem value="4">Urgent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.priority && (
            <p className="text-red-500 text-xs italic">
              {state.errors.priority}
            </p>
          )}
        </div>
        {state?.message && (
          <p className="text-red-500 text-xs italic whitespace-pre-line">
            {state.message}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {pending ? "Loading" : `${task?.id ? "Update" : "Create"} Task`}
        </button>
      </form>
    </div>
  );
}
