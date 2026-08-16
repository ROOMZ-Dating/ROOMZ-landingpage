/**
 * Every string on the page lives here so copy can be edited without touching
 * layout — and so the whole page can be lifted into another builder intact.
 */

export const nav = {
  // Root-relative so these still resolve correctly from other pages (the
  // legal pages) — "/#how" navigates home and jumps to the section, whereas
  // a bare "#how" would just add a dead hash to whatever page you're on.
  links: [
    { label: "How it works", href: "/#how" },
    { label: "Why Roomz", href: "/#why" },
    { label: "For guests", href: "/#guests" },
    { label: "Trust", href: "/#trust" },
    { label: "FAQ", href: "/#faq" },
  ],
  secondary: { label: "Sign in", href: "#" },
};

export const hero = {
  leadIn: "Every exclusive event could be the start of their",
  rotating: [
    "love story",
    "perfect match",
    "first date",
    "core memory",
    "new spark",
  ],
  subhead:
    "Roomz turns any event into a place where single guests meet — and gives organizers the tool to make it happen.",
};

export const split = {
  organizers: {
    eyebrow: "For organizers",
    title: "Turn your event into an experience people talk about.",
    body: "Add a private Singles Room to your wedding, party, or venue night. Guests meet each other — you get the analytics and the credit.",
  },
  guests: {
    eyebrow: "For guests",
    title: "Meet someone at the event you're already at.",
    body: "Join the room, browse who's single, send a Hey!, and match with people who are actually there with you.",
  },
};

export const howOrganizers = {
  id: "how",
  eyebrow: "For organizers",
  title: "From a link to a room full of introductions.",
  callout: "No app for you to manage. No tech setup. Just a link.",
  steps: [
    {
      title: "Create a room",
      body: "Name your event, set the guest count, pick your dates.",
    },
    {
      title: "Share the link or code",
      body: "Send it out with your invites, on-site signage, or WhatsApp.",
    },
    {
      title: "Watch it happen",
      body: "Guests join, browse, and match. You get a live dashboard the whole time.",
    },
  ],
};

export const howGuests = {
  id: "guests",
  eyebrow: "For guests",
  title: "Three taps from the room to a conversation.",
  callout:
    "Only people at your event can see your profile. No strangers, no swiping through a city.",
  steps: [
    {
      title: "Join the room",
      body: "Scan a code or tap a link from your event organizer.",
    },
    {
      title: "Browse who's there",
      body: "See other singles at the same event as you.",
    },
    {
      title: "Send a Hey!",
      body: "If it's mutual, you match and the chat opens instantly.",
    },
  ],
};

export const whyOrganizers = {
  id: "why",
  eyebrow: "Why organizers use Roomz",
  title:
    "More than a novelty — a tool that shows you what happened at your event.",
  points: [
    {
      title: "Live analytics",
      body: "Guest count, Hey! activity, and match pairs, tracked in real time from your dashboard.",
    },
    {
      title: "Zero setup cost per guest",
      body: "One link brings everyone in. No individual invites to manage.",
    },
    {
      title: "A reason to talk about your event",
      body: "Matches made at your event are matches made because of your event.",
    },
    {
      title: "Built for repeat use",
      body: "Venues, bars, and planners running events every week can run one room that never closes.",
    },
  ],
  audienceLabel: "Who it's for",
  audiences: [
    "Wedding planners",
    "Corporate event teams",
    "Bars & nightlife venues",
    "Birthday & private party hosts",
    "MCs & DJs looking to add value to their bookings",
  ],
};

export const proofAudience = {
  eyebrow: "The audience is already there",
  title: "The audience is already there. Roomz just makes the connections visible.",
  stats: [
    {
      figure: "42%",
      label: "of U.S. adults were unpartnered in 2023",
      body: "A real share of any guest list is single and open to meeting someone.",
      source: "Pew Research Center, 2025",
    },
    {
      figure: "78%",
      label: "of dating app users feel burned out",
      body: "They report swipe fatigue “sometimes, often, or always.”",
      source: "Forbes Health survey, July 2025",
    },
    {
      figure: "+60%",
      label: "attendance at dating and singles events",
      body: "Growth in a single year, as people shift from apps to real-world ways to meet.",
      source: "Eventbrite, 2024",
    },
  ],
};

