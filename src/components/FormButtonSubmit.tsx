"use client";

import React from "react";
import { useFormState } from "react-hook-form";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

export default function FormButtonSubmit({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { isLoading } = useFormState();

  return (
    <button
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
