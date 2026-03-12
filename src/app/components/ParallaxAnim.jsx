"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────── Magnetic Image ───────────────── */
const tl = gsap.timeline();
function MagneticImage({ src, w, h, mt }) {
  const img = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useGSAP(() => {
    xTo.current = gsap.quickTo(img.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    yTo.current = gsap.quickTo(img.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
  });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;

    xTo.current(x);
    yTo.current(y);

    gsap.to(img.current, { scale: 1.05, duration: 0.3 });
  };

  const handleLeave = () => {
    xTo.current(0);
    yTo.current(0);

    gsap.to(img.current, {
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1,0.3)",
    });
  };

  return (
    <div
      className={`${w} ${h} ${mt} rounded-xl overflow-hidden shadow-md cursor-pointer`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <img
        ref={img}
        src={src}
        className="w-full h-full object-cover will-change-transform scale-[1.1]"
        loading="lazy"
      />
    </div>
  );
}

/* ───────────────── Parallax Column ───────────────── */

function ParallaxColumn({ images, speed }) {
  const column = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        column.current,
        { yPercent: speed * -1 },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: column.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    },
    { scope: column },
  );

  return (
    <div ref={column} className="flex flex-col gap-4">
      {images.map((img, i) => (
        <MagneticImage key={i} {...img} />
      ))}
    </div>
  );
}

/* ───────────────── Main Component ───────────────── */

export default function ParallaxAnim() {
  const sectionRef = useRef(null);
  const centerContainer = useRef(null);

  useGSAP(
    () => {
      /* center text scroll */
      gsap.to(".centerText", {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* center image animation */
      const firstCenterImg = gsap.utils.toArray(
        ".centerImg",
        centerContainer.current,
      )[0];

      if (!firstCenterImg) return;

      gsap.to(firstCenterImg, {
        scale: 3,
        yPercent: 280,
        transformOrigin: "center left",
        scrollTrigger: {
          trigger: firstCenterImg,
          start: "top 60%",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative ParallaxAnim z-[-1] w-full min-h-screen  py-20"
    >
      {/* Center Text */}
      <div className="w-full h-screen centerText absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        <h2 className="text-gray-400 mb-4">We built our own road.</h2>

        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl text-[#2D2D2D]">
          Our revolutionary Physical AI Platform enables true scale.
        </h1>
      </div>

      {/* Parallax Columns */}
      <div className="flex justify-between px-10">
        <div className="flex gap-20">
          <ParallaxColumn images={LEFT_COL_1} speed={-20} />
          <ParallaxColumn images={LEFT_COL_2} speed={15} />
        </div>

        <div className="flex gap-20">
          <ParallaxColumn images={RIGHT_COL_1} speed={20} />
          <ParallaxColumn images={RIGHT_COL_2} speed={-15} />
        </div>
      </div>

      {/* Center Image Row */}
      <div
        ref={centerContainer}
        className="flex gap-20 mt-[15vw] items-center justify-center w-full"
      >
        <div className="flex justify-evenly w-full items-center rounded-xl">
          {LEFT_COL_1.map((img, i) => (
            <div
              key={i}
              className="w-[12vw] h-[10vw] centerImg rounded-xl overflow-hidden"
            >
              <img
                src={img.src}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ─── image data ─────────────────────────────────────────── */
const LEFT_COL_1 = [
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183903-waabi_road2_04462.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-0",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_exterior_morning_00857.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_road2_05483.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
];
const LEFT_COL_2 = [
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183903-waabi_road2_04462.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-0",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_exterior_morning_00857.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_road2_05483.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
];
const RIGHT_COL_1 = [
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183903-waabi_road2_04462.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-0",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_exterior_morning_00857.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_road2_05483.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
];
const RIGHT_COL_2 = [
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183903-waabi_road2_04462.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-0",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_exterior_morning_00857.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
  {
    src: "https://waabi.ai/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F163962%2F1761183902-waabi_road2_05483.png%3Ffit%3Dmax%26h%3D3000%26q%3D90%26w%3D2000&w=3840&q=75",
    w: "w-[12vw]",
    h: "h-[10vw]",
    mt: "mt-[10vw]",
  },
];
