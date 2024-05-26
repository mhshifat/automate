import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {children}
    </main>
  )
}