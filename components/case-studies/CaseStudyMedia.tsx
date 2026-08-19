import type { ReactNode } from "react";
import Image from "next/image";

interface CaseStudyMediaProps {
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
}

export function CaseStudyMedia({
  alt,
  children,
  className,
  imageClassName = "object-cover",
  priority,
  sizes,
  src
}: CaseStudyMediaProps) {
  const isGif = src.toLowerCase().endsWith(".gif");

  return (
    <div className={className}>
      {isGif ? (
        <img src={src} alt={alt} className={`h-full w-full ${imageClassName}`} loading={priority ? "eager" : "lazy"} />
      ) : (
        <Image src={src} alt={alt} fill priority={priority} unoptimized sizes={sizes} className={imageClassName} />
      )}
      {children}
    </div>
  );
}
