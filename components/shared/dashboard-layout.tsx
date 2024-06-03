import { PropsWithChildren } from "react";
import DashboardHeader from "./dashboard-header";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children, title, className }: PropsWithChildren<{ title: string, className?: string }>) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-screen">
        <DashboardHeader
          title={title}
        />
        <div className={cn("p-5 flex-1", className)}>
          {children}
        </div>
      </div>
  )
}