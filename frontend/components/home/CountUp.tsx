"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CountUp({
  from = 0,
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { val: from };
    const tween = gsap.to(proxy, {
      val: to,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${prefix}${proxy.val.toFixed(decimals)}${suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [from, to, decimals, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
}
