import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";

export default async function DashboardHeader({ title }: { title: string }) {
  const user = await currentUser();

  return (
    <div className="w-full h-14 flex items-center gap-5 justify-between px-5 shadow-sm">
      <h3 className="text-lg font-medium">{title}</h3>

      {user?.id && (
          <>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-slate-500" />
            </ClerkLoading>
          </>
        )}
    </div>
  )
}