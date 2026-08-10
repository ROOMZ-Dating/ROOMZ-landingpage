import type { ReactNode } from "react";

/** Small lavender-tinted label that names the audience a section speaks to. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill border border-brand-softEdge bg-brand-soft px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand ${className}`}
    >
      {children}
    </span>
  );
}
