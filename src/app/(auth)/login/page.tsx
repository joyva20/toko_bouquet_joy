"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }
      
      toast.success("Login successful!");
      
      // Arahkan ke halaman utama untuk memuat ulang sesi
      router.refresh();
      router.push("/");

    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
        <div className="w-full max-w-lg px-8 py-10 mx-auto bg-white rounded-lg shadow-xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;