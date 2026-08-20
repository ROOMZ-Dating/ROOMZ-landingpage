/**
 * Mirrors the FastAPI schemas in ROOMZ/backend/app/schemas — field names and
 * shapes are transcribed from the backend source, not invented here. When the
 * backend changes, this file is the one to re-check against it.
 */

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  is_new_user: boolean;
};

export type UserProfileOut = {
  id: string;
  email: string;
  name: string | null;
  is_organizer: boolean;
  organizer_name: string | null;
  organizer_role: string | null;
  organizer_business: string | null;
  organizer_bio: string | null;
  organizer_photo_url: string | null;
  is_premium: boolean;
};

export type PaymentOut = {
  id: string;
  amount_usd: number;
  kind: string;
  created_at: string;
};

export type BillingStatusOut = {
  is_premium: boolean;
  premium_until: string | null;
  active_plan: "guest_premium" | "unlimited_plan" | null;
  history: PaymentOut[];
};

export type RoomStatus = "upcoming" | "active" | "closed";

export type RoomOut = {
  id: string;
  organizer_id: string;
  event_name: string;
  event_type: string | null;
  event_date: string | null;
  location: string | null;
  guest_count_expected: number | null;
  tier: string;
  status: RoomStatus;
  opens_at: string | null;
  closes_at: string | null;
  is_permanent: boolean;
  invite_code: string | null;
  guest_count: number;
  is_organizer: boolean;
  created_at: string;
};

export type SimpleUserOut = {
  id: string;
  name: string | null;
};

export type MatchPairOut = {
  match_id: string;
  user_a: SimpleUserOut;
  user_b: SimpleUserOut;
  matched_at: string;
};

export type AgeRangeOut = { range: string; count: number };
export type GenderCountOut = { gender: string; count: number };

/**
 * The `?include=` extensions the web dashboard asks for. These are the planned
 * backend additions from the dashboard spec — every field optional, so the
 * client works unchanged against today's backend (which simply omits them) and
 * lights up as the backend grows into the contract.
 */
export type FunnelOut = {
  /** null = room predates invite-link instrumentation → render "No data". */
  invited: number | null;
  joined: number;
  sent_hey: number;
  matched: number;
  chatted: number;
};

export type TimelinePointOut = {
  /** ISO timestamp of the bucket start. */
  t: string;
  joins: number;
  heys: number;
  matches: number;
};

export type JoinSourceOut = {
  source: "qr" | "link" | "code" | "unknown";
  count: number;
};

export type PeakHourOut = {
  /** 0–23, local to the event. */
  hour: number;
  joins: number;
  heys: number;
  matches: number;
};

export type RoomAnalyticsOut = {
  guest_count: number;
  hey_count: number;
  match_count: number;
  match_pairs: MatchPairOut[];
  age_breakdown: AgeRangeOut[];
  gender_breakdown: GenderCountOut[];
  funnel?: FunnelOut;
  timeline?: TimelinePointOut[];
  join_source_breakdown?: JoinSourceOut[];
  peak_hours?: PeakHourOut[];
};

/** Distinguishes "wrong code" from transport failures in the login flow. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
