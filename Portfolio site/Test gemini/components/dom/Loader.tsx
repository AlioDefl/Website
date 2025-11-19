"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const binaryRef = useRef<HTMLDivElement>(null);
  const [binaryText, setBinaryText] = useState("");
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLoadProgress = useStore((state) => state.setLoadProgress);

  useEffect(() => {
    // Generate random binary
    const generateBinary = () => {
      return Array.from({ length: 100 }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
    };

    // Animate binary text
    const binaryInterval = setInterval(() => {
      setBinaryText(generateBinary());
    }, 50);

    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        clearInterval(binaryInterval);

        // Animate loader out
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsLoading(false);
            },
          });

          tl.to(progressRef.current, {
            width: "100%",
            duration: 0.5,
            ease: "power2.inOut",
          })
            .to(loaderRef.current, {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              duration: 1.2,
              ease: "expo.inOut",
            }, "+=0.3");
        }, 500);
      }

      setLoadProgress(Math.min(progress, 100));

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${Math.min(progress, 100)}%`,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, 100);

    return () => {
      clearInterval(binaryInterval);
      clearInterval(progressInterval);
    };
  }, [setIsLoading, setLoadProgress]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-dark flex items-center justify-center"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="text-center">
        {/* Binary animation */}
        <div
          ref={binaryRef}
          className="font-mono text-xs text-light/30 mb-8 tracking-wider overflow-hidden h-8"
        >
          {binaryText}
        </div>

        {/* Loading text */}
        <div className="font-display text-4xl md:text-6xl font-bold text-light mb-12 tracking-tight">
          LOADING
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-light/10 relative mx-auto">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-light"
            style={{ width: "0%" }}
          />
        </div>

        {/* Percentage (optional) */}
        <div className="font-mono text-sm text-light/50 mt-4">
          {Math.floor(useStore.getState().loadProgress)}%
        </div>
      </div>
    </div>
  );
}
