import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official FS logo mark (red F + blue S) extracted from the supplied
 * Logo_Fintech.jpg. Proportions and colors are preserved exactly — only
 * edge anti-aliasing was applied. The mark is never recolored or restyled.
 *
 * Intrinsic size 1200x570 (aspect ~2.105:1).
 */
export function LogoMark({
  height = 32,
  className,
  priority,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Fintech Services — FS"
      width={Math.round(height * 2.105)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height }}
    />
  );
}

/**
 * Full brand lockup: the official FS mark with the wordmark set in Inter.
 * The mark itself is unmodified; the wordmark is crisp text at every size.
 */
export function BrandLockup({
  className,
  size = "md",
  priority,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  const markHeight = { sm: 24, md: 30, lg: 38 }[size];
  const wordClass = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-xl",
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark height={markHeight} priority={priority} />
      <span
        className={cn(
          "font-semibold tracking-tight text-ink leading-none",
          wordClass
        )}
      >
        Fintech<span className="text-blue">Services</span>
      </span>
    </span>
  );
}

export function LogoLink({
  href = "/",
  className,
  size,
  priority,
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Fintech Services — home"
      className={cn(
        "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
        className
      )}
    >
      <BrandLockup size={size} priority={priority} />
    </Link>
  );
}
