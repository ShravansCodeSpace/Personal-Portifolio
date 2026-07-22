"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroPortrait from "@/assets/hero-portrait.png";

export function HeroPortraitReveal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [titlePosition, setTitlePosition] = useState({ x: 50, y: 50 });
  const [portraitPosition, setPortraitPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setCanHover(media.matches);

    updateHoverSupport();
    media.addEventListener("change", updateHoverSupport);

    return () => media.removeEventListener("change", updateHoverSupport);
  }, []);

  useEffect(() => {
    if (!canHover) {
      setActive(false);
      return;
    }

    const pointInRect = (clientX: number, clientY: number, rect: DOMRect) =>
      clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;

    const toPercent = (clientX: number, clientY: number, rect: DOMRect) => ({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100
    });

    const updateFromPoint = (clientX: number, clientY: number) => {
      const heroRect = heroRef.current?.getBoundingClientRect();
      const titleRect = titleRef.current?.getBoundingClientRect();
      const portraitRect = portraitRef.current?.getBoundingClientRect();

      if (!heroRect || !titleRect || !portraitRect) return;

      setActive(pointInRect(clientX, clientY, heroRect));
      setTitlePosition(toPercent(clientX, clientY, titleRect));
      setPortraitPosition(toPercent(clientX, clientY, portraitRect));
    };

    const handlePointerMove = (event: PointerEvent) => updateFromPoint(event.clientX, event.clientY);
    const handleMouseMove = (event: MouseEvent) => updateFromPoint(event.clientX, event.clientY);
    const handleLeave = () => setActive(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [canHover]);

  const titleMask = active ? `circle(17% at ${titlePosition.x}% ${titlePosition.y}%)` : "circle(0% at 50% 50%)";
  const portraitMask = active
    ? `circle(22% at ${portraitPosition.x}% ${portraitPosition.y}%)`
    : "circle(0% at 50% 50%)";

  return (
    <div ref={heroRef} className="isolate absolute inset-0 z-10 flex items-center justify-center px-[clamp(1.5rem,5vw,5rem)] pt-10">
      <div
        ref={portraitRef}
        className="pointer-events-none absolute -z-10 aspect-square w-[44vw] min-w-[300px] max-w-[32rem] overflow-hidden shadow-lift"
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
          className="z-20 object-contain opacity-100 saturate-125 brightness-110 transition-[clip-path] duration-100"
          placeholder="blur"
          style={{ clipPath: portraitMask }}
        />
      </div>
      <div className="pointer-events-none relative z-30 w-full text-center">
        <p className="mb-6 font-label text-label-caps uppercase tracking-[0.3em] text-primary-container/60">
          Senior SAP Commerce Cloud Developer // AI-Integrated Delivery
        </p>
        <h1
          ref={titleRef}
          className="relative select-none break-words font-display text-[clamp(4rem,11vw,10rem)] font-extrabold uppercase leading-[0.88]"
        >
          <span className="gradient-text-hero block grayscale brightness-75">SAP Commerce</span>
          <span aria-hidden className="hero-title-color absolute inset-0 block" style={{ clipPath: titleMask }}>
            SAP Commerce
          </span>
        </h1>
      </div>
    </div>
  );
}
