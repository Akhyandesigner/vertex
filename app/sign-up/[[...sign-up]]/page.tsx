import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading sign up...</div>}>
      <div className="flex min-h-screen items-center justify-center">
        <SignUp />
      </div>
    </Suspense>
  );
}
