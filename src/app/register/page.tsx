"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    // chechking if user has already registered redirect to home page
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmpassword") as string;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      // sending API request for registering user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.text(); // Ambil respons sebagai teks

      if (res.status === 400) {
        toast.error(data || "This email is already registered");
        setError(data || "The email already in use");
      } else if (res.status === 500) {
        toast.error(data || "An error occurred on the server.");
        setError(data || "An error occurred on the server.");
      } else if (res.ok) { // Status 200-299
        setError("");
        toast.success("Registration successful!");
        router.push("/login");
      }

    } catch (error) {
      toast.error("Error, try again");
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="bg-white">
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-center flex-col items-center">
          <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
            Sign up on our website
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Input Name dan Lastname sudah dihapus */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Accept our terms and privacy policy
                  </label>
                </div>
              </div>

              <div>
                <CustomButton
                  buttonType="submit"
                  text="Sign up"
                  paddingX={3}
                  paddingY={1.5}
                  customWidth="full"
                  textSize="sm"
                />

                <p className="text-red-600 text-center text-[16px] my-4">
                  {error && error}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;