// app/register/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
export default function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        router.push("/listings");
      } else {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Registration attempt:", { name, email, password });

      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      console.log("User data:", data);

      router.push("/login");
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 dark:bg-[var(--color-background-dark)]">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-[var(--color-text-dark)]">
            Create a new account
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-[var(--color-text-dark)]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-light)] focus:outline-none focus:ring-[var(--color-primary-light)] sm:text-sm dark:bg-[var(--color-card-dark)] dark:border-[var(--color-border-dark)] dark:text-[var(--color-text-dark)]"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 dark:text-[var(--color-text-dark)]"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-light)] focus:outline-none focus:ring-[var(--color-primary-light)] sm:text-sm dark:bg-[var(--color-card-dark)] dark:border-[var(--color-border-dark)] dark:text-[var(--color-text-dark)]"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-[var(--color-text-dark)]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-light)] focus:outline-none focus:ring-[var(--color-primary-light)] sm:text-sm dark:bg-[var(--color-card-dark)] dark:border-[var(--color-border-dark)] dark:text-[var(--color-text-dark)]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 dark:text-[var(--color-text-dark)]"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-light)] focus:outline-none focus:ring-[var(--color-primary-light)] sm:text-sm dark:bg-[var(--color-card-dark)] dark:border-[var(--color-border-dark)] dark:text-[var(--color-text-dark)]"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="text-text-light bg-primary-light cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out w-full p-5 text-base disabled:opacity-70 disabled:cursor-not-allowed dark:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-secondary-dark)]"
            >
              Register
            </Button>
          </div>

          <div className="text-center text-sm dark:text-[var(--color-text-dark)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-800 hover:text-primary-light dark:text-[var(--color-text-dark)] dark:hover:text-[var(--color-action-dark)]"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
