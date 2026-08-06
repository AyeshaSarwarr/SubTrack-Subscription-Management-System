"use client";
import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import LogIn from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await LogIn({ email, password, rememberMe });

  setError("");
  router.push("/dashboard");
} catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : "Unable to connect to the server."
  );
} finally {
       setLoading(false);
    }
  }
  
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-12">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Subscription Tracker
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              Keep all your subscriptions organized in one place.
              Track billing dates, monitor expenses, and never miss a renewal again.
            </p>

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  📊
                </div>
                <div>
                  <p className="font-semibold">Track Expenses</p>
                  <p className="text-blue-100 text-sm">
                    Monitor monthly & yearly spending.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  🔔
                </div>
                <div>
                  <p className="font-semibold">Renewal Reminders</p>
                  <p className="text-blue-100 text-sm">
                    Never miss a subscription renewal.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  🔒
                </div>
                <div>
                  <p className="font-semibold">Secure Access</p>
                  <p className="text-blue-100 text-sm">
                    Protected with JWT authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">

            <div className="text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white text-3xl shadow-lg">
                💳
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mt-6">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Login to access your dashboard
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition dark:text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  
                </div>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition dark:text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm dark:text-black">
                    Remember me
                  </span>
                </label>
              </div>

              <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold transition duration-200 shadow-lg
              ${loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"}
              text-white shadow-lg`}
              >
              {loading ? "Signing In..." : "Sign In"}
              </button>
              {
                error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )
            }
            </form>

            <div className="mt-10 text-center text-sm text-gray-400">
              Subscription Tracker © 2026
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

