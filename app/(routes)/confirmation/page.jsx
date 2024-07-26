"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Confirmation() {
  const router = useRouter();
  return (
    <div className="flex justify-center h-full">
      <div
        className="flex flex-col items-center justify-center gap-6 p-20"
      >
        <CheckCircle className="h-20 w-20 text-green-500" />
        <h2 className="font-bold text-3xl text-center">Alert has been successfully sent</h2>
        <h2 className="text-lg text-gray-500 text-center">
          The designated authorities will be notified with a call shortly.
        </h2>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg border border-transparent hover:bg-white hover:border-blue-500 hover:text-blue-500 shadow-md transition-colors duration-300 ease-in-out"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
