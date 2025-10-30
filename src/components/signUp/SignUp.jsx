"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/sign-in"  
      />
    </div>
  );
}