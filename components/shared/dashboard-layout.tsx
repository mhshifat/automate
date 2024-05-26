import { PropsWithChildren } from "react";
import DashboardHeader from "./dashboard-header";

export default function DashboardLayout({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex-1 h-full overflow-y-auto">
        <DashboardHeader
          title={title}
        />
        <div className="p-5">
          {children}
        </div>
      </div>
  )
}