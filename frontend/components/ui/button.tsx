import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out focus-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-white hover:bg-orange-dim shadow-[0_8px_20px_-6px_rgba(255,90,31,0.55)] hover:shadow-[0_10px_28px_-6px_rgba(255,90,31,0.65)] hover:-translate-y-0.5",
        secondary:
          "bg-transparent text-ink border border-ink/15 hover:border-ink/30 hover:bg-subtle hover:-translate-y-0.5",
        invert:
          "bg-white text-ink hover:bg-white/90 hover:-translate-y-0.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]",
        ghost: "bg-transparent text-mist hover:text-ink hover:bg-subtle",
        navy:
          "bg-navy text-white hover:bg-navy-dim shadow-[0_8px_20px_-6px_rgba(27,36,55,0.4)] hover:-translate-y-0.5",
        outlineInvert:
          "bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/10 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
