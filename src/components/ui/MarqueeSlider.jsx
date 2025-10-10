"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function MarqueeSlider({ items = [], speed = 1, size = 128, showNames = false }) {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const lastDetection = useRef(0);

  useEffect(() => {
    let animationId;

    const scrollLoop = () => {
      const container = containerRef.current;
      if (!container) return;

      container.scrollLeft += speed;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      const now = Date.now();
      if (now - lastDetection.current > 50) {
        detectCenter();
        lastDetection.current = now;
      }

      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  const detectCenter = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerCenter = container.offsetWidth / 2;

    let closestIndex = 0;
    let minDist = Infinity;

    slideRefs.current.forEach((el, index) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const imgCenter = rect.left - containerRect.left + rect.width / 2;

      const distance = Math.abs(imgCenter - containerCenter);
      if (distance < minDist) {
        minDist = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Center marker (thin line) */}
      <div
        className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-red-400 opacity-30 pointer-events-none"
        style={{ transform: "translateX(-50%)" }}
      ></div>

      <div
        ref={containerRef}
        className="scroll-container flex flex-nowrap gap-6 no-scrollbar animate-marquee"
        style={{ minWidth: "300%" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => {
          const imgSrc = typeof item === "string" ? item : item.img;
          const name = typeof item === "string" ? "" : item.name;

          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
              className={`scroll-item flex-shrink-0 text-center transition-transform duration-300 ${
                isActive ? "scale-100 z-10" : "scale-100 opacity-70"
              }`}
              style={{ width: size }}
            >
              <div
                className="relative rounded-full border-4 border-white shadow-lg mx-auto"
                style={{ width: size, height: size }}
              >
                <Image
                  src={imgSrc}
                  alt={name || `img-${i}`}
                  fill
                  className="object-cover rounded-full"
                  sizes={`${size}px`}
                />
              </div>
              {showNames && name && (
                <p className="mt-2 text-sm font-medium">{name}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
