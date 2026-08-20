import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import type { RoomAnalyticsOut, RoomOut } from "../api/types";
import { track } from "../analytics";
import { useAuth } from "../state";
import { SERIES, fmt } from "../charts/tokens";
import { suppressSmallCells } from "../charts/suppress";
import FunnelChart from "../charts/FunnelChart";
import LineChart from "../charts/LineChart";
import BarBreakdown from "../charts/BarBreakdown";
import PeakHoursHeatmap from "../charts/PeakHoursHeatmap";
import { TableView } from "../charts/primitives";
import {
  EmptyState,
  SectionCard,
  Spinner,
  StatTile,
  UpsellCard,
} from "../components/ui";

const PAIRS_PER_PAGE = 10;

const SOURCE_LABEL: Record<string, string> = {
  qr: "QR scan",
  link: "Link",
  code: "Entered code",
  unknown: "Unknown",
};

export default function RoomDeepDive() {
  const { roomId } = useParams<{ roomId: string }>();
  const { entitlements } = useAuth();
  const [room, setRoom] = useState<RoomOut | null>(null);
  const [analytics, setAnalytics] = useState<RoomAnalyticsOut | null>(null);
  const [error, setError] = useState(false);
  const [pairPage, setPairPage] = useState(0);

  useEffect(() => {
    if (!roomId) return;
    track("web_dashboard_room_viewed", { room_id: roomId });
    let alive = true;
    (async () => {
      try {
        const [r, a] = await Promise.all([api.room(roomId), api.roomAnalytics(roomId)]);
        if (alive) {
          setRoom(r);
          setAnalytics(a);
        }
      } catch {
        if (alive) setError(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [roomId]);

  const timelinePoints = useMemo(
    () =>
      (analytics?.timeline ?? []).map((p) => ({
        t: Date.parse(p.t),
        joins: p.joins,
        heys: p.heys,
        matches: p.matches,
      })),
    [analytics],
  );

  if (error) {
    return (
      <EmptyState>
        Couldn't load this room.{" "}
        <Link to="/dashboard" className="font-semibold text-brand underline-offset-4 hover:underline">
          Back to portfolio
        </Link>
      </EmptyState>
    );
  }
  if (!room || !analytics) return <Spinner label="Loading room analytics" />;

  const pairPages = Math.ceil(analytics.match_pairs.length / PAIRS_PER_PAGE);
  const pairs = analytics.match_pairs.slice(
    pairPage * PAIRS_PER_PAGE,
    (pairPage + 1) * PAIRS_PER_PAGE,
  );

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/dashboard"
          className="text-[13px] font-semibold text-ink-muted transition-colors hover:text-ink"
        >
          ← Portfolio
        </Link>
        <h1 className="mt-2 font-display text-[28px] font-bold leading-tight text-ink">
          {room.event_name}
        </h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          {room.event_date
            ? new Date(room.event_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "No date"}
          {room.location ? ` · ${room.location}` : ""} · {room.status}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Guests" value={analytics.guest_count} />
        <StatTile label="Hey!s sent" value={analytics.hey_count} />
        <StatTile label="Matches" value={analytics.match_count} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Engagement funnel"
          sub="From link open to a conversation."
        >
          {analytics.funnel ? (
            <FunnelChart funnel={analytics.funnel} />
          ) : (
            <EmptyState>Funnel data isn't available for this room yet.</EmptyState>
          )}
        </SectionCard>

        <SectionCard title="Room timeline" sub="Joins, Hey!s, and matches over the room's life.">
          {timelinePoints.length >= 2 ? (
            <LineChart
              ariaLabel="Joins, Hey!s, and matches over time"
              series={[
                { key: "joins", label: "Joins", color: SERIES[0] },
                { key: "heys", label: "Hey!s", color: SERIES[1] },
                { key: "matches", label: "Matches", color: SERIES[2] },
              ]}
              points={timelinePoints}
            />
          ) : (
            <EmptyState>Timeline data isn't available for this room yet.</EmptyState>
          )}
        </SectionCard>

        <SectionCard
          title="Audience"
          sub="Small groups are hidden to protect guest privacy."
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                Gender
              </h3>
              <div className="mt-3">
                <BarBreakdown
                  caption="Guests by gender"
                  buckets={suppressSmallCells(
                    analytics.gender_breakdown.map((g) => ({ label: g.gender, count: g.count })),
                  )}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                Age
              </h3>
              <div className="mt-3">
                <BarBreakdown
                  caption="Guests by age range"
                  buckets={suppressSmallCells(
                    analytics.age_breakdown.map((a) => ({ label: a.range, count: a.count })),
                  )}
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="How guests joined" sub="Join method, captured at join time.">
          {analytics.join_source_breakdown?.length ? (
            <BarBreakdown
              caption="Guests by join source"
              buckets={analytics.join_source_breakdown.map((s) => ({
                label: SOURCE_LABEL[s.source] ?? s.source,
                count: s.count,
              }))}
            />
          ) : (
            <EmptyState>Join-source data isn't available for this room yet.</EmptyState>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Peak activity hours" sub="When guests join, send Hey!s, and match.">
        {analytics.peak_hours?.length ? (
          <PeakHoursHeatmap hours={analytics.peak_hours} />
        ) : (
          <EmptyState>Hourly activity isn't available for this room yet.</EmptyState>
        )}
      </SectionCard>

      <SectionCard title="Matches" sub="Names only — chats are never visible to organizers.">
        {analytics.match_pairs.length === 0 ? (
          <EmptyState>No matches yet.</EmptyState>
        ) : (
          <>
            <TableView
              caption="Match pairs"
              columns={["Match", "When"]}
              rows={pairs.map((p) => [
                `${p.user_a.name ?? "Guest"} & ${p.user_b.name ?? "Guest"}`,
                new Date(p.matched_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }),
              ])}
            />
            {pairPages > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  disabled={pairPage === 0}
                  onClick={() => setPairPage((p) => p - 1)}
                  className="text-[13px] font-semibold text-ink-muted hover:text-ink disabled:opacity-40"
                >
                  ← Previous
                </button>
                <span className="text-[12px] text-ink-light nums">
                  {pairPage + 1} / {pairPages}
                </span>
                <button
                  type="button"
                  disabled={pairPage >= pairPages - 1}
                  onClick={() => setPairPage((p) => p + 1)}
                  className="text-[13px] font-semibold text-ink-muted hover:text-ink disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </SectionCard>

      <ExportTools roomId={room.id} eventName={room.event_name} guests={analytics.guest_count} matches={analytics.match_count} canExport={entitlements.canPdf} />
    </div>
  );
}

/**
 * PDF / share card / aggregate CSV — Unlimited only. The report endpoints are
 * deferred backend scope; until they exist the buttons surface a friendly
 * failure rather than pretending to work. Aggregate CSV is computed
 * client-side from data already on the page, so it works today.
 */
function ExportTools({
  roomId,
  eventName,
  guests,
  matches,
  canExport,
}: {
  roomId: string;
  eventName: string;
  guests: number;
  matches: number;
  canExport: boolean;
}) {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (!canExport) track("web_upsell_shown", { feature: "pdf", room_id: roomId });
  }, [canExport, roomId]);

  if (!canExport) {
    return (
      <UpsellCard
        title="Branded reports and share cards."
        body={`Unlimited unlocks a branded PDF report for ${eventName}, social share cards ("${fmt(guests)} singles · ${fmt(matches)} matches"), and aggregate CSV exports.`}
      />
    );
  }

  return (
    <SectionCard title="Export" sub="Aggregate figures only — never guest-level data.">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setNote("PDF reports arrive when the reports API is deployed.")}
          className="rounded-pill border border-line px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-brand-softEdge hover:bg-brand-soft"
        >
          Branded PDF report
        </button>
        <button
          type="button"
          onClick={() => setNote("Share cards arrive when the reports API is deployed.")}
          className="rounded-pill border border-line px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-brand-softEdge hover:bg-brand-soft"
        >
          Social share card
        </button>
        <button
          type="button"
          onClick={() => {
            const rows = [
              ["metric", "value"],
              ["guests", String(guests)],
              ["matches", String(matches)],
            ];
            const csv = rows.map((r) => r.join(",")).join("\r\n");
            const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = `roomz-${roomId}-stats.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-pill border border-line px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-brand-softEdge hover:bg-brand-soft"
        >
          Aggregate CSV
        </button>
      </div>
      {note && <p className="mt-3 text-[13px] text-ink-muted">{note}</p>}
    </SectionCard>
  );
}
