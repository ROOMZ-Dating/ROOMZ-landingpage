import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { RoomOut, RoomStatus } from "../api/types";
import { track } from "../analytics";
import { useAuth } from "../state";
import { SERIES, fmt } from "../charts/tokens";
import LineChart from "../charts/LineChart";
import { EmptyState, Spinner, StatTile, UpsellCard } from "../components/ui";

const STATUS_STYLE: Record<RoomStatus, string> = {
  upcoming: "border-brand-softEdge bg-brand-soft text-brand",
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  closed: "border-line bg-surface text-ink-muted",
};

function StatusBadge({ status }: { status: RoomStatus }) {
  return (
    <span
      className={`rounded-pill border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

/**
 * Cross-room aggregates come from room stats; per-room match counts aren't in
 * RoomOut, so total matches loads from each room's analytics in parallel.
 */
export default function Portfolio() {
  const { entitlements } = useAuth();
  const [rooms, setRooms] = useState<RoomOut[] | null>(null);
  const [matchByRoom, setMatchByRoom] = useState<Record<string, number>>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    track("web_dashboard_portfolio_viewed");
    let alive = true;
    (async () => {
      try {
        const mine = (await api.myRooms()).filter((r) => r.is_organizer);
        if (!alive) return;
        setRooms(mine);
        const counts = await Promise.all(
          mine.map(async (room) => {
            try {
              const a = await api.roomAnalytics(room.id);
              return [room.id, a.match_count] as const;
            } catch {
              return [room.id, 0] as const;
            }
          }),
        );
        if (alive) setMatchByRoom(Object.fromEntries(counts));
      } catch {
        if (alive) setError(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const totals = useMemo(() => {
    if (!rooms) return null;
    const guests = rooms.reduce((sum, r) => sum + r.guest_count, 0);
    const matches = Object.values(matchByRoom).reduce((sum, n) => sum + n, 0);
    return {
      guests,
      matches,
      matchRate: guests > 0 ? Math.round(((matches * 2) / guests) * 100) : 0,
    };
  }, [rooms, matchByRoom]);

  const trendPoints = useMemo(() => {
    if (!rooms || !entitlements.canTrends) return [];
    return rooms
      .filter((r) => r.event_date)
      .sort((a, b) => Date.parse(a.event_date!) - Date.parse(b.event_date!))
      .map((r) => ({
        t: Date.parse(r.event_date!),
        guests: r.guest_count,
        matches: matchByRoom[r.id] ?? 0,
      }));
  }, [rooms, matchByRoom, entitlements.canTrends]);

  if (error) {
    return <EmptyState>Couldn't load your rooms. Refresh to try again.</EmptyState>;
  }
  if (!rooms) return <Spinner label="Loading rooms" />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-[28px] font-bold leading-tight text-ink">
        Your rooms
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Guests reached" value={totals?.guests ?? 0} sub="Lifetime, all rooms" />
        <StatTile label="Matches created" value={totals?.matches ?? 0} sub="Lifetime, all rooms" />
        <StatTile
          label="Average match rate"
          value={`${totals?.matchRate ?? 0}%`}
          sub="Guests who matched at least once"
        />
      </div>

      {entitlements.canTrends ? (
        trendPoints.length >= 2 && (
          <section className="rounded-3xl border border-line bg-white p-6 sm:p-7">
            <h2 className="text-[17px] font-bold text-ink">Across your events</h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Guests and matches per event, by event date.
            </p>
            <div className="mt-5">
              <LineChart
                ariaLabel="Guests and matches across events over time"
                series={[
                  { key: "guests", label: "Guests", color: SERIES[0] },
                  { key: "matches", label: "Matches", color: SERIES[1] },
                ]}
                points={trendPoints}
              />
            </div>
          </section>
        )
      ) : (
        <TrendUpsell />
      )}

      {rooms.length === 0 ? (
        <EmptyState>
          No rooms yet. Create your first room in the Roomz app — it'll show up
          here with live analytics.
        </EmptyState>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <li key={room.id}>
              <Link
                to={`/dashboard/rooms/${room.id}`}
                className="block rounded-3xl border border-line bg-white p-6 transition-colors hover:border-brand-softEdge hover:bg-brand-soft/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[16px] font-bold text-ink">{room.event_name}</h2>
                  <StatusBadge status={room.status} />
                </div>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {room.event_date
                    ? new Date(room.event_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No date"}
                  {room.location ? ` · ${room.location}` : ""}
                </p>
                <div className="mt-4 flex gap-6">
                  <p className="text-[13px] text-ink-muted">
                    <span className="font-bold text-ink nums">{fmt(room.guest_count)}</span> guests
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    <span className="font-bold text-ink nums">
                      {matchByRoom[room.id] !== undefined ? fmt(matchByRoom[room.id]) : "…"}
                    </span>{" "}
                    matches
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TrendUpsell() {
  useEffect(() => {
    track("web_upsell_shown", { feature: "trend_chart" });
  }, []);
  return (
    <UpsellCard
      title="See trends across all your events."
      body="Upgrade to Unlimited to see guests and matches plotted across every room you run — plus branded PDF reports and share cards."
    />
  );
}
