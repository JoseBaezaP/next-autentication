"use client";

import { logoutSession } from "@/app/lib/session";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(async () => {
      await logoutSession();
      sessionStorage.clear();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="hover:text-gray-300 cursor-pointer"
    >
      {isPending ? "Cerrando sesión..." : "Logout"}
    </button>
  );
}
