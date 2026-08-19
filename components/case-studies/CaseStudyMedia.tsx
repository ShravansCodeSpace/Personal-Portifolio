import type { ReactNode } from "react";
import Image from "next/image";
import { OrikaBytecodeVisual } from "@/components/case-studies/OrikaBytecodeVisual";

interface CaseStudyMediaProps {
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
  visual?: "orika-bytecode-limit";
}

export function CaseStudyMedia({
  alt,
  children,
  className,
  imageClassName = "object-cover",
  priority,
  sizes,
  src,
  visual
}: CaseStudyMediaProps) {
  const isGif = src.toLowerCase().endsWith(".gif");

  return (
    <div className={className}>
      {visual === "orika-bytecode-limit" ? (
        <OrikaBytecodeVisual />
      ) : isGif ? (
        <img src={src} alt={alt} className={`h-full w-full ${imageClassName}`} loading={priority ? "eager" : "lazy"} />
      ) : (
        <Image src={src} alt={alt} fill priority={priority} unoptimized sizes={sizes} className={imageClassName} />
      )}
      {children}
    </div>
  );
}
