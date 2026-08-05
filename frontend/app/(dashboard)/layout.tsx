"use client"
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      {isOpen && (
        <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40 "
            onClick={() => setIsOpen(false)}
        />
    )}
       <header className="lg:hidden">
          <button className="p-5"
          onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
        </header>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main className="flex-1 bg-slate-100 p-8 dark:bg-slate-900">
        {children}
      </main>
    </div>
  );
}