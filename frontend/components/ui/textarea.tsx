import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[110px] w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-mist transition",
        "border-line focus:border-blue-500 focus:ring-4 focus:ring-blue/10 focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-subtle disabled:opacity-60",
        "resize-none",
        invalid && "border-red-400 focus:border-red-500 focus:ring-red/10",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
