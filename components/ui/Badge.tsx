export function Badge({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  const toneClass =
    tone === "light"
      ? "border-black/10 bg-black/[0.03] text-black/70"
      : "border-outline-variant/30 bg-primary/[0.04] text-primary-container/70";

  return (
    <span className={`inline-flex rounded px-3 py-2 font-label text-label-caps uppercase ${toneClass}`}>
      {children}
    </span>
  );
}
