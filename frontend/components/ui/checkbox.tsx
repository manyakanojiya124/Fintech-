"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function Checkbox({
  checked: controlled,
  defaultChecked = false,
  onCheckedChange,
  id,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const checked = isControlled ? controlled : internal;

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked}
      aria-label={rest["aria-label"]}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        const next = !checked;
        if (!isControlled) setInternal(next);
        onCheckedChange?.(next);
      }}
      className={cn(
        "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/15",
        checked
          ? "border-blue bg-blue text-white"
          : "border-line bg-white text-transparent hover:border-blue/40",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </button>
  );
}
