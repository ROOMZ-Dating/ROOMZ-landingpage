import type { LegalDocument } from "./types";

/**
 * Transcribed from the source .txt. The source went through a UTF-8-decoded-
 * as-Latin-1 mangle at some point — every standalone "â" is a collapsed em
 * dash and "Â©" is a collapsed "©" — both fixed here rather than reproduced.
 */
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Roomz collects, uses, shares, and protects your personal information — including what event organizers can and can't see about your activity in their rooms.",
  effectiveDate: "August 2026",
  lastUpdated: "August 2026",
  sections: [
    {
      id: "introduction",
      number: "1",
      level: 1,
      title: "Introduction",
      blocks: [
        {
          type: "p",
          text: "Roomz ('we', 'us', 'our') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you use the Roomz mobile application.",
        },
        {
          type: "p",
          text: "By using Roomz, you agree to the collection and use of information in accordance with this policy. This policy is incorporated by reference into our Terms of Service.",
        },
      ],
    },
    {
      id: "information-we-collect",
      number: "2",
      level: 1,
      title: "Information We Collect",
      blocks: [],
    },
    {
      id: "information-you-provide",
      number: "2.1",
      level: 2,
      title: "Information You Provide",
      blocks: [
        {
          type: "list",
          items: [
            "Registration data: email address or phone number",
            "Profile data: name, age, gender, job title, height, profile photos (up to 5), about me bio",
            "Organizer profile data (if you activate the Organizer role): your name, role/title, business or brand name, and a short bio, shown to guests as the room's organizer",
            "Event data (organizers): event name, event date, event location, expected guest count",
            "Communications: messages sent to other users via in-app chat",
            "Payment data: billing information processed by Cardcom (organizer room purchases and the Organizer Unlimited Plan) or by Apple/Google via RevenueCat (Guest Premium subscriptions). We do not store your full card details.",
            "Reports and feedback: content you submit when reporting another user",
          ],
        },
      ],
    },
    {
      id: "information-collected-automatically",
      number: "2.2",
      level: 2,
      title: "Information Collected Automatically",
      blocks: [
        {
          type: "list",
          items: [
            "Device information: device type, operating system, app version",
            "Usage data: features used, rooms joined, Hey! interactions, session duration",
            "Push notification tokens: to deliver notifications to your device",
            "Log data: IP address, timestamps, error logs",
            "Analytics data: aggregated behavioral data via Mixpanel",
          ],
        },
      ],
    },
    {
      id: "information-from-third-parties",
      number: "2.3",
      level: 2,
      title: "Information from Third Parties",
      blocks: [
        {
          type: "list",
          items: [
            "Authentication providers: if you sign in with Google or Apple, we receive your name and email address",
            "Payment processors: Cardcom may share transaction confirmation data with us for organizer payments. Apple, Google, and RevenueCat share subscription status and transaction confirmation data with us for Guest Premium purchases made through in-app purchase.",
          ],
        },
      ],
    },
    {
      id: "data-we-collect-summary-table",
      number: "3",
      level: 1,
      title: "Data We Collect — Summary Table",
      blocks: [
        {
          type: "table",
          headers: ["Data Type", "Purpose", "Retention"],
          rows: [
            [
              "Name & Age",
              "Display on profile to other room guests",
              "Until account deletion",
            ],
            [
              "Email / Phone",
              "Authentication and account recovery",
              "Until account deletion",
            ],
            [
              "Profile Photos",
              "Display on profile; moderation scanning",
              "Until account deletion",
            ],
            [
              "Gender",
              "Powers the gender filter in room grids; not displayed as a profile field",
              "Until account deletion",
            ],
            [
              "Job & Height",
              "Optional profile display",
              "Until account deletion",
            ],
            [
              "Organizer Profile Data",
              "Displayed to guests as the room's organizer",
              "Until account deletion",
            ],
            [
              "Chat Messages",
              "Deliver and store in-app conversations",
              "Until account deletion",
            ],
            [
              "Hey! Activity",
              "Enforce Hey! limits; match logic",
              "Until account deletion",
            ],
            [
              "Match Pairs",
              "Shown to event organizers as identified analytics (see Section 5.2)",
              "Until account deletion or room deletion",
            ],
            [
              "Payment Records",
              "Billing history for room purchases, organizer unlimited plan, and guest premium subscriptions",
              "7 years (legal requirement)",
            ],
            [
              "Device & Log Data",
              "Security, debugging, crash reporting",
              "90 days",
            ],
            [
              "Analytics Events",
              "Product improvement (anonymized)",
              "24 months",
            ],
            ["Report Content", "Moderation review", "2 years"],
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      number: "4",
      level: 1,
      title: "How We Use Your Information",
      blocks: [
        {
          type: "list",
          items: [
            "To create and manage your account",
            "To display your profile to other guests in rooms you have joined",
            "To facilitate the Hey! mechanism and match notifications",
            "To enable real-time in-app chat between matched users",
            "To process payments and manage subscriptions",
            "To send push notifications (Hey! received, matches, messages, room status)",
            "To enforce our Terms of Service and moderate content",
            "To improve the App through anonymized product analytics",
            "To power the gender filter so guests can browse rooms by gender preference",
            "To provide event organizers with engagement analytics for the rooms they purchase, as described in Section 5.2",
            "To respond to support requests and appeals",
            "To comply with legal obligations",
          ],
        },
      ],
    },
    {
      id: "how-we-share-your-information",
      number: "5",
      level: 1,
      title: "How We Share Your Information",
      blocks: [],
    },
    {
      id: "with-other-users",
      number: "5.1",
      level: 2,
      title: "With Other Users",
      blocks: [
        {
          type: "p",
          text: "Your profile (name, age, photos, job, height, about me) is visible to other guests in rooms you have joined. Your gender is used only to power the gender filter and is not itself displayed as a field on your profile card. Your profile is not visible to users outside your rooms. Chat messages are visible only to the matched user you are chatting with.",
        },
      ],
    },
    {
      id: "with-event-organizers",
      number: "5.2",
      level: 2,
      title: "With Event Organizers",
      blocks: [
        {
          type: "p",
          text: "When you join a room, the organizer of that room can see:",
        },
        {
          type: "list",
          items: [
            "Aggregate, anonymized statistics about the room as a whole — total guests joined, total Hey! messages sent, total matches made, and overall match rate.",
            "Which named guests in their room matched with each other ('match pairs') — that is, the first names of both users in a match and the time the match occurred. This information is identifiable, not anonymized.",
          ],
        },
        {
          type: "p",
          text: "Organizers cannot read your chat messages under any circumstances, and cannot see who sent or received an individual Hey! — only the fact that a match occurred between two named guests. Before you join any room, the app displays a notice that your profile — and, if you match with someone, the fact of that match — will be visible to the organizer of that room. By joining a room, you consent to this disclosure for that room.",
        },
      ],
    },
    {
      id: "with-service-providers",
      number: "5.3",
      level: 2,
      title: "With Service Providers",
      blocks: [
        {
          type: "p",
          text: "We share data with trusted third-party service providers who help us operate the App:",
        },
        {
          type: "list",
          items: [
            "Cardcom — payment processing for organizer room purchases and the Organizer Unlimited Plan",
            "Apple App Store / Google Play, via RevenueCat — in-app purchase processing and subscription management for Guest Premium",
            "Amazon Web Services (AWS) — cloud hosting, file storage, and infrastructure",
            "Firebase Cloud Messaging — push notification delivery",
            "AWS Rekognition — automated photo content moderation",
            "Sentry — error monitoring and crash reporting (anonymized where possible)",
            "Mixpanel — product analytics (anonymized behavioral data)",
            "AWS SES — transactional email delivery",
          ],
        },
        {
          type: "p",
          text: "All service providers are contractually bound to process your data only as instructed by us and in accordance with applicable privacy laws.",
        },
      ],
    },
    {
      id: "legal-disclosure",
      number: "5.4",
      level: 2,
      title: "Legal Disclosure",
      blocks: [
        {
          type: "p",
          text: "We may disclose your information if required to do so by law, court order, or government authority, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.",
        },
      ],
    },
    {
      id: "business-transfers",
      number: "5.5",
      level: 2,
      title: "Business Transfers",
      blocks: [
        {
          type: "p",
          text: "If Roomz is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email or in-app notice before your data is transferred and becomes subject to a different privacy policy.",
        },
      ],
    },
    {
      id: "data-storage-and-security",
      number: "6",
      level: 1,
      title: "Data Storage & Security",
      blocks: [
        {
          type: "p",
          text: "All data is stored on Amazon Web Services (AWS) infrastructure. Profile photos are stored in AWS S3 and served via signed URLs. We implement industry-standard security measures including:",
        },
        {
          type: "list",
          items: [
            "Encryption in transit (TLS/HTTPS for all API communications)",
            "Encryption at rest for sensitive data",
            "JWT-based authentication with server-side validation",
            "Access controls limiting employee access to user data",
            "Regular security reviews",
          ],
        },
        {
          type: "p",
          text: "No method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your data using commercially reasonable means.",
        },
      ],
    },
    {
      id: "data-retention",
      number: "7",
      level: 1,
      title: "Data Retention",
      blocks: [
        {
          type: "p",
          text: "We retain your personal data for as long as your account is active. When you delete your account:",
        },
        {
          type: "list",
          items: [
            "Your profile, photos, and chat messages are deleted within 30 days",
            "Match-pair records visible to organizers are removed from organizer analytics within 30 days of account deletion",
            "Payment records are retained for 7 years as required by financial regulations",
            "Anonymized analytics data may be retained indefinitely",
            "Report records are retained for up to 2 years for moderation purposes",
          ],
        },
      ],
    },
    {
      id: "legal-basis-for-processing",
      number: "8",
      level: 1,
      title: "Legal Basis for Processing",
      blocks: [
        {
          type: "p",
          text: "Roomz is the data controller responsible for the personal data described in this policy. Where required by applicable law, we process your personal data on the following legal bases:",
        },
        {
          type: "list",
          items: [
            "Contractual necessity: to create your account, operate rooms, deliver the Hey!/matching mechanism, and process payments",
            "Consent: to join a specific room (including the organizer-visibility disclosure in Section 5.2), to send optional marketing communications, and for non-essential analytics or marketing cookies on our website",
            "Legitimate interests: to secure the App, prevent fraud and abuse, moderate content, and improve the product through aggregated analytics — balanced against your rights and interests",
            "Legal obligation: to retain payment records and respond to lawful requests from authorities",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      number: "9",
      level: 1,
      title: "Your Rights",
      blocks: [
        {
          type: "p",
          text: "Depending on your location, you may have the following rights regarding your personal data:",
        },
        {
          type: "list",
          items: [
            "Right to access: request a copy of the personal data we hold about you",
            "Right to rectification: correct inaccurate or incomplete data",
            "Right to erasure: request deletion of your personal data ('right to be forgotten')",
            "Right to portability: receive your data in a structured, machine-readable format",
            "Right to object: object to certain types of processing, including direct marketing",
            "Right to restrict processing: request we limit how we use your data",
            "Right to lodge a complaint: you may lodge a complaint with your local data protection authority — for example, the Israeli Privacy Protection Authority, or your EU/UK data protection authority — if you believe we have not handled your data appropriately",
          ],
        },
        {
          type: "p",
          text: "To exercise any of these rights, contact us at admin@roomzdating.com. We will respond within 30 days. We may need to verify your identity before processing your request.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      number: "10",
      level: 1,
      title: "Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "Roomz is intended for users who are 18 years of age or older. We do not knowingly collect personal information from anyone under 18. If we become aware that a user is under 18, we will immediately suspend their account and delete their data. If you believe a minor is using the App, please contact us at admin@roomzdating.com.",
        },
      ],
    },
    {
      id: "push-notifications",
      number: "11",
      level: 1,
      title: "Push Notifications",
      blocks: [
        {
          type: "p",
          text: "We send push notifications for Hey! messages received, new matches, new chat messages, and room status updates. You can manage notification preferences within the App settings or through your device's notification settings. Disabling notifications does not affect your ability to use the App.",
        },
      ],
    },
    {
      id: "cookies-and-tracking",
      number: "12",
      level: 1,
      title: "Cookies & Tracking",
      blocks: [
        {
          type: "p",
          text: "This section covers the Roomz mobile app. The App itself does not use browser cookies; we use device identifiers and session tokens for authentication, and our analytics provider may use anonymized identifiers to track aggregate product usage.",
        },
        {
          type: "p",
          text: "Our website at roomz.app is a separate surface and uses its own cookie consent banner, with Essential, Analytics, and Marketing categories. Non-essential cookies — including analytics tools — are only loaded on the website after you consent to that category. You can change your website cookie preferences at any time via the consent banner.",
        },
      ],
    },
    {
      id: "international-data-transfers",
      number: "13",
      level: 1,
      title: "International Data Transfers",
      blocks: [
        {
          type: "p",
          text: "Roomz is hosted on AWS infrastructure. Your data may be processed in data centers outside your country of residence. We ensure appropriate safeguards are in place for any international data transfers, in accordance with applicable data protection laws.",
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      number: "14",
      level: 1,
      title: "Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time. We will notify you of significant changes via push notification or email. The 'Last Updated' date at the top of this page reflects when the policy was last revised. Continued use of the App after changes constitutes acceptance of the revised policy.",
        },
      ],
    },
    {
      id: "contact-us",
      number: "15",
      level: 1,
      title: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
        },
        {
          type: "list",
          items: [
            "Privacy inquiries: admin@roomzdating.com",
            "General support: admin@roomzdating.com",
            "Legal: admin@roomzdating.com",
          ],
        },
      ],
    },
  ],
};
