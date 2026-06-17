// ─── Brand constants ──────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Real-time intelligence for modern SaaS teams.";
export const APP_DESCRIPTION =
  "Monitor revenue, track user growth, and surface actionable insights — all from a single, beautiful dashboard.";

// ─── Navigation (single source of truth) ─────────────────────────────────────
// All hrefs point to on-page section anchors (no separate routes yet).
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Metrics", href: "#metrics" },
  { label: "Charts", href: "#charts" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export const navCTA = {
  label: "Get Started Free",
  href: "#get-started",
};

// ─── Shared TypeScript types ──────────────────────────────────────────────────
export interface KpiCard {
  id: string;
  label: string;
  value: string;
  change: number; // percentage, positive = up, negative = down
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  users: number;
  activeUsers: number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

// ─── Footer links ─────────────────────────────────────────────────────────────
export interface FooterSection {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerSections: FooterSection[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Metrics", href: "#metrics" },
      { label: "Charts", href: "#charts" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Press", href: "#about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Documentation", href: "#features" },
      { label: "API Reference", href: "#features" },
      { label: "Status", href: "#features" },
      { label: "Contact", href: "#about" },
    ],
  },
];