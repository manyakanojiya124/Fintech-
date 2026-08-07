import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/15 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-blue text-white shadow-sm hover:bg-blue-700 hover:shadow-card-hover",
        secondary:
          "border border-blue/30 bg-white text-blue hover:border-blue hover:bg-blue-50",
        outline:
          "border border-line bg-white text-ink hover:border-ink/25 hover:bg-subtle",
        ghost: "bg-transparent text-mist hover:bg-subtle hover:text-ink",
        danger: "bg-red text-white shadow-sm hover:bg-red-600 hover:shadow-card-hover",
        dark: "bg-ink text-white hover:bg-ink/90",
        link: "p-0 h-auto text-blue hover:text-blue-700",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-10 px-5",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
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
