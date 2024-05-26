"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function SidebarLink({ path, children }: PropsWithChildren<{ path: string }>) {
  const pathname = usePathname();
  
  return (
    <Link href={path} className={cn("font-semibold text-xl uppercase tracking-tighter text-slate-500", {
      "text-slate-900": path === pathname
    })}>
      {children}
    </Link>
  )
}