import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "onDark";
type Size = "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold rounded-pill transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  // Royal Purple is dark, so the label goes white here — the reference's light
  // accent carried black text.
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "border-2 border-ink/15 bg-white text-ink hover:border-ink",
  onDark: "bg-white text-ink hover:bg-brand-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[14px]",
  lg: "px-8 py-3.5 text-[15px] sm:min-w-[220px]",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "sm",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
