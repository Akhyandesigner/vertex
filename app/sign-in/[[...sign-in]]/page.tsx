import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading sign in...</div>}>
      <div className="flex min-h-screen items-center justify-center">
        <SignIn />
      </div>
    </Suspense>
  );
}
