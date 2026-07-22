export interface Metric {
  value: string;
  label: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "milestone" | "certification" | "delivery";
}

export interface Work {
  id: string;
  title: string;
  client: string;
  period: string;
  role: string;
  description: string;
  caseStudySummary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  outcomes: string[];
  year: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  signal: string;
}

export const metrics: Metric[] = [
  { value: "7", label: "Years total experience" },
  { value: "6", label: "Years focused on SAP Commerce" },
  { value: "2", label: "Production rollouts owned" },
  { value: "7", label: "Member team guided as technical POC" }
];

export const techStack = [
  "SAP Commerce Cloud",
  "Hybris 2211",
  "Hybris 2205",
  "Hybris 1905",
  "Java / J2EE",
  "Spring MVC",
  "OCC APIs",
  "REST Web Services",
  "Backoffice",
  "HAC",
  "Impex",
  "CronJobs",
  "Oracle",
  "MySQL",
  "Maven",
  "Git",
  "JIRA",
  "Agile",
  "Claude AI Fundamentals",
  "AI-assisted Delivery"
];

export const capabilities = [
  {
    number: "01",
    title: "SAP Commerce Cloud",
    description:
      "B2B and B2C implementation work across SAP Commerce 2211, 2205, and 1905, with OCC extensions and platform customizations."
  },
  {
    number: "02",
    title: "Java / Integration",
    description:
      "Java and Spring MVC delivery across third-party integrations, payments, reporting, identity, AI-driven recommendation APIs, and order workflows."
  },
  {
    number: "03",
    title: "Platform Engineering",
    description:
      "Backoffice, CMS, data modelling, Impex, CronJobs, converters, populators, HAC operations, and production support discipline."
  }
];

export const achievements: Achievement[] = [
  {
    id: "production-rollouts",
    title: "Owned two production rollouts",
    description:
      "Led delivery from requirements through deployment while coordinating with BA, QA, and cross-functional stakeholders.",
    date: "Recent",
    type: "delivery"
  },
  {
    id: "technical-poc",
    title: "Technical POC for a 7-member team",
    description:
      "Guided implementation decisions, code reviews, KT sessions, and sprint delivery support across commerce modules.",
    date: "Leadership",
    type: "milestone"
  },
  {
    id: "claude-ai",
    title: "Claude AI Fundamentals",
    description:
      "Anthropic certification-backed AI fundamentals, now applied toward AI-assisted delivery, documentation, code quality, and practical developer workflows.",
    date: "AI",
    type: "certification"
  },
  {
    id: "fortune-context",
    title: "Fortune 500 commerce delivery context",
    description:
      "Contributed SAP Commerce solutions across enterprise contexts including HPE and Samsung implementation work.",
    date: "Enterprise",
    type: "delivery"
  }
];

