"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tech: string[];
}

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const totalWidth = containerRef.current.scrollWidth;

      // Horizontal scroll setup
      const scrollTween = gsap.to(containerRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: "#gallery-wrapper",
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,

          // VELOCITY SKEW MAGIC
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = gsap.utils.clamp(-8, 8, velocity / 400);

            // Apply skew to cards
            gsap.to(cardsRef.current, {
              skewY: skewAmount,
              overwrite: "auto",
              duration: 0.5,
              ease: "power3.out",
            });
          },
        },
      });

      // Parallax on images
      cardsRef.current.forEach((card) => {
        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      id="gallery-wrapper"
      className="h-screen w-full overflow-hidden bg-dark py-20"
    >
      {/* Section title */}
      <div className="px-6 md:px-20 mb-12">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-light tracking-tight">
          SELECTED WORKS
        </h2>
        <p className="font-mono text-sm text-light/50 mt-2">
          [{projects.length.toString().padStart(2, "0")}] Projects
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-12 px-6 md:px-20 h-[70vh] items-center will-change-transform"
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="min-w-[85vw] md:min-w-[60vw] h-full relative overflow-hidden border border-light/10 group cursor-pointer"
            data-cursor="hover"
          >
            {/* Image with parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute top-0 left-0 w-[120%] h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                style={{ transform: "translateX(-10%)" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              {/* Category & Year */}
              <div className="flex items-center gap-4 mb-4 font-mono text-xs text-light/60">
                <span>{project.category}</span>
                <span className="w-1 h-1 bg-light/60 rounded-full" />
                <span>{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-4xl md:text-6xl font-bold text-light mb-4 tracking-tight leading-none">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-light/70 mb-6 max-w-md">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-light/20 font-mono text-xs text-light/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Index number */}
            <div className="absolute top-8 right-8 font-display text-6xl md:text-8xl font-bold text-light/5 group-hover:text-light/10 transition-colors duration-500">
              {i.toString().padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
