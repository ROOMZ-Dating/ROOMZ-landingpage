import type {
  BillingStatusOut,
  RoomAnalyticsOut,
  RoomOut,
  TokenResponse,
  UserProfileOut,
} from "./types";

/**
 * Fixture backend, active only while VITE_API_URL is unset — lets the whole
 * dashboard be exercised before the real API is deployed. Deterministic
 * switches, all keyed off the email entered at login:
 *
 *   contains "new"    → the no-account state
 *   contains "guest"  → the not-an-organizer state
 *   contains "payper" → a pay-per-event organizer (upsells visible)
 *   anything else     → an Unlimited Plan organizer (everything unlocked)
 *
 * Any 6-digit code verifies, except 000000 which is always "wrong code" so the
 * error path can be exercised too.
 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let email = "";

const seeded = (seed: number) => {
  // Deterministic PRNG so mock charts are stable across reloads.
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
};

function mockRooms(): RoomOut[] {
  const base = {
    organizer_id: "org-1",
    event_type: null,
    guest_count_expected: null,
    tier: "tier_2",
    opens_at: null,
    closes_at: null,
    is_permanent: false,
    invite_code: "ROOMZ1",
    is_organizer: true,
  };
  return [
    { ...base, id: "r-noga", event_name: "Noga & Tom's Wedding", event_date: "2026-08-28", location: "Tel Aviv", status: "upcoming", guest_count: 64, created_at: "2026-08-01T10:00:00Z" },
    { ...base, id: "r-lyfe", event_name: "LYFE Rooftop Sessions", event_date: "2026-08-20", location: "Bnei Brak", status: "active", guest_count: 112, created_at: "2026-07-28T10:00:00Z", is_permanent: true },
    { ...base, id: "r-maya", event_name: "Maya's 30th", event_date: "2026-08-07", location: "Herzliya", status: "closed", guest_count: 58, created_at: "2026-07-20T10:00:00Z" },
    { ...base, id: "r-tlv", event_name: "TLV Singles Beach Day", event_date: "2026-07-18", location: "Gordon Beach", status: "closed", guest_count: 143, created_at: "2026-07-01T10:00:00Z" },
    // Predates the invite-link instrumentation → funnel.invited is null.
    { ...base, id: "r-purim", event_name: "Purim Warehouse Party", event_date: "2026-03-03", location: "Jaffa", status: "closed", guest_count: 87, created_at: "2026-02-20T10:00:00Z" },
  ];
}

function mockAnalytics(roomId: string): RoomAnalyticsOut {
  const room = mockRooms().find((r) => r.id === roomId) ?? mockRooms()[0];
  const guests = room.guest_count;
  const rnd = seeded(roomId.length * 7919 + guests);
  const heys = Math.round(guests * 2.1);
  const matches = Math.round(guests * 0.3);
  const chatted = Math.round(matches * 0.72);
  const legacy = roomId === "r-purim";

  const names = ["Adi", "Ben", "Chen", "Dana", "Eli", "Gal", "Hila", "Ido", "Lior", "Maya", "Noa", "Omri", "Rona", "Shai", "Tal", "Yael"];
  const pairs = Array.from({ length: Math.min(matches, 24) }, (_, i) => ({
    match_id: `m-${roomId}-${i}`,
    user_a: { id: `ua-${i}`, name: names[Math.floor(rnd() * names.length)] },
    user_b: { id: `ub-${i}`, name: names[Math.floor(rnd() * names.length)] },
    matched_at: new Date(Date.parse(room.created_at) + i * 3.6e6).toISOString(),
  }));

  // Deliberately includes a sub-3 bucket so suppression is visible in the UI.
  const age = [
    { range: "18–22", count: Math.round(guests * 0.12) },
    { range: "23–27", count: Math.round(guests * 0.34) },
    { range: "28–32", count: Math.round(guests * 0.31) },
    { range: "33–37", count: Math.round(guests * 0.16) },
    { range: "38–42", count: Math.max(0, Math.round(guests * 0.05)) },
    { range: "43+", count: 2 },
  ];

  const start = Date.parse(room.created_at);
  const timeline = Array.from({ length: 14 }, (_, i) => {
    const ramp = Math.sin((i / 13) * Math.PI);
    return {
      t: new Date(start + i * 12 * 3.6e6).toISOString(),
      joins: Math.round((guests / 9) * ramp * (0.7 + rnd() * 0.6)),
      heys: Math.round((heys / 8) * ramp * (0.7 + rnd() * 0.6)),
      matches: Math.round((matches / 9) * ramp * (0.6 + rnd() * 0.8)),
    };
  });

  const peak = Array.from({ length: 24 }, (_, hour) => {
    const evening = hour >= 19 || hour <= 1 ? 1 : hour >= 13 ? 0.35 : 0.08;
    return {
      hour,
      joins: Math.round(guests * 0.09 * evening * (0.5 + rnd())),
      heys: Math.round(heys * 0.08 * evening * (0.5 + rnd())),
      matches: Math.round(matches * 0.09 * evening * (0.5 + rnd())),
    };
  });

  return {
    guest_count: guests,
    hey_count: heys,
    match_count: matches,
    match_pairs: pairs,
    age_breakdown: age,
    gender_breakdown: [
      { gender: "women", count: Math.round(guests * 0.52) },
      { gender: "men", count: Math.round(guests * 0.45) },
      { gender: "non-binary", count: Math.max(1, guests - Math.round(guests * 0.52) - Math.round(guests * 0.45)) },
    ],
    funnel: {
      invited: legacy ? null : Math.round(guests * 1.8),
      joined: guests,
      sent_hey: Math.round(guests * 0.74),
      matched: matches,
      chatted,
    },
    timeline,
    join_source_breakdown: legacy
      ? [{ source: "unknown", count: guests }]
      : [
          { source: "qr", count: Math.round(guests * 0.48) },
          { source: "link", count: Math.round(guests * 0.41) },
          { source: "code", count: guests - Math.round(guests * 0.48) - Math.round(guests * 0.41) },
        ],
    peak_hours: peak,
  };
}

export const mockApi = {
  async sendOtp(to: string): Promise<void> {
    email = to.toLowerCase();
    await delay(400);
  },

  async verifyOtp(_to: string, code: string): Promise<TokenResponse> {
    await delay(500);
    if (code === "000000") {
      const err = new Error("Invalid code") as Error & { status: number };
      err.status = 401;
      throw err;
    }
    return {
      access_token: "mock-access",
      refresh_token: "mock-refresh",
      token_type: "bearer",
      is_new_user: email.includes("new"),
    };
  },

  async refresh(): Promise<TokenResponse> {
    await delay(200);
    return { access_token: "mock-access", refresh_token: "mock-refresh", token_type: "bearer", is_new_user: false };
  },

  async logout(): Promise<void> {
    await delay(150);
  },

  async me(): Promise<UserProfileOut> {
    await delay(250);
    const organizer = !email.includes("guest");
    return {
      id: "u-1",
      email: email || "demo@roomzdating.com",
      name: "Dana Levi",
      is_organizer: organizer,
      organizer_name: organizer ? "Dana Levi" : null,
      organizer_role: organizer ? "Event Producer" : null,
      organizer_business: organizer ? "LYFE Events" : null,
      organizer_bio: null,
      organizer_photo_url: null,
      is_premium: false,
    };
  },

  async billing(): Promise<BillingStatusOut> {
    await delay(250);
    return {
      is_premium: false,
      premium_until: null,
      active_plan: email.includes("payper") ? null : "unlimited_plan",
      history: [],
    };
  },

  async myRooms(): Promise<RoomOut[]> {
    await delay(400);
    return mockRooms();
  },

  async room(roomId: string): Promise<RoomOut> {
    await delay(200);
    const found = mockRooms().find((r) => r.id === roomId);
    if (!found) {
      const err = new Error("Room not found") as Error & { status: number };
      err.status = 404;
      throw err;
    }
    return found;
  },

  async roomAnalytics(roomId: string): Promise<RoomAnalyticsOut> {
    await delay(500);
    return mockAnalytics(roomId);
  },
};
