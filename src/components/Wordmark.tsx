/**
 * The ROOMZ wordmark. The source file ships with a large empty viewBox, so
 * `public/roomz-logo.svg` is the same artwork cropped to its content bounds
 * (1447.55 x 285.27, about 5.07:1) — otherwise the mark renders small and
 * off-centre inside its own padding.
 *
 * The artwork is black lettering with the second O in #6B21A8, so it is only
 * placed on light backgrounds. A dark-background surface needs a light variant
 * of the asset rather than a colour prop.
 */
export default function Wordmark({
  className = "",
  height = 26,
}: {
  className?: string;
  /** Rendered height in px; width follows the 5.07:1 aspect ratio. */
  height?: number;
}) {
  return (
    <img
      src="/roomz-logo.svg"
      alt="Roomz"
      height={height}
      width={Math.round(height * 5.0743)}
      style={{ height, width: "auto" }}
      className={`block ${className}`}
    />
  );
}
