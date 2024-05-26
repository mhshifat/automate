import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="animate-spin size-4 text-slate-500" />
      </ClerkLoading>
    </>
  )
}