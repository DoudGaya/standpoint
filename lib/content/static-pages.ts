export type StaticPageDefinition = {
  slug: string;
  eyebrow: string;
  title: string;
  standfirst: string;
  reviewNotice?: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export const staticPages: Record<string, StaticPageDefinition> = {
  about: {
    slug: "about",
    eyebrow: "About GlobHub",
    title: "Journalism for a connected world",
    standfirst:
      "GlobHub Media is a fictional independent newsroom demonstration built around verification, context, accountability and global collaboration.",
    sections: [
      {
        heading: "Our purpose",
        paragraphs: [
          "GlobHub exists to help people understand consequential events across borders without losing the local knowledge that gives those events meaning.",
          "Our editorial model combines original reporting, clear analysis, public records, visual evidence and transparent corrections.",
        ],
      },
      {
        heading: "What readers can expect",
        paragraphs: [
          "News is separated from opinion and commercial content. Significant claims are sourced. Uncertainty is stated plainly. Corrections remain visible.",
        ],
        bullets: [
          "Independent, evidence-led reporting",
          "Clear labels for analysis, opinion and sponsorship",
          "Public methods for fact checks and investigations",
          "Accessible formats, captions and transcripts",
        ],
      },
    ],
  },
  "editorial-policy": {
    slug: "editorial-policy",
    eyebrow: "Standards",
    title: "Editorial standards",
    standfirst:
      "The principles that guide GlobHub reporting, editing, sourcing, independence and accountability.",
    reviewNotice:
      "Editorial review required: this development copy is a working policy outline, not a final adopted newsroom code.",
    sections: [
      {
        heading: "Accuracy before speed",
        paragraphs: [
          "We verify material facts before publication and identify what remains unknown. Breaking-news urgency does not remove the obligation to distinguish confirmed information from credible reporting and unverified claims.",
        ],
      },
      {
        heading: "Independence and conflicts",
        paragraphs: [
          "Editorial decisions must not be directed by advertisers, donors, political interests or commercial partners. Relevant conflicts and funding relationships are disclosed.",
        ],
      },
      {
        heading: "Fairness, attribution and privacy",
        paragraphs: [
          "People and institutions facing significant criticism should have a meaningful opportunity to respond. Anonymous sourcing requires an editor's approval and an explanation of why anonymity is necessary.",
        ],
      },
    ],
  },
  corrections: {
    slug: "corrections",
    eyebrow: "Accountability",
    title: "Corrections policy",
    standfirst:
      "We correct material errors promptly, explain the change and preserve a visible public record.",
    reviewNotice:
      "Editorial and legal review required before this policy is adopted for production.",
    sections: [
      {
        heading: "How corrections work",
        paragraphs: [
          "Minor spelling or style changes may be made silently when they do not affect meaning. Factual corrections, clarifications and substantive updates receive a visible note with the date and nature of the change.",
        ],
      },
      {
        heading: "Request a review",
        paragraphs: [
          "A correction request should identify the article, the disputed statement and the strongest available supporting evidence. The corrections desk records its review and responds through the configured contact channel.",
        ],
      },
    ],
  },
  "fact-checking-methodology": {
    slug: "fact-checking-methodology",
    eyebrow: "Evidence desk",
    title: "Fact-checking methodology",
    standfirst:
      "How GlobHub selects claims, weighs evidence, reaches verdicts and handles corrections.",
    reviewNotice:
      "Editorial review required: the verdict scale and appeals process must be approved before production.",
    sections: [
      {
        heading: "Selecting claims",
        paragraphs: [
          "We prioritize claims that are consequential, verifiable, widely circulating or likely to influence public decisions. We do not fact-check pure opinion or predictions that cannot reasonably be tested.",
        ],
      },
      {
        heading: "Evaluating evidence",
        paragraphs: [
          "Primary records and direct measurements are preferred. Independent corroboration, methodological quality, recency and proximity to the event affect the weight given to each source.",
        ],
      },
      {
        heading: "Verdicts and review",
        paragraphs: [
          "Verdicts summarize the evidence; they do not replace the full analysis. A reviewer and fact checker must examine each publication, and corrections follow the same public policy as other GlobHub journalism.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy notice",
    standfirst:
      "A plain-language development outline of how GlobHub may handle reader information.",
    reviewNotice:
      "Not legal advice. Replace this placeholder with counsel-approved, jurisdiction-specific language before production.",
    sections: [
      {
        heading: "Information and purpose",
        paragraphs: [
          "A production service may process information readers submit, limited technical logs needed for security, consent choices and provider data needed to deliver newsletters or accounts.",
          "The final notice must identify controllers, processors, legal bases, retention periods, international transfers and rights for each operating jurisdiction.",
        ],
      },
      {
        heading: "Choices and contact",
        paragraphs: [
          "Readers should be able to withdraw optional consent, unsubscribe and exercise applicable access, correction or deletion rights. Production contact details and response timelines must be added.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of use",
    standfirst: "Development placeholders for the rules governing use of GlobHub services.",
    reviewNotice:
      "Not legal advice. Counsel must review governing law, liability, licensing and dispute terms before production.",
    sections: [
      {
        heading: "Using GlobHub",
        paragraphs: [
          "Readers may access public journalism for personal, non-commercial use subject to copyright and applicable law. Automated extraction, republication and account misuse require separate production terms.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "External media, newsletter, payment and comment services have their own terms. GlobHub should identify those services and explain when a reader leaves the site.",
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    eyebrow: "Privacy choices",
    title: "Cookie policy",
    standfirst:
      "How essential storage and optional measurement technologies should be presented to readers.",
    reviewNotice:
      "Privacy and legal review required. The final inventory must match the production technology actually deployed.",
    sections: [
      {
        heading: "Essential storage",
        paragraphs: [
          "Security, consent and accessibility preferences may require essential storage. Optional analytics, advertising and personalization must not load before the appropriate consent where law requires it.",
        ],
      },
      {
        heading: "Managing choices",
        paragraphs: [
          "A production consent interface should let readers review categories, change preferences and see the current provider inventory.",
        ],
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    eyebrow: "Inclusive publishing",
    title: "Accessibility",
    standfirst:
      "GlobHub aims for WCAG 2.2 AA and treats accessible journalism as an editorial and product responsibility.",
    sections: [
      {
        heading: "Our approach",
        paragraphs: [
          "We design for keyboard access, screen readers, text enlargement, reduced motion and multiple input methods. Images need meaningful alternative text; recorded media needs captions and transcripts.",
        ],
        bullets: [
          "Semantic structure and logical heading order",
          "Visible focus and usable touch targets",
          "Contrast-safe links and status communication",
          "Captions, transcripts and accessible live updates",
        ],
      },
      {
        heading: "Report a barrier",
        paragraphs: [
          "Readers should describe the page, task, browser and assistive technology involved. The production accessibility owner and response target must be published here.",
        ],
      },
    ],
  },
  "community-guidelines": {
    slug: "community-guidelines",
    eyebrow: "Reader community",
    title: "Community guidelines",
    standfirst:
      "Standards for constructive, safe and accountable participation in GlobHub spaces.",
    reviewNotice:
      "Editorial and legal review required before comments or community features are enabled.",
    sections: [
      {
        heading: "Contribute to understanding",
        paragraphs: [
          "Critique ideas and evidence, not personal characteristics. Harassment, threats, doxxing, impersonation, spam and deliberate misinformation are not permitted.",
        ],
      },
      {
        heading: "Moderation",
        paragraphs: [
          "Production moderation must combine clear rules, trained review, reporting tools, appeals and appropriate records. Comments remain disabled until those safeguards are configured.",
        ],
      },
    ],
  },
  diversity: {
    slug: "diversity",
    eyebrow: "Newsroom commitments",
    title: "Diversity and inclusion",
    standfirst:
      "A global newsroom is stronger when its decisions, sources and coverage reflect the communities it serves.",
    reviewNotice:
      "Leadership review required. Production commitments should include measurable reporting and accountable owners.",
    sections: [
      {
        heading: "Coverage and sourcing",
        paragraphs: [
          "Diversity is not a quota added after reporting. It affects which stories are commissioned, whose expertise is recognized, how language is translated and which assumptions editors challenge.",
        ],
      },
      {
        heading: "Workplace accountability",
        paragraphs: [
          "A production policy should publish goals, progress, pay-equity review, accessible hiring practices and routes for staff concerns.",
        ],
      },
    ],
  },
  ownership: {
    slug: "ownership",
    eyebrow: "Transparency",
    title: "Ownership and funding",
    standfirst:
      "Readers should be able to see who owns GlobHub, how it is funded and how editorial independence is protected.",
    reviewNotice:
      "Corporate and legal review required. Replace fictional development language with verified production disclosures.",
    sections: [
      {
        heading: "Development status",
        paragraphs: [
          "GlobHub Media in this repository is a fictional demonstration platform. It has no operating company, owners, advertisers, donors or political affiliations.",
        ],
      },
      {
        heading: "Production disclosure requirements",
        paragraphs: [
          "Before launch, this page should identify beneficial ownership, major funding sources, governance arrangements and material commercial relationships, with a clear explanation of editorial safeguards.",
        ],
      },
    ],
  },
  careers: {
    slug: "careers",
    eyebrow: "Work with us",
    title: "Careers at GlobHub",
    standfirst:
      "Build journalism, products and systems that help people understand a connected world.",
    sections: [
      {
        heading: "Current status",
        paragraphs: [
          "GlobHub is fictional and has no open roles. A production careers integration should list only verified vacancies, accessible application requirements, locations, compensation ranges where applicable and closing dates.",
        ],
      },
      {
        heading: "How we would hire",
        paragraphs: [
          "Candidates should be assessed against published criteria through a consistent process. GlobHub would never ask applicants to pay a fee or share account passwords.",
        ],
      },
    ],
  },
  advertise: {
    slug: "advertise",
    eyebrow: "Commercial partnerships",
    title: "Advertise with GlobHub",
    standfirst:
      "Reach an engaged global audience through clearly labelled, responsibly delivered commercial formats.",
    sections: [
      {
        heading: "Clear separation",
        paragraphs: [
          "Advertising, native promotion and sponsored reporting are labelled and visually distinct. Commercial partners do not approve or direct independent editorial coverage.",
        ],
      },
      {
        heading: "Available architecture",
        paragraphs: [
          "The platform supports scheduled campaigns, responsive creatives, reserved placements, category metadata and provider-neutral impression and click hooks. Production sales materials, audience claims and pricing require verified business data.",
        ],
      },
    ],
  },
};

