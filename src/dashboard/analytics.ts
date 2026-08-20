/**
 * Mixpanel is only initialized after the visitor grants analytics consent (see
 * the Silktide snippet in the page shells), so every event here silently
 * no-ops for organizers who declined. Product metrics only — never rely on
 * these for anything compliance-related.
 */

type EventName =
  | "web_dashboard_login"
  | "web_dashboard_portfolio_viewed"
  | "web_dashboard_room_viewed"
  | "web_pdf_report_generated"
  | "web_share_card_generated"
  | "web_upsell_shown";

declare global {
  interface Window {
    mixpanelLoaded?: boolean;
    mixpanel?: { track: (event: string, props?: Record<string, unknown>) => void };
  }
}

export function track(event: EventName, props?: Record<string, unknown>): void {
  if (!window.mixpanelLoaded || typeof window.mixpanel?.track !== "function") return;
  try {
    window.mixpanel.track(event, props);
  } catch {
    // Analytics must never break the dashboard.
  }
}
