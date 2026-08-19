import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export function SectionHeading({ eyebrow, title, align = "center", tone = "dark" }: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  const titleClass = tone === "light" ? "text-black" : "gradient-text-hero";
  const eyebrowClass = tone === "light" ? "text-black/40" : "text-primary/40";

  return (
    <Reveal className={`max-w-4xl ${alignClass}`}>
      <p className={`font-label text-label-caps uppercase tracking-[0.3em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-headline-lg uppercase ${titleClass}`}>{title}</h2>
    </Reveal>
  );
}
