"use client";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, {});

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Registro del usuario</h1>
      <form action={action} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={state?.values?.name}
        />
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={state?.values?.email}
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {pending ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