export const works: Work[] = [
  {
    id: "samsung-commerce",
    title: "Nendrasy's",
    client: "Samsung SIEL ShopApp",
    period: "Feb 2025 - Present",
    role: "Senior SAP Commerce Developer",
    description:
      "Working as technical point of contact for a 7-member SAP Commerce team on the Samsung SIEL ShopApp project, delivering order lifecycle, mobile app, SSO, notification, and rollout work on SAP Commerce Cloud 2211.",
    caseStudySummary:
      "Leading SAP Commerce Cloud 2211 development for Samsung SIEL ShopApp, Samsung's mobile commerce platform. As Technical POC, enhanced SSO authentication, OCC APIs, order lifecycle event triggers, MoEngage notifications, and customer engagement integrations for a smoother mobile shopping experience.",
    image: "/assets/case-studies/samsung-shopapp.svg",
    imageAlt: "Abstract commerce cloud architecture visualization",
    tags: ["Hybris 2211", "MoEngage", "OCC APIs", "Recommendations"],
    outcomes: [
      "Event-based order notification triggers",
      "OCC API support for app journeys",
      "2 live production rollouts"
    ],
    year: 2025
  },
  {
    id: "iksula-samsung-commerce",
    title: "Iksula",
    client: "Samsung",
    period: "Apr 2024 - Feb 2025",
    role: "SAP Hybris Developer",
    description:
      "Delivered Samsung SAP Commerce features across regional commerce needs, including Bulgaria payment integration, Jasper Reports order summaries, and UK VIP Membership functionality on Hybris 2211.",
    caseStudySummary:
      "Worked on Samsung SAP Commerce Hybris 2211 enhancements for regional commerce rollouts across Bulgaria and the UK. Contributed TBI Payments integration, Jasper Reports order summaries, and VIP Membership functionality to support secure transactions, automated communication, and loyalty-driven shopping flows.",
    image: "/assets/case-studies/samsung-hybris.svg",
    imageAlt: "Dark enterprise commerce interface visualization",
    tags: ["Hybris 2211", "TBI Payments", "Jasper Reports", "VIP Membership"],
    outcomes: [
      "TBI Payments integration for Bulgaria",
      "Automated Jasper Reports order summaries",
      "VIP Membership functionality for UK market"
    ],
    year: 2024
  },
  {
    id: "wipro-hpe-commerce",
    title: "Wipro",
    client: "HPE (Hewlett Packard Enterprise)",
    period: "2021 - 2024",
    role: "L3 SAP Hybris Developer",
    description:
      "Designed and developed custom Hybris 2205 modules and storefront components for HPE commerce properties across B2B and B2C flows.",
    caseStudySummary:
      "Developed SAP Hybris 2205 modules and storefront components for HPE's enterprise B2B and B2C commerce platform. Delivered OKTA SSO, Addison Shipment Lead-Time integration, Bundles Module, Recommendation API, Backoffice customizations, PDP templates, and reusable commerce components.",
    image: "/assets/case-studies/hpe-commerce.svg",
    imageAlt: "Dark enterprise commerce interface visualization",
    tags: ["Hybris 2205", "OKTA SSO", "Bundles Module", "B2B/B2C"],
    outcomes: [
      "OKTA single sign-on integration",
      "Addison Shipment Lead-Time integration",
      "Bundles Module and Recommendation API"
    ],
    year: 2023
  },
  {
    id: "capgemini-dentsply-commerce",
    title: "Capgemini",
    client: "DENTSPLY Sirona",
    period: "2019 - 2021",
    role: "SAP Hybris Developer",
    description:
      "Implemented core Hybris 1905 modules for the DENTSPLY Sirona global dental equipment B2C commerce platform, translating business requirements into technical specifications and production release notes.",
    caseStudySummary:
      "Worked on DENTSPLY Sirona's global dental equipment B2C commerce platform using SAP Hybris 1905. Implemented core platform modules including Data Modelling, Impex, CronJobs, Interceptors, Converters, Populators, OCC Web Services, and release documentation for production readiness.",
    image: "/assets/case-studies/dentsply-platform.svg",
    imageAlt: "Modular software architecture panel",
    tags: ["Hybris 1905", "Data Modelling", "Impex", "CronJobs"],
    outcomes: [
      "Data Modelling, Interceptors, Converters, and Populators",
      "Impex, CronJobs, and OCC Web Services",
      "Deployment release notes and sprint delivery tracking"
    ],
    year: 2019
  }
];

export const rewards: Reward[] = [
  {
    id: "architecture-trust",
    title: "Architecture trust",
    description:
      "Involved in technical design discussions beyond standard developer execution, including delivery and integration decisions.",
    signal: "Design ownership"
  },
  {
    id: "mentorship",
    title: "Mentorship signal",
    description:
      "Supported junior engineers through KT, documentation, code reviews, and sprint-level implementation guidance.",
    signal: "Team enablement"
  },
  {
    id: "enterprise-readiness",
    title: "Enterprise readiness",
    description:
      "Resume-backed experience in live commerce systems, release ownership, defect triage, and stakeholder collaboration.",
    signal: "Production discipline"
  }
];

export const contact = {
  email: "chshravankumar97@gmail.com",
  linkedin: "https://www.linkedin.com/in/shravankumar-chinnaram-374736170/",
  resumeHref: "/assets/shravan-chinnaram-resume.txt"
};
