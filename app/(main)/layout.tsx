import Header from "@/components/shared/header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="p-8">
        {children}
      </main>
    </>
  )
}