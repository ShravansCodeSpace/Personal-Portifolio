import {
  Award,
  Boxes,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  FileCog,
  GitBranch,
  KeyRound,
  Layers3,
  Mail,
  MonitorCog,
  Network,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Shravankumar Chinnaram",
  title: "Senior SAP Commerce Developer",
  location: "Hyderabad, India",
  email: "chshravankumar97@gmail.com",
  linkedin: "https://www.linkedin.com/in/shravankumar-chinnaram-374736170/",
  ownerEmail: "chshravankumar97@gmail.com",
  summary:
    "Senior SAP Commerce Cloud specialist with 7 years of software engineering experience and 5 years focused on SAP Commerce Cloud across enterprise B2B and B2C platforms.",
  valueProp:
    "I build, integrate, and stabilize commerce platforms: OCC APIs, secure SSO, payments, real-time engagement, reports, and production rollouts.",
  stats: [
    { value: "7", label: "Years total experience" },
    { value: "5", label: "Years SAP Commerce" },
    { value: "2", label: "Live rollouts owned" },
    { value: "4", label: "Member team led" }
  ]
};

export const navItems = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "modules", label: "Modules", href: "#modules" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "dashboard", label: "Login", href: "/dashboard" }
];

export const skillGroups = [
  {
    title: "Commerce platform",
    icon: Cloud,
    skills: ["SAP Commerce Cloud", "Hybris 2211", "Hybris 2205", "Hybris 1905", "B2B Commerce", "B2C Commerce"]
  },
  {
    title: "Backend",
    icon: Code2,
    skills: ["Java", "J2EE", "Spring MVC", "REST Web Services", "OCC APIs", "Interceptors", "Converters", "Populators"]
  },
  {
    title: "Data and operations",
    icon: Database,
    skills: ["Data Modelling", "Impex", "CronJobs", "Oracle", "MySQL", "Tomcat"]
  },
  {
    title: "Tools and cloud",
    icon: MonitorCog,
    skills: ["HAC", "Backoffice", "Git", "JIRA", "Maven", "IntelliJ", "SAP Commerce Cloud"]
  }
];

export const experiences = [
  {
    role: "Senior SAP Commerce Developer",
    company: "Samsung SIEL ShopApp · Nendrasy's",
    dates: "Feb 2025 - Present",
    summary:
      "Technical point of contact for a 4-member SAP Commerce team, owning code reviews, architecture guidance, OCC API enhancements, SSO, MoEngage integration, and two live rollouts."
  },
  {
    role: "SAP Hybris Developer",
    company: "Samsung · Iksula",
    dates: "Apr 2024 - Feb 2025",
    summary:
      "Delivered Hybris 2211 commerce features including Bulgaria TBI Payments, UK VIP Membership, and Jasper order summary reports dispatched by email."
  },
  {
    role: "L3 SAP Hybris Developer",
    company: "HPE · Wipro",
    dates: "2021 - 2024",
    summary:
      "Built enterprise Hybris 2205 modules and storefront components, including Addison shipment lead-time, bundles, OKTA SSO, recommendation APIs, PDP templates, and Backoffice customizations."
  },
  {
    role: "SAP Hybris Developer",
    company: "DENTSPLY Sirona · Capgemini",
    dates: "2019 - 2021",
    summary:
      "Implemented SAP Commerce foundations for a multi-country B2C platform: data models, Impex, CronJobs, interceptors, converters, populators, and OCC web services."
  }
];

export const modules = [
  {
    title: "OCC APIs",
    icon: Network,
    description: "Enhanced REST APIs for mobile app integration and stronger frontend-backend communication.",
    tags: ["SAP Commerce", "REST", "Mobile"]
  },
  {
    title: "SSO and identity",
    icon: KeyRound,
    description: "Implemented OKTA and platform SSO flows for secure enterprise authentication.",
    tags: ["OKTA", "SSO", "Security"]
  },
  {
    title: "Payments",
    icon: ShoppingCart,
    description: "Integrated TBI Payments for Bulgaria market transaction processing on Hybris 2211.",
    tags: ["TBI", "Checkout", "Hybris 2211"]
  },
  {
    title: "Engagement events",
    icon: Workflow,
    description: "Integrated MoEngage and event-based order lifecycle triggers for real-time notifications.",
    tags: ["MoEngage", "Events", "Orders"]
  },
  {
    title: "Reports",
    icon: FileCog,
    description: "Built Jasper Reports to generate detailed order summaries after successful checkout.",
    tags: ["Jasper", "Email", "Orders"]
  },
  {
    title: "Bundles and promotions",
    icon: Boxes,
    description: "Enabled flexible product bundling and membership-based discount experiences.",
    tags: ["Bundles", "VIP", "Promotions"]
  },
  {
    title: "Shipment lead-time",
    icon: Rocket,
    description: "Owned Addison shipment lead-time integration for real-time B2B delivery estimates.",
    tags: ["Addison", "B2B", "Integration"]
  },
  {
    title: "Backoffice and storefront",
    icon: Layers3,
    description: "Customized Backoffice, PDP templates, and CMS components for flexible content operations.",
    tags: ["Backoffice", "PDP", "CMS"]
  }
];

export const achievements = [
  {
    title: "Production ownership",
    icon: ShieldCheck,
    metric: "2 live rollouts",
    detail: "Owned requirements-to-go-live delivery for two production client rollouts at Nendrasy's."
  },
  {
    title: "Enterprise delivery",
    icon: BriefcaseBusiness,
    metric: "Fortune 500 platforms",
    detail: "Delivered SAP Commerce solutions for HPE and Samsung commerce ecosystems."
  },
  {
    title: "Technical leadership",
    icon: GitBranch,
    metric: "4-member team",
    detail: "Guided code reviews, architecture decisions, delivery quality, and technical unblocking."
  },
  {
    title: "AI learning",
    icon: Sparkles,
    metric: "5 Anthropic certificates",
    detail: "Completed Claude, Claude Code, Claude Cowork, and agent skills certificates to strengthen practical AI-assisted engineering fundamentals."
  }
];

export const certifications = [
  {
    name: "Claude 101",
    issuer: "Anthropic",
    date: "Issued April 20, 2026",
    focus: "Core Claude concepts, safe usage, and foundation-level AI assistant workflows.",
    href: "/certifications/claude-101.pdf",
    icon: Award
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    date: "Issued April 21, 2026",
    focus: "Practical Claude Code fundamentals for developer productivity and codebase navigation.",
    href: "/certifications/claude-code-101.pdf",
    icon: Award
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Certificate of completion",
    focus: "Applied Claude Code workflows for implementation, iteration, and engineering task execution.",
    href: "/certifications/claude-code-in-action.pdf",
    icon: Award
  },
  {
    name: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    date: "Issued April 22, 2026",
    focus: "Collaborative AI workflows, task delegation, and coworking patterns with Claude.",
    href: "/certifications/introduction-to-claude-cowork.pdf",
    icon: Award
  },
  {
    name: "Introduction to agent skills",
    issuer: "Anthropic",
    date: "Certificate of completion",
    focus: "Agent skill concepts for structured AI task execution and repeatable workflows.",
    href: "/certifications/introduction-to-agent-skills.pdf",
    icon: Award
  }
];
