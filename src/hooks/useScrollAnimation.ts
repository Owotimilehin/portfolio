"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollPin(options?: { scrub?: number; end?: string }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !pinRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: pinRef.current,
      start: "top top",
      end: options?.end || "+=200%",
      scrub: options?.scrub ?? 1,
    });

    return () => trigger.kill();
  }, [options?.end, options?.scrub]);

  return { triggerRef, pinRef };
}

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return { ref, progressRef };
}

export { gsap, ScrollTrigger };
