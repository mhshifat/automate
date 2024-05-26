"use client";

import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, loading, disabled }: PropsWithChildren<{ loading?: boolean, disabled?: boolean }>) {
  const { pending } = useFormStatus();
  
  const isLoading = pending || loading || false;
  const isDisabled = disabled || isLoading;

  return (
    <Button disabled={isDisabled} type="submit">
      {isLoading ? "Loading..." : children}
    </Button>
  )
}