"use client";
import { loginAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (state?.timestamp && state?.message ) {
      if (state?.message == "success") {
        toast.success("Sesión iniciada con éxito");
        redirect("/profile");
      } else {
        toast.error(state?.message);
      }
    }
  }, [state?.timestamp, state?.message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
      <form className="mt-4 space-y-4" action={action}>
        <input
          type="text"
          name="email"
          placeholder="Usuario"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={state?.values?.email}
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={state?.values?.password}
        />
        {state?.errors?.password && <p>{state.errors.password}</p>}
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={pending}
        >
          {pending ? "Loading..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
