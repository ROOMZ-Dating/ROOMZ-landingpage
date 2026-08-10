import { useEffect, useRef, useState } from "react";

const HOLD_MS = 2600;
const EXIT_MS = 300;

/**
 * The headline's last phrase cycles inside a purple chip. Hidden copies of every
 * phrase are measured so the chip can animate its width to fit the incoming
 * word instead of jumping — the reason the swap reads as one motion.
 */
export default function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [width, setWidth] = useState<number>();
  const ghosts = useRef<(HTMLSpanElement | null)[]>([]);

  const measure = (i: number) => {
    const el = ghosts.current[i];
    if (el) setWidth(el.getBoundingClientRect().width);
  };

  useEffect(() => {
    const id = window.setInterval(() => setLeaving(true), HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setLeaving(false);
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [leaving, words.length]);

  useEffect(() => {
    measure(index);
  }, [index]);

  // Fraunces loads async; re-measure once the real face is in so the chip isn't
  // sized to the fallback serif.
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && measure(index));
    const onResize = () => measure(index);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className="relative inline-block whitespace-nowrap align-bottom transition-[width] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width }}
      >
        {/* Clipped to a zero-size box: the ghosts still report their true width
            to getBoundingClientRect, but a long phrase can no longer stretch the
            document and give the page a horizontal scrollbar on small screens. */}
        <span className="absolute left-0 top-0 h-0 w-0 overflow-hidden">
          {words.map((word, i) => (
            <span
              key={word}
              ref={(el) => (ghosts.current[i] = el)}
              className="absolute left-0 top-0 whitespace-nowrap px-3"
            >
              {word}
            </span>
          ))}
        </span>

        <span
          key={index}
          className={`inline-block whitespace-nowrap rounded-2xl bg-brand px-3 text-white ${
            leaving ? "animate-rotOut" : "animate-rotIn"
          }`}
        >
          {words[index]}
        </span>
      </span>

      {/* The rotation is decorative motion; screen readers get the full set once. */}
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}
