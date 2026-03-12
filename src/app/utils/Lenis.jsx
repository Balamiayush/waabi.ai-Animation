"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // 2. Create the animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3. Cleanup on unmount (very important for Next.js)
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default LenisScroll;