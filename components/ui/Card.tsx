export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`glass-panel rounded-lg p-6 shadow-rim ${className}`}>{children}</article>;
}
