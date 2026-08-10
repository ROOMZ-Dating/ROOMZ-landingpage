export default function Wordmark({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      /* The reference site's wordmark is an image, so it isn't governed by the
         500-weight display rule. Set inline so it wins over that rule. */
      style={{ fontWeight: 700 }}
      className={`font-display text-[26px] tracking-[-0.02em] ${
        onDark ? "text-white" : "text-ink-black"
      } ${className}`}
    >
      Room<span className={onDark ? "text-brand-soft" : "text-brand"}>z</span>
    </span>
  );
}
