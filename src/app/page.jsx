"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxAnim from "./components/ParallaxAnim";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const container = useRef(null);
 useGSAP(
  () => {
    const mm = gsap.matchMedia();

    // default state
    gsap.set(".heroVideo", {
      clipPath: "inset(0% 0% round 0px)",
      scale: 1,
      transformOrigin: "center center",
    });

    // DESKTOP
    mm.add("(min-width: 1024px)", () => {
      gsap.to(".heroVideo", {
        scale: 0.2,
        clipPath: "inset(10% 15% 10% 15% round 40px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".herosection",
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
          markers: false,
        },
      });
    });

    // TABLET
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.to(".heroVideo", {
        scale: 0.2,
        // clipPath: "inset(8% 10% 8% 10% round 30px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".herosection",
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
        },
      });
    });

    // MOBILE
    mm.add("(max-width: 767px)", () => {
      gsap.to(".heroVideo", {
        scale: 0.2,
        // clipPath: "inset(5% 6% 5% 6% round 20px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".herosection",
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
        },
      });
    });
  },
  { scope: container }
);
  return (
    <div className="w-full h-full relative">
      <div ref={container} className="w-full h-[180vh] relative ">
      
        <div className="sticky herosection top-0  h-svh w-full">
          <div className="absolute top-0 left-0 h-dvh w-full">
            <div className="absolute heroVideo inset-0 will-change-transform">
              <div>
                <div className="absolute inset-0 size-full">
                  <div className="absolute inset-0" style={{ opacity: 1 }}>
                    <video
                      autoPlay
                      playsInline
                      loop
                      muted
                      className="size-full object-cover"
                    >
                      <source
                        src="https://static.ext.waabi.ai/WAABI_27s_2K_antinomy_export_250823.mp4"
                        media="(min-width: 768px)"
                      />
                      <source src="https://static.ext.waabi.ai/Hero_27Sec_responsive.mp4" />
                    </video>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 bg-black/20"
                style={{ opacity: 0 }}
              ></div>
            </div>
          </div>
    
        </div>
        <ParallaxAnim />
      </div>
        <div className="page3 w-full h-screen relative  px-10 py-[]   ">
          <div className="container  w-1/2 h-full ">

          </div>
          <div className="flex items-center justify-end">
            <div className="flex flex-col gap-2">
          <p className="text-[4vw] text font-medium text-black tracking-tight leading-[90%]">Unlocking <br /> scale in  the <br /> real world.</p>
          <p className="text-[0.89vw] text font-medium text-black tracking-tight leading-[90%]">We deliver a product that's faster, safer, more scalable, and <br /> efficient—unlocking  the true potential of autonomous transportation.</p>
        </div>
            </div>
          </div>
          <div className="page4 w-full h-screen"></div>
    </div>
  );
};

export default Homepage;
