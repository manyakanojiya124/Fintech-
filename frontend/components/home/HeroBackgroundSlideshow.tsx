"use client";

import { useEffect, useState } from "react";

interface Slide {
  src: string;
}

const SLIDES: Slide[] = [
  { src: "/images/hero/office-slide-1-1920.jpg" },
  { src: "/images/hero/office-slide-2-1920.jpg" },
  { src: "/images/hero/office-slide-3-1920.jpg" },
  { src: "/images/hero/office-slide-4-1920.jpg" },
];

const HOLD_MS = 7000;
const FADE_MS = 1400;

export function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(
    SLIDES.map((_, i) => i === 0)
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  // -----------------------------------------
  // PREFERS REDUCED MOTION
  // -----------------------------------------
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // -----------------------------------------
  // PRELOAD SLIDES
  // -----------------------------------------
  useEffect(() => {
    let cancelled = false;

    SLIDES.forEach((slide, slideIndex) => {
      if (slideIndex === 0) return;

      const img = new window.Image();

      img.onload = () => {
        if (cancelled) return;

        setLoaded((previous) => {
          if (previous[slideIndex]) return previous;

          const next = [...previous];
          next[slideIndex] = true;

          return next;
        });
      };

      img.onerror = () => {
        console.error(
          `Hero slideshow image failed to load: ${slide.src}`
        );
      };

      img.src = slide.src;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // -----------------------------------------
  // SLIDESHOW
  // -----------------------------------------
  useEffect(() => {
    if (reducedMotion) return;

    const nextIndex = (index + 1) % SLIDES.length;

    const timer = window.setTimeout(() => {
      if (loaded[nextIndex]) {
        setIndex(nextIndex);
      }
    }, HOLD_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [index, loaded, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* =====================================
          BACKGROUND SLIDES
          ===================================== */}
      {SLIDES.map((slide, slideIndex) => {
        const active = slideIndex === index;

        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
              zIndex: active ? 2 : 1,
            }}
          >
            <img
              src={slide.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
              decoding="async"
              fetchPriority={slideIndex === 0 ? "high" : "auto"}
            />
          </div>
        );
      })}

      {/* =====================================
          LIGHT BLUE BRAND WASH
          ===================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "rgba(219, 239, 255, 0.42)",
        }}
      />

      {/* =====================================
          SUBTLE BLUE GRADIENT
          Keeps photos visible
          ===================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(191, 227, 255, 0.48) 0%, rgba(224, 242, 255, 0.18) 45%, rgba(37, 99, 235, 0.28) 100%)",
        }}
      />

      {/* =====================================
          LIGHT CENTER GLOW
          ===================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 38%, rgba(255,255,255,0.18) 0%, rgba(219,239,255,0.08) 55%, rgba(30,64,175,0.16) 100%)",
        }}
      />

      {/* =====================================
          VERY SUBTLE TOP/BOTTOM FADE
          ===================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.20) 0%, transparent 25%, transparent 72%, rgba(219,239,255,0.35) 100%)",
        }}
      />

      {/* =====================================
          SUBTLE SIDE VIGNETTE
          ===================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(30,64,175,0.18), transparent 22%, transparent 78%, rgba(30,64,175,0.18))",
        }}
      />

      {/* =====================================
          LIGHT ANALYTICS GRID
          ===================================== */}
      <div
        className="
          absolute inset-0 z-20
          opacity-[0.10]
          [background-image:linear-gradient(to_right,rgba(30,64,175,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,64,175,0.22)_1px,transparent_1px)]
          [background-size:56px_56px]
          [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]
        "
      />
    </div>
  );
}