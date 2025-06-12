"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster position="top-center" />
      {children}
    </SessionProvider>
  );
};

export default Providers;