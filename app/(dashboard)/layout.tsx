import Sidebar from "@/components/shared/sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex items-start gap-0">
      <Sidebar />
      {children}
    </main>
  )
}