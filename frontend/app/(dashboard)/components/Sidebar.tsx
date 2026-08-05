"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { LayoutDashboard, CreditCard, LogOut,X } from "lucide-react";
import ThemeButton from "./ThemeButton";

interface sideBarProps {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}


export default function Sidebar( {isOpen , setIsOpen} : sideBarProps) {

  const router = useRouter(); 

  const LogoutFunction = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if(response.ok) {
        setIsOpen(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    
    <aside className={`flex fixed top-0 left-0 h-screen w-72 z-50 flex-col bg-slate-900 text-white shadow-2xl dark:border-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
      

<button
    className="self-end m-4 rounded-lg p-2 hover:bg-slate-800 lg:hidden"
    onClick={() => setIsOpen(false)}
>
    <X size={24} />
</button>
      <ThemeButton/>
      <div className="border-b border-slate-800 px-8 py-8">
        <h1 className="text-2xl font-bold tracking-wide">
          Subscription
          <span className="block text-indigo-400">Tracker</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage all your subscriptions in one place.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-8">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Navigation
        </p>

        <div className="space-y-2">

          {/* Active */}
          <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 font-medium transition hover:bg-indigo-700"
          onClick={() => {
            router.push("/dashboard")
            setIsOpen(false); }}>
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          onClick={() => {
            router.push("/subscriptions")
            setIsOpen(false); }}>
            <CreditCard size={20} 
            />
            Subscriptions
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          onClick={() => {
            router.push("/add-subscription")
            setIsOpen(false); }}>
            Add Subscription
          </button>

        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-800 p-5">

        {/* can be implemented using useContext, then we can share data in sidebar and in subscriptions page */}
        {/* <div className="mb-5 rounded-xl bg-slate-800 p-4">
          <p className="text-sm font-semibold">
            Monthly Spending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-400">
            $249
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Across 8 active subscriptions
          </p>
        </div> */}

        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
        onClick={LogoutFunction}>
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </aside>
  );
}