"use client";

import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openBookDemo } from "@/components/forms/BookDemoModal";
import { cn } from "@/lib/utils";

export function BookDemoButton({
  className,
  fullWidth,
  variant = "primary",
  size = "lg",
}: {
  className?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={openBookDemo}
      aria-haspopup="dialog"
      className={cn(fullWidth && "w-full", className)}
    >
      <CalendarCheck className="h-4 w-4" /> Book a Demo
    </Button>
  );
}
