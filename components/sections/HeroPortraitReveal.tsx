"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroPortrait from "@/assets/hero-portrait.png";

export function HeroPortraitReveal() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updateFromPoint = (clientX: number, clientY: number) => {
      const rect = portraitRef.current?.getBoundingClientRect();
      if (!rect) return;

      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      setActive(inside);

      if (inside) {
        setPosition({
          x: ((clientX - rect.left) / rect.width) * 100,
          y: ((clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => updateFromPoint(event.clientX, event.clientY);
    const handleMouseMove = (event: MouseEvent) => updateFromPoint(event.clientX, event.clientY);
    const handlePointerLeave = () => setActive(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={portraitRef}
      className="pointer-events-auto relative aspect-square w-[44vw] min-w-[300px] max-w-[32rem] overflow-hidden bg-black shadow-lift"
      onPointerLeave={() => setActive(false)}
    >
      <Image
        src={heroPortrait}
        alt="Shravankumar Chinnaram portrait"
        fill
        priority
        sizes="(max-width: 768px) 82vw, 44vw"
        className="object-contain opacity-90 grayscale brightness-75"
        placeholder="blur"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
      <Image
        src={heroPortrait}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 82vw, 44vw"
        aria-hidden
        className="z-20 object-contain opacity-100 saturate-125 brightness-110 transition-opacity duration-200"
        placeholder="blur"
        style={{
          clipPath: active
            ? `circle(22% at ${position.x}% ${position.y}%)`
            : "circle(0% at 50% 50%)"
        }}
      />
    </div>
  );
}
