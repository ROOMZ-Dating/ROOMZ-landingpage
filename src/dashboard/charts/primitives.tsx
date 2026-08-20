import { useEffect, useRef, useState, type ReactNode } from "react";

/** Container width via ResizeObserver, so SVGs render at true pixel width. */
export function useMeasure<T extends HTMLElement>(): [
  React.RefObject<T>,
  number,
] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

/**
 * Floating readout anchored inside the chart's relative container. Flips to
 * the left of the pointer near the right edge so it never clips.
 */
export function ChartTooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
}) {
  const flip = x > width - 170;
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 min-w-[132px] rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-card"
      style={{
        left: flip ? undefined : x + 14,
        right: flip ? width - x + 14 : undefined,
        top: Math.max(0, y - 12),
      }}
    >
      {children}
    </div>
  );
}

/** Tooltip row: value leads (strong), series name follows — see interaction.md. */
export function TooltipRow({
  color,
  label,
  value,
}: {
  color?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {color && (
        <span
          aria-hidden="true"
          className="h-0.5 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="text-[13px] font-bold text-ink">{value}</span>
      <span className="text-[12px] text-ink-muted">{label}</span>
    </div>
  );
}

/** Line-key legend, always present for ≥ 2 series. */
export function Legend({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-0.5 w-4 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-[12px] font-semibold text-ink-muted">{item.label}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * The WCAG-clean twin every chart ships — also the relief channel for any
 * series color under 3:1 contrast, per the palette validation.
 */
export function TableView({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-[12px] font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline">
        View as table
      </summary>
      <div className="mt-2 overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-[13px]">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-surface">
            <tr>
              {columns.map((col) => (
                <th key={col} className="border-b border-line px-3 py-2 font-bold text-ink">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 ${j === 0 ? "font-semibold text-ink" : "nums text-ink-muted"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
