import type { LegalDocument } from "./types";

/**
 * Transcribed from the source .txt. The source went through a UTF-8-decoded-
 * as-Latin-1 mangle at some point — every standalone "â" is a collapsed em
 * dash and "Â©" is a collapsed "©" — both fixed here rather than reproduced.
 */
export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Roomz app — accounts, Singles Rooms, the Hey! mechanism, payments, and your rights and responsibilities as a guest or organizer.",
  effectiveDate: "August 2026",
  lastUpdated: "August 2026",
  sections: [
    {
      id: "acceptance-of-terms",
      number: "1",
      level: 1,
      title: "Acceptance of Terms",
      blocks: [
        {
          type: "p",
          text: "By downloading, installing, or using the Roomz mobile application ('App', 'Service', 'we', 'us', or 'our'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, do not use the App.",
        },
        {
          type: "p",
          text: "These Terms constitute a legally binding agreement between you and Roomz. We reserve the right to update these Terms at any time. Continued use of the App after changes constitutes acceptance of the revised Terms.",
        },
      ],
    },
    {
      id: "eligibility",
      number: "2",
      level: 1,
      title: "Eligibility",
      blocks: [
        {
          type: "p",
          text: "You must be at least 18 years of age to use Roomz. By using the App, you represent and warrant that:",
        },
        {
          type: "list",
          items: [
            "You are at least 18 years old",
            "You have the legal capacity to enter into a binding agreement",
            "You are not prohibited from using the App under applicable law",
            "You will provide accurate, current, and complete information during registration",
          ],
        },
      ],
    },
    {
      id: "account-registration",
      number: "3",
      level: 1,
      title: "Account Registration",
      blocks: [],
    },
    {
      id: "account-types",
      number: "3.1",
      level: 2,
      title: "Account Types",
      blocks: [
        {
          type: "p",
          text: "Roomz offers two roles you can use on a single account: Guest and Event Organizer. You can activate either or both roles from your account. Misrepresenting your identity when acting in either role is a violation of these Terms.",
        },
      ],
    },
    {
      id: "authentication",
      number: "3.2",
      level: 2,
      title: "Authentication",
      blocks: [
        {
          type: "p",
          text: "Roomz uses one-time password (OTP) authentication via email or phone number. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized access.",
        },
      ],
    },
    {
      id: "account-accuracy",
      number: "3.3",
      level: 2,
      title: "Account Accuracy",
      blocks: [
        {
          type: "p",
          text: "You agree to provide truthful and accurate information in your profile, including your name, age, and photographs. Impersonation of any person or misrepresentation of your identity is strictly prohibited and may result in immediate account termination.",
        },
      ],
    },
    {
      id: "user-conduct",
      number: "4",
      level: 1,
      title: "User Conduct",
      blocks: [
        { type: "p", text: "By using Roomz, you agree not to:" },
        {
          type: "list",
          items: [
            "Upload photos or content that is sexually explicit, violent, hateful, or otherwise inappropriate",
            "Harass, bully, threaten, or abuse other users",
            "Create fake accounts or misrepresent your identity",
            "Use the App for any commercial solicitation or spam",
            "Attempt to gain unauthorized access to the App or other users' accounts",
            "Scrape, crawl, or extract data from the App",
            "Use the App for any illegal purpose",
            "Share another user's private information without their consent",
            "Use contact information obtained through the App in violation of applicable law or these Terms, including sending marketing communications to guests who have not opted in",
            "Create multiple accounts",
          ],
        },
      ],
    },
    {
      id: "event-rooms",
      number: "5",
      level: 1,
      title: "Event Rooms",
      blocks: [],
    },
    {
      id: "room-creation",
      number: "5.1",
      level: 2,
      title: "Room Creation",
      blocks: [
        {
          type: "p",
          text: "Event Organizers may create Singles Rooms subject to payment of applicable fees. Rooms are associated with a specific event and may be opened up to 7 days before the event date, as configured by the organizer.",
        },
      ],
    },
    {
      id: "room-access",
      number: "5.2",
      level: 2,
      title: "Room Access",
      blocks: [
        {
          type: "p",
          text: "Guests join rooms via a unique invite link or room code provided by the organizer. Rooms are private — only users with the link or code may join. Roomz is not responsible for unauthorized sharing of room links or codes by organizers or guests.",
        },
      ],
    },
    {
      id: "organizer-rights",
      number: "5.3",
      level: 2,
      title: "Organizer Rights",
      blocks: [
        {
          type: "p",
          text: "Event Organizers may remove any guest from their room at any time, for any reason. Removed guests will be notified via push notification. Organizers may also edit event details and room settings after the room is created.",
        },
      ],
    },
    {
      id: "invisible-mode",
      number: "5.4",
      level: 2,
      title: "Invisible Mode",
      blocks: [
        {
          type: "p",
          text: "Guests may activate Invisible Mode at any time, which hides their profile from the room grid without deleting their account or matches. Existing matches and chats remain accessible while in Invisible Mode.",
        },
      ],
    },
    {
      id: "room-expiry",
      number: "5.5",
      level: 2,
      title: "Room Expiry",
      blocks: [
        {
          type: "p",
          text: "Rooms may be configured to close on or after the event date. Once a room closes, guests can no longer browse the room or send new Hey! messages. However, existing matches and chat conversations remain accessible indefinitely under the Matches tab.",
        },
      ],
    },
    {
      id: "organizer-visibility-of-room-activity",
      number: "5.6",
      level: 2,
      title: "Organizer Visibility of Room Activity",
      blocks: [
        {
          type: "p",
          text: "When you join a room, the room's Event Organizer can see aggregate statistics about that room (such as total guests, total Hey!s sent, total matches) and, specifically, which named guests in that room have matched with each other. This is disclosed to you before you join a room, and you consent to it by joining. Organizers cannot see who sent or received an individual Hey!, and cannot read chat messages under any circumstances. Full detail on what organizers can and cannot see is set out in our Privacy Policy, Section 5.2.",
        },
      ],
    },
    {
      id: "guest-marketing-opt-in",
      number: "5.7",
      level: 2,
      title: "Guest Marketing Opt-In",
      blocks: [
        {
          type: "p",
          text: "When joining a room, guests may be offered the option to receive marketing communications from that room's Event Organizer. This option is off by default and is never required to join or use a room. If a guest explicitly opts in, the guest's phone number (without their name or profile details) is made available to that room's organizer for marketing purposes, as described in our Privacy Policy. Guests may withdraw this consent at any time from the room's settings in the App.",
        },
      ],
    },
    {
      id: "organizer-use-of-guest-contact-data",
      number: "5.8",
      level: 2,
      title: "Organizer Use of Guest Contact Data",
      blocks: [
        {
          type: "p",
          text: "Event Organizers who receive guest phone numbers through the marketing opt-in feature agree to the following conditions:",
        },
        {
          type: "list",
          items: [
            "Use the numbers solely for their own marketing communications related to their events, venue, or services",
            "Comply with all applicable laws governing marketing communications and data protection, including anti-spam laws requiring consent and opt-out mechanisms (such as Israel's Communications Law Amendment 40, the GDPR, and the TCPA, as applicable)",
            "Honor any opt-out or unsubscribe request from a guest promptly",
            "Not sell, rent, share, or transfer guest phone numbers to any third party",
            "Delete a guest's phone number promptly upon the guest's withdrawal of consent or upon notice from Roomz",
            "Implement reasonable security measures to protect the numbers in their possession",
          ],
        },
        {
          type: "p",
          text: "Violation of these conditions constitutes a material breach of these Terms. Roomz may revoke an organizer's access to the marketing opt-in feature, suspend or terminate the organizer's account, and notify affected guests. The Event Organizer is solely responsible and liable for their use of guest contact data and agrees to indemnify Roomz for any claims arising from such use, in accordance with Section 13.",
        },
      ],
    },
    {
      id: "hey-mechanism-and-matching",
      number: "6",
      level: 1,
      title: "The Hey! Mechanism & Matching",
      blocks: [
        {
          type: "p",
          text: "The Hey! feature allows guests to express interest in another guest. The following rules apply:",
        },
        {
          type: "list",
          items: [
            "Free guests may send up to 10 Hey! messages per room",
            "Premium guests may send unlimited Hey! messages",
            "If a recipient declines a Hey!, the sender may only send another Hey! to the same person on the day of the event",
            "A match occurs when both guests have sent each other a Hey! (mutual interest)",
            "Guests may unsend a Hey! at any time before it is accepted or declined",
            "Roomz does not guarantee matches or connections",
          ],
        },
      ],
    },
    {
      id: "payments-and-subscriptions",
      number: "7",
      level: 1,
      title: "Payments & Subscriptions",
      blocks: [],
    },
    {
      id: "room-purchase-organizers",
      number: "7.1",
      level: 2,
      title: "Room Purchase (Organizers)",
      blocks: [
        {
          type: "p",
          text: "Event Organizers may pay for room access in two ways:",
        },
        {
          type: "p",
          text: "Option A — One-time room purchase (per event):",
        },
        {
          type: "list",
          items: [
            "Up to 50 guests: $60 USD",
            "51 to 150 guests: $100 USD",
            "151 or more guests: $175 USD",
          ],
        },
        {
          type: "p",
          text: "Option B — Organizer Unlimited Plan:",
        },
        {
          type: "list",
          items: [
            "$300 USD per month (recurring subscription)",
            "Grants unlimited room creation with no per-room fees, for events of any size",
            "Designed for professional event planners, venues, bars, and clubs managing multiple events or an ongoing presence",
            "Subscription renews automatically each month and may be cancelled at any time through account settings",
          ],
        },
        {
          type: "p",
          text: "Organizer payments — one-time room purchases and the Organizer Unlimited Plan — are processed via Cardcom, our payment processor, through a secure hosted checkout. Rooms are activated immediately upon successful payment. Organizer Unlimited Plan renewals are billed automatically each month using a saved payment token from your original checkout; you can update or remove this payment method at any time from account settings. All one-time purchases are final and non-refundable once the room has been created. Subscription cancellations take effect at the end of the current billing period.",
        },
      ],
    },
    {
      id: "guest-premium-subscription",
      number: "7.2",
      level: 2,
      title: "Guest Premium Subscription",
      blocks: [
        {
          type: "p",
          text: "Guests may subscribe to Roomz Premium for $10 USD per month. Premium benefits include:",
        },
        {
          type: "list",
          items: [
            "See who sent you a Hey! before deciding whether to respond",
            "Unlimited Hey! messages per room",
          ],
        },
        {
          type: "p",
          text: "Guest Premium is purchased and managed as an in-app purchase through the Apple App Store or Google Play (processed via RevenueCat). Subscriptions renew automatically each month and are billed by Apple or Google according to the payment method on your device account. You may cancel at any time through your device's subscription settings. Cancellation takes effect at the end of the current billing period. No partial refunds are provided by Roomz; refund requests for in-app purchases are handled by Apple or Google in accordance with their respective policies.",
        },
      ],
    },
    {
      id: "taxes",
      number: "7.3",
      level: 2,
      title: "Taxes",
      blocks: [
        {
          type: "p",
          text: "All prices are exclusive of applicable taxes unless stated otherwise. For organizer payments processed via Cardcom, applicable taxes are calculated and remitted in accordance with applicable law. For Guest Premium purchases made via the Apple App Store or Google Play, Apple or Google acts as the merchant of record and handles VAT and applicable local taxes on that transaction.",
        },
      ],
    },
    {
      id: "content-and-intellectual-property",
      number: "8",
      level: 1,
      title: "Content & Intellectual Property",
      blocks: [],
    },
    {
      id: "your-content",
      number: "8.1",
      level: 2,
      title: "Your Content",
      blocks: [
        {
          type: "p",
          text: "You retain ownership of content you upload to Roomz (photos, profile information, chat messages). By uploading content, you grant Roomz a non-exclusive, worldwide, royalty-free license to use, store, display, and distribute your content solely for the purpose of operating the Service.",
        },
      ],
    },
    {
      id: "roomz-content",
      number: "8.2",
      level: 2,
      title: "Roomz Content",
      blocks: [
        {
          type: "p",
          text: "All intellectual property rights in the Roomz App, including but not limited to the name, logo, design, code, and features, are owned by Roomz. You may not copy, modify, distribute, or create derivative works without our prior written consent.",
        },
      ],
    },
    {
      id: "photo-moderation",
      number: "8.3",
      level: 2,
      title: "Photo Moderation",
      blocks: [
        {
          type: "p",
          text: "All uploaded photos are subject to automated moderation for explicit content. Photos that violate our content policy will be removed and may result in account suspension.",
        },
      ],
    },
    {
      id: "privacy",
      number: "9",
      level: 1,
      title: "Privacy",
      blocks: [
        {
          type: "p",
          text: "Your use of Roomz is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy — including Section 5.2, which explains what event organizers can see about your activity in their rooms — to understand our data practices.",
        },
      ],
    },
    {
      id: "moderation-and-enforcement",
      number: "10",
      level: 1,
      title: "Moderation & Enforcement",
      blocks: [],
    },
    {
      id: "reporting",
      number: "10.1",
      level: 2,
      title: "Reporting",
      blocks: [
        {
          type: "p",
          text: "Users may report other users for inappropriate behavior or content. Reports are reviewed by our moderation team within 24 hours. Roomz reserves the right to remove content, suspend, or permanently ban accounts that violate these Terms.",
        },
      ],
    },
    {
      id: "blocking",
      number: "10.2",
      level: 2,
      title: "Blocking",
      blocks: [
        {
          type: "p",
          text: "Users may block other users at any time. Blocked users will no longer be visible to each other within the App.",
        },
      ],
    },
    {
      id: "appeals",
      number: "10.3",
      level: 2,
      title: "Appeals",
      blocks: [
        {
          type: "p",
          text: "If your account is suspended or terminated, you may contact us at admin@roomzdating.com to appeal the decision. Roomz's decision on appeals is final.",
        },
      ],
    },
    {
      id: "disclaimers",
      number: "11",
      level: 1,
      title: "Disclaimers",
      blocks: [
        {
          type: "p",
          text: "ROOMZ IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
        },
        {
          type: "p",
          text: "Roomz does not conduct background checks on users. You are solely responsible for your interactions with other users. Exercise caution and use good judgment when meeting people from the App in person.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      number: "12",
      level: 1,
      title: "Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ROOMZ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE APP.",
        },
        {
          type: "p",
          text: "Our total liability to you for any claim arising out of or relating to these Terms or the App shall not exceed the amount you paid to Roomz in the 12 months preceding the claim.",
        },
      ],
    },
    {
      id: "indemnification",
      number: "13",
      level: 1,
      title: "Indemnification",
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify, defend, and hold harmless Roomz and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or related to your use of the App, your content, or your violation of these Terms.",
        },
      ],
    },
    {
      id: "governing-law",
      number: "14",
      level: 1,
      title: "Governing Law",
      blocks: [
        {
          type: "p",
          text: "These Terms shall be governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts of Tel Aviv-Jaffa, Israel.",
        },
      ],
    },
    {
      id: "termination",
      number: "15",
      level: 1,
      title: "Termination",
      blocks: [
        {
          type: "p",
          text: "You may delete your account at any time through the App settings. Roomz may terminate or suspend your account at any time, with or without notice, for violation of these Terms or for any other reason at our sole discretion.",
        },
        {
          type: "p",
          text: "Upon termination, your right to use the App ceases immediately. Sections relating to intellectual property, disclaimers, limitation of liability, and indemnification survive termination.",
        },
      ],
    },
    {
      id: "contact",
      number: "16",
      level: 1,
      title: "Contact",
      blocks: [
        { type: "p", text: "For questions about these Terms, please contact us at:" },
        {
          type: "list",
          items: ["Email: admin@roomzdating.com", "Support: admin@roomzdating.com"],
        },
      ],
    },
  ],
};
