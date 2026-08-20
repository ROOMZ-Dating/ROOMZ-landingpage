import { useState } from "react";
import type { FunnelOut } from "../api/types";
import { ORDINAL_RAMP, fmt } from "./tokens";
import { TableView } from "./primitives";

type Stage = {
  key: keyof FunnelOut;
  label: string;
  value: number | null;
  color: string;
};

/**
 * Horizontal engagement funnel on the validated 5-step ordinal ramp — stage
 * order is carried by the color's monotone darkening. Drop-off percentages sit
 * between consecutive measurable stages. An "Invited" of null means the room
 * predates link-open instrumentation: that row shows "No data" and the
 * drop-off chain starts at Joined instead of showing a fake 0.
 */
export default function FunnelChart({ funnel }: { funnel: FunnelOut }) {
  const [hover, setHover] = useState<string | null>(null);

  const stages: Stage[] = [
    { key: "invited", label: "Invited", value: funnel.invited, color: ORDINAL_RAMP[0] },
    { key: "joined", label: "Joined", value: funnel.joined, color: ORDINAL_RAMP[1] },
    { key: "sent_hey", label: "Sent a Hey!", value: funnel.sent_hey, color: ORDINAL_RAMP[2] },
    { key: "matched", label: "Matched", value: funnel.matched, color: ORDINAL_RAMP[3] },
    { key: "chatted", label: "Chatted", value: funnel.chatted, color: ORDINAL_RAMP[4] },
  ];

  const max = Math.max(1, ...stages.map((s) => s.value ?? 0));

  return (
    <div>
      <ol className="space-y-1">
        {stages.map((stage, i) => {
          const prev = stages
            .slice(0, i)
            .reverse()
            .find((s) => s.value !== null && s.value > 0);
          const drop =
            stage.value !== null && prev
              ? Math.round((1 - stage.value / (prev.value as number)) * 100)
              : null;

          return (
            <li key={stage.key}>
              {drop !== null && drop > 0 && (
                <p className="pl-[124px] text-[11px] leading-5 text-ink-light nums">↓ {drop}%</p>
              )}
              <div
                className="flex items-center gap-3 rounded-lg py-1"
                tabIndex={0}
                onPointerEnter={() => setHover(stage.key)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(stage.key)}
                onBlur={() => setHover(null)}
                aria-label={
                  stage.value === null
                    ? `${stage.label}: no data`
                    : `${stage.label}: ${stage.value}`
                }
              >
                <span className="w-[112px] shrink-0 text-right text-[13px] font-semibold text-ink-muted">
                  {stage.label}
                </span>
                {stage.value === null ? (
                  <span
                    className="rounded-pill border border-line px-2.5 py-0.5 text-[12px] text-ink-light"
                    title="This room predates invite-link tracking"
                  >
                    No data
                  </span>
                ) : (
                  <>
                    {/* 20px bar, 4px rounded data-end, square at the baseline. */}
                    <div className="min-w-0 flex-1">
                      <div
                        className="h-5 rounded-r"
                        style={{
                          width: `${Math.max(2, (stage.value / max) * 100)}%`,
                          backgroundColor: stage.color,
                          opacity: hover && hover !== stage.key ? 0.55 : 1,
                          transition: "opacity 120ms ease",
                        }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-[13px] font-bold text-ink nums">
                      {fmt(stage.value)}
                    </span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <TableView
        caption="Engagement funnel"
        columns={["Stage", "Guests"]}
        rows={stages.map((s) => [s.label, s.value === null ? "No data" : fmt(s.value)])}
      />
    </div>
  );
}
