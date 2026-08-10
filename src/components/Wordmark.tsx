export default function Wordmark({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={`font-display text-[26px] font-extrabold tracking-[-0.02em] ${
        onDark ? "text-white" : "text-ink-black"
      } ${className}`}
    >
      Room<span className={onDark ? "text-brand-soft" : "text-brand"}>z</span>
    </span>
  );
}
