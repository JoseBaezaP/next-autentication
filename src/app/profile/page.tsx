import { cookies } from "next/headers";

export default async function Page() {
  const userData = (await cookies()).get('userData')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Perfil de Usuario</h1>
      <p className="mt-4 text-gray-600">{JSON.stringify(userData?.value)}</p>
    </div>
  );
}
