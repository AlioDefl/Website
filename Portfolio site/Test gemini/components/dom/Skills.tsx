"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsSphere from "@/components/canvas/SkillsSphere";

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  data: {
    technical: string[];
    design: string[];
  };
}

export default function Skills({ data }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the canvas while scrolling through skills
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: canvasRef.current,
        pinSpacing: false,
      });

      // Fade in technical skills
      gsap.from(technicalRef.current?.children || [], {
        scrollTrigger: {
          trigger: technicalRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });

      // Fade in design skills
      gsap.from(designRef.current?.children || [], {
        scrollTrigger: {
          trigger: designRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills-section"
      className="relative min-h-screen bg-dark py-32"
    >
      {/* Fixed WebGL Canvas */}
      <div
        ref={canvasRef}
        className="fixed top-0 right-0 w-1/2 h-screen -z-10 opacity-30"
      >
        <SkillsSphere />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
        {/* Section title */}
        <div className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-light tracking-tight mb-4">
            CAPABILITIES
          </h2>
          <p className="font-mono text-sm text-light/50">
            Tools & techniques I use to bring ideas to life
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-32">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-light/80 mb-8 tracking-tight">
            Technical Stack
          </h3>
          <div ref={technicalRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.technical.map((skill, idx) => (
              <div
                key={idx}
                className="group p-6 border border-light/10 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                data-cursor="hover"
              >
                <span className="font-mono text-xs text-accent/50 block mb-2">
                  [{idx.toString().padStart(2, "0")}]
                </span>
                <p className="font-display text-lg text-light group-hover:text-accent transition-colors duration-300">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Skills */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-light/80 mb-8 tracking-tight">
            Design & Creative
          </h3>
          <div ref={designRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.design.map((skill, idx) => (
              <div
                key={idx}
                className="group p-6 border border-light/10 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                data-cursor="hover"
              >
                <span className="font-mono text-xs text-accent/50 block mb-2">
                  [{idx.toString().padStart(2, "0")}]
                </span>
                <p className="font-display text-lg text-light group-hover:text-accent transition-colors duration-300">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
