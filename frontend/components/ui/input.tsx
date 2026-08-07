import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink placeholder:text-mist transition",
          "border-line focus:border-blue-500 focus:ring-4 focus:ring-blue/10 focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-subtle disabled:opacity-60",
          invalid &&
            "border-red-400 focus:border-red-500 focus:ring-red/10",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
