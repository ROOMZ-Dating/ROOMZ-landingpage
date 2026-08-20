import { useState } from "react";
import type { PeakHourOut } from "../api/types";
import { INK_SECONDARY, fmt, seqColor } from "./tokens";
import { ChartTooltip, TableView, useMeasure } from "./primitives";

const ROWS = [
  { key: "joins", label: "Joins" },
  { key: "heys", label: "Hey!s" },
  { key: "matches", label: "Matches" },
] as const;

const CELL_H = 26;
const GAP = 2;
const LABEL_W = 64;
const HOUR_TICKS = [0, 6, 12, 18, 23];

/**
 * 3×24 heatmap on the single-hue sequential ramp. Each metric row is scaled to
 * its own max (joins and Hey!s differ by an order of magnitude — one shared
 * scale would flatten two rows), which the subtitle states. Cells carry a 2px
 * surface gap; exact values live in the tooltip and the table view.
 */
export default function PeakHoursHeatmap({ hours }: { hours: PeakHourOut[] }) {
  const [wrapRef, width] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<{ row: number; hour: number } | null>(null);

  const sorted = [...hours].sort((a, b) => a.hour - b.hour);
  const rowMax = ROWS.map((r) => Math.max(1, ...sorted.map((h) => h[r.key])));

  const gridW = Math.max(0, width - LABEL_W);
  const cellW = gridW > 0 ? gridW / 24 : 0;
  const height = ROWS.length * CELL_H + 22;

  const hovered = hover ? sorted.find((h) => h.hour === hover.hour) : null;

  return (
    <div>
      <p className="text-[12px] text-ink-light">Shading scaled per row.</p>
      <div ref={wrapRef} className="relative mt-2" style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Activity by hour of day">
            {ROWS.map((row, ri) => (
              <g key={row.key}>
                <text
                  x={LABEL_W - 10}
                  y={ri * CELL_H + CELL_H / 2 + 4}
                  textAnchor="end"
                  fontSize={12}
                  fontWeight={600}
                  fill={INK_SECONDARY}
                >
                  {row.label}
                </text>
                {sorted.map((h) => {
                  const value = h[row.key];
                  const isHover = hover?.row === ri && hover?.hour === h.hour;
                  return (
                    <rect
                      key={h.hour}
                      x={LABEL_W + h.hour * cellW + GAP / 2}
                      y={ri * CELL_H + GAP / 2}
                      width={Math.max(0, cellW - GAP)}
                      height={CELL_H - GAP}
                      rx={2}
                      fill={seqColor(value / rowMax[ri])}
                      stroke={isHover ? "#111113" : "none"}
                      strokeWidth={isHover ? 1.5 : 0}
                      onPointerEnter={() => setHover({ row: ri, hour: h.hour })}
                      onPointerLeave={() => setHover(null)}
                    >
                      <title>{`${row.label}, ${h.hour}:00 — ${value}`}</title>
                    </rect>
                  );
                })}
              </g>
            ))}
            {HOUR_TICKS.map((hour) => (
              <text
                key={hour}
                x={LABEL_W + hour * cellW + cellW / 2}
                y={height - 6}
                textAnchor="middle"
                fontSize={11}
                fill={INK_SECONDARY}
                className="nums"
              >
                {hour}:00
              </text>
            ))}
          </svg>
        )}

        {hover && hovered && (
          <ChartTooltip
            x={LABEL_W + hover.hour * cellW + cellW / 2}
            y={hover.row * CELL_H}
            width={width}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-light">
              {hover.hour}:00–{hover.hour}:59
            </p>
            <p className="text-[13px] font-bold text-ink">
              {fmt(hovered[ROWS[hover.row].key])}{" "}
              <span className="font-normal text-ink-muted">{ROWS[hover.row].label}</span>
            </p>
          </ChartTooltip>
        )}
      </div>

      <TableView
        caption="Activity by hour of day"
        columns={["Hour", ...ROWS.map((r) => r.label)]}
        rows={sorted.map((h) => [`${h.hour}:00`, ...ROWS.map((r) => fmt(h[r.key]))])}
      />
    </div>
  );
}
