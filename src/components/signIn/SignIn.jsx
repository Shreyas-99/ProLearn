"use client";

import { useEffect } from "react";
import { useUser, SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // When user signs in successfully -> sync to MongoDB and redirect
//   useEffect(() => {
//     if (isSignedIn) {
//       fetch("/api/users/sync", { method: "POST" }); // sync user
//       router.replace("/home"); // redirect
//     }
//   }, [isSignedIn, router]);

 return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/home"  
      />
    </div>
  );
}