export const proofData = {
  eyebrow: "The data you're usually missing",
  title: "It looks like a dating app. It runs like a marketing analytics tool.",
  stats: [
    {
      figure: "50%",
      label: "of event pros say proving ROI is their biggest stressor",
      body: "Most events end with a headcount, not real engagement data.",
      source: "Swoogo / Amex GBT Event Industry Report",
    },
    {
      figure: "Top 3",
      label: "KPI: attendee engagement",
      body: "Now one of the top three metrics event teams track, right behind attendance and feedback.",
      source: "Cvent Planner Sourcing Report, 2026",
    },
    {
      figure: "Live",
      label: "dashboard instead of a guess",
      body: "Roomz generates this data automatically: guests joined, Hey!s sent, matches made.",
      source: "Built into every room",
    },
  ],
  disclaimer:
    "These are industry-wide benchmarks, not Roomz performance numbers.",
};

export const whyGuests = {
  eyebrow: "Why guests use Roomz",
  title:
    "The awkward part of meeting someone new — solved by context you already share.",
  cards: [
    {
      title: "You already have something in common",
      body: "You're both at the same wedding, the same party, the same bar tonight.",
    },
    {
      title: "It's private",
      body: "Your profile is only visible to people in that room. Not the whole city.",
    },
    {
      title: "No pressure",
      body: "Browse quietly, go invisible any time, and only guests who match can message you.",
    },
    {
      title: "Matches last beyond the night",
      body: "Chats stay open after the event ends.",
    },
  ],
};

export const trust = {
  id: "trust",
  eyebrow: "Trust & safety",
  title: "Built to feel safe, not just fun.",
  points: [
    "Every room is private — guests need a link or code to get in.",
    "Photos are automatically screened before they go live.",
    "Block and report are one tap away, always.",
    "Organizers see match activity, never your conversations.",
  ],
};

/**
 * Not present in the source copy deck — written here from facts already stated
 * elsewhere on the page (room privacy, setup time, organizer visibility) so no
 * new claims are introduced.
 */
export const faq = {
  id: "faq",
  title: "Questions, answered.",
  items: [
    {
      q: "How long does it take to set up a room?",
      a: "Under five minutes. Name your event, set the guest count, pick your dates, and share the link. There's no app for you to manage and no tech setup — just a link.",
    },
    {
      q: "Who can see a guest's profile?",
      a: "Only other guests in that room. A profile isn't visible to the whole city or to anyone who wasn't given the link or code, and guests can go invisible at any time.",
    },
    {
      q: "What does the organizer actually see?",
      a: "Match activity — guests joined, Hey!s sent, and match pairs, live from your dashboard. Organizers never see guest conversations.",
    },
    {
      q: "How do guests get in?",
      a: "They scan a code or tap the link you send with your invites, your on-site signage, or over WhatsApp. One link brings everyone in, with no individual invites to manage.",
    },
    {
      q: "What happens after the event ends?",
      a: "Matches last beyond the night. Chats stay open after the event is over, so a connection made on the night doesn't disappear with the venue booking.",
    },
    {
      q: "What kinds of events is Roomz for?",
      a: "Weddings, corporate events, bars and nightlife venues, birthdays and private parties — and MCs and DJs adding value to their bookings. Venues running events every week can run one room that never closes.",
    },
  ],
};

export const finalCta = {
  id: "cta",
  title: "Ready to give your guests something to remember?",
  sub: "Create your first room in under five minutes.",
};

export const footer = {
  tagline: "Roomz — Your event, their love story.",
  links: [
    { label: "Product", href: "/#how" },
    { label: "For Organizers", href: "/#how" },
    { label: "For Guests", href: "/#guests" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
  /**
   * Paste each profile URL in as it goes live and the icon starts linking out
   * on its own. An empty href renders the icon inert rather than as a dead
   * link — see the note in Footer.tsx.
   */
  social: [
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
    { label: "YouTube", href: "" },
  ],
  copyright: "© 2026 Roomz. All rights reserved.",
};
