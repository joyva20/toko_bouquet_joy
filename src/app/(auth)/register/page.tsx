"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    
    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      toast.success("Registration successful! Redirecting...");
      router.push("/login");

    } catch (err) {
      toast.error("Submission failed. Please try again.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen bg-gray-50">
        
        <div className="w-full py-12 bg-blue-600 text-white text-center">
          <h1 className="text-4xl font-bold tracking-tight">Register</h1>
          <p className="mt-2 text-sm">Home | Register</p>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-lg p-8 my-8 bg-white rounded-lg shadow-xl">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
              Sign up on our website
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Confirm your password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-gray-900"
                />
              </div>

              <div className="flex items-center">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  Accept our <a href="/terms" className="font-medium text-blue-600 hover:underline">terms</a> and <a href="/privacy" className="font-medium text-blue-600 hover:underline">privacy policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;