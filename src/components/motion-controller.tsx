"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    root.dataset.motion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      const heroProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      root.style.setProperty("--hero-scroll-up", `${heroProgress * -34}px`);
      root.style.setProperty("--hero-scroll-down", `${heroProgress * 46}px`);
      document.body.classList.toggle("has-scrolled", window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      delete root.dataset.motion;
      root.style.removeProperty("--hero-scroll-up");
      root.style.removeProperty("--hero-scroll-down");
      document.body.classList.remove("has-scrolled");
    };
  }, []);

  return null;
}
