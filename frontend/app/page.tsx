"use client";
import { useEffect } from "react";
import Login from "./login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function checkAuth() {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
        credentials: "include"
    }
);

if (response.ok) {
    router.push("/dashboard");
}
  }

  useEffect(() => {
    checkAuth();
}, []);
  
  return (
    <div className="dark:bg-slate-700">
      <main className="dark:bg-slate-700">
        <Login />
      </main>
    </div>
  );
}
