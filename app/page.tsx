"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight, Check, Star, Zap, Shield, BarChart2, Bell, Globe, ChevronDown, Sparkles, ArrowUp } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";

// ─── Inline mock data ─────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, mrr: 38000, users: 1200, activeUsers: 980 },
  { month: "Feb", revenue: 48500, mrr: 41000, users: 1380, activeUsers: 1100 },
  { month: "Mar", revenue: 53200, mrr: 45500, users: 1520, activeUsers: 1240 },
  { month: "Apr", revenue: 61000, mrr: 52000, users: 1740, activeUsers: 1430 },
  { month: "May", revenue: 58700, mrr: 50500, users: 1890, activeUsers: 1560 },
  { month: "Jun", revenue: 72400, mrr: 63000, users: 2100, activeUsers: 1780 },
  { month: "Jul", revenue: 79800, mrr: 69500, users: 2340, activeUsers: 1960 },
  { month: "Aug", revenue: 85200, mrr: 74000, users: 2580, activeUsers: 2150 },
  { month: "Sep", revenue: 91600, mrr: 80000, users: 2820, activeUsers: 2380 },
  { month: "Oct", revenue: 98400, mrr: 86500, users: 3060, activeUsers: 2590 },
  { month: "Nov", revenue: 107200, mrr: 94000, users: 3340, activeUsers: 2840 },
  { month: "Dec", revenue: 118500, mrr: 104000, users: 3680, activeUsers: 3120 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#a78bfa" },
  { name: "Social", value: 12, color: "#c4b5fd" },
  { name: "Email", value: 8, color: "#ddd6fe" },
];

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$104,000",
    change: 10.6,
    changeLabel: "vs last month",
    icon: "dollar",
    color: "indigo",
  },
  {
    id: "users",
    label: "Total Active Users",
    value: "3,680",
    change: 10.2,
    changeLabel: "vs last month",
    icon: "users",
    color: "violet",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.4%",
    change: -0.3,
    changeLabel: "vs last month",
    icon: "activity",
    color: "emerald",
  },
  {
    id: "ltv",
    label: "Avg. Customer LTV",
    value: "$1,840",
    change: 7.8,
    changeLabel: "vs last month",
    icon: "trending",
    color: "sky",
  },
];

const transactions = [
  { id: "t1", customer: "Acme Corp", email: "billing@acme.io", plan: "Enterprise", amount: 1200, status: "paid" as const, date: "Dec 18, 2024" },
  { id: "t2", customer: "Nova Labs", email: "finance@novalabs.co", plan: "Growth", amount: 399, status: "paid" as const, date: "Dec 17, 2024" },
  { id: "t3", customer: "Orbit SaaS", email: "ops@orbitsaas.com", plan: "Starter", amount: 79, status: "pending" as const, date: "Dec 17, 2024" },
  { id: "t4", customer: "Helix AI", email: "admin@helixai.dev", plan: "Enterprise", amount: 1200, status: "paid" as const, date: "Dec 16, 2024" },
  { id: "t5", customer: "Prism Data", email: "team@prismdata.io", plan: "Growth", amount: 399, status: "failed" as const, date: "Dec 15, 2024" },
  { id: "t6", customer: "Cascade HQ", email: "pay@cascadehq.com", plan: "Growth", amount: 399, status: "paid" as const, date: "Dec 14, 2024" },
];

const features = [
  {
    id: "f1",
    icon: BarChart2,
    title: "Real-Time Analytics",
    description: "Watch your metrics update live as events stream in. No more waiting for daily reports — see what's happening right now across every segment.",
    color: "indigo",
  },
  {
    id: "f2",
    icon: Bell,
    title: "Smart Alerting",
    description: "Set threshold-based alerts for any metric. Get notified via Slack, email, or webhook the moment revenue dips or churn spikes unexpectedly.",
    color: "violet",
  },
  {
    id: "f3",
    icon: Globe,
    title: "Multi-Workspace Support",
    description: "Manage analytics across all your products from a single login. Switch workspaces instantly and keep data cleanly separated per product.",
    color: "sky",
  },
  {
    id: "f4",
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II certified. All data encrypted at rest and in transit. Role-based access controls, SSO, and audit logs included on every plan.",
    color: "emerald",
  },
  {
    id: "f5",
    icon: Zap,
    title: "One-Click Integrations",
    description: "Connect Stripe, Segment, Mixpanel, HubSpot, and 40+ tools in minutes. Your data flows in automatically — no engineering work required.",
    color: "amber",
  },
  {
    id: "f6",
    icon: Users,
    title: "Team Collaboration",
    description: "Share dashboards, annotate charts, and comment on anomalies directly in Pulse. Keep your whole team aligned on the metrics that matter.",
    color: "rose",
  },
];

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: 79,
    period: "/ month",
    description: "Perfect for early-stage startups tracking core SaaS metrics.",
    features: [
      "Up to 5,000 tracked users",
      "10 custom dashboards",
      "7-day data retention",
      "Slack & email alerts",
      "Stripe integration",
      "Email support",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    id: "growth",
    name: "Growth",
    price: 399,
    period: "/ month",
    description: "For scaling teams that need deeper insights and more integrations.",
    features: [
      "Up to 50,000 tracked users",
      "Unlimited dashboards",
      "90-day data retention",
      "All alert channels",
      "40+ integrations",
      "Priority support",
      "Team collaboration",
      "Custom metrics",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1200,
    period: "/ month",
    description: "For large teams with advanced security, compliance, and scale needs.",
    features: [
      "Unlimited tracked users",
      "Unlimited dashboards",
      "Unlimited data retention",
      "SSO & SAML",
      "SOC 2 compliance",
      "Dedicated CSM",
      "SLA guarantee",
      "Custom contracts",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    id: "tm1",
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Orbit SaaS",
    avatar: "/images/sarah-chen-saas-growth.jpg",
    quote: "Pulse replaced four separate tools for us. Our team finally has a single source of truth for revenue, churn, and user behavior. The real-time alerts alone saved us from a major churn spike last quarter.",
    stars: 5,
  },
  {
    id: "tm2",
    name: "Marcus Webb",
    role: "Co-Founder & CEO",
    company: "Nova Labs",
    avatar: "/images/marcus-webb-ceo-startup.jpg",
    quote: "We went from spending 3 hours every Monday building reports to having everything live on a dashboard. Pulse's MRR tracking is the most accurate I've seen — it handles upgrades, downgrades, and refunds perfectly.",
    stars: 5,
  },
  {
    id: "tm3",
    name: "Priya Nair",
    role: "VP of Product",
    company: "Helix AI",
    avatar: "/images/priya-nair-vp-product.jpg",
    quote: "The cohort analysis and retention charts are incredible. We identified a drop-off in our onboarding flow that was costing us 18% of new signups. Fixed it in a week and saw immediate results.",
    stars: 5,
  },
];

const integrationLogos = [
  { name: "Stripe", bg: "from-violet-500 to-indigo-600" },
  { name: "Segment", bg: "from-green-500 to-emerald-600" },
  { name: "HubSpot", bg: "from-orange-500 to-red-500" },
  { name: "Mixpanel", bg: "from-purple-500 to-violet-600" },
  { name: "Slack", bg: "from-pink-500 to-rose-600" },
  { name: "Salesforce", bg: "from-sky-500 to-blue-600" },
  { name: "Intercom", bg: "from-blue-500 to-indigo-600" },
  { name: "Zapier", bg: "from-amber-500 to-orange-600" },
];

// ─── Helper components ────────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-600",
  violet: "bg-violet-100 text-violet-600",
  emerald: "bg-emerald-100 text-emerald-600",
  sky: "bg-sky-100 text-sky-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
};

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
};

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

function KpiCardComponent({ card }: { card: typeof kpiCards[0] }) {
  const shouldReduceMotion = useReducedMotion();
  const isPositive = card.change >= 0;
  const isChurn = card.id === "churn";
  const goodChange = isChurn ? !isPositive : isPositive;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: shouldReduceMotion ? 0 : -4, scale: shouldReduceMotion ? 1 : 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[card.color] ?? "bg-indigo-100 text-indigo-600"}`}>
          {iconMap[card.icon] ?? <Activity className="w-5 h-5" />}
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${goodChange ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          {goodChange ? <ArrowUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(card.change)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
      <p className="text-sm text-slate-500">{card.label}</p>
      <p className="text-xs text-slate-400 mt-1">{card.changeLabel}</p>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeChart, setActiveChart] = useState<"revenue" | "users">("revenue");
  const [activePricingPeriod, setActivePricingPeriod] = useState<"monthly" | "annual">("monthly");

  const chartTabs = [
    { key: "revenue" as const, label: "Revenue & MRR" },
    { key: "users" as const, label: "User Growth" },
  ];

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Now with AI-powered anomaly detection</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6"
          >
            Analytics that{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              drive growth
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {APP_DESCRIPTION}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.a
              href="#get-started"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.04, y: shouldReduceMotion ? 0 : -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#charts"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-base border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              View Live Demo
              <ChevronDown className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Hero KPI strip */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "ARR Tracked", value: "$2.4B+" },
              { label: "SaaS Teams", value: "2,400+" },
              { label: "Uptime SLA", value: "99.99%" },
              { label: "Integrations", value: "40+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm"
              >
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
        >
          <span className="text-xs">Scroll to explore</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── METRICS / KPI CARDS ──────────────────────────────────────────── */}
      <section id="metrics" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Live Metrics
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-slate-900 mb-4">
              Your business at a glance
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-xl mx-auto">
              Every KPI that matters to a SaaS business, updated in real time and beautifully visualized.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {kpiCards.map((card) => (
              <KpiCardComponent key={card.id} card={card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTS ───────────────────────────────────────────────────────── */}
      <section id="charts" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Analytics Charts
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-slate-900 mb-4">
              Visualize every dimension of growth
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-xl mx-auto">
              Interactive charts that let you drill into revenue trends, user cohorts, and traffic sources with a single click.
            </motion.p>
          </motion.div>

          {/* Main chart with tabs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeChart === "revenue" ? "Revenue & MRR Trend" : "User Growth Trend"}
                </h3>
                <p className="text-sm text-slate-500">January – December 2024</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                {chartTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveChart(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeChart === tab.key
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "revenue" ? (
                  <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorRevenue)" name="Revenue" />
                    <Area type="monotone" dataKey="mrr" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#colorMrr)" name="MRR" />
                  </AreaChart>
                ) : (
                  <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                      formatter={(value: number) => [value.toLocaleString(), undefined]}
                    />
                    <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#colorUsers)" name="Total Users" />
                    <Area type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={2.5} fill="url(#colorActive)" name="Active Users" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Secondary charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">Monthly Revenue Breakdown</h3>
              <p className="text-sm text-slate-500 mb-6">New vs. Expansion MRR per month</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData.slice(6)} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                    />
                    <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} name="Revenue" />
                    <Bar dataKey="mrr" fill="#a78bfa" radius={[6, 6, 0, 0]} name="MRR" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">Traffic Sources</h3>
              <p className="text-sm text-slate-500 mb-6">Where your new signups come from</p>
              <div className="flex items-center gap-6">
                <div className="h-56 flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {trafficSources.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                        formatter={(value: number) => [`${value}%`, undefined]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2.5 flex-shrink-0">
                  {trafficSources.map((src) => (
                    <div key={src.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: src.color }} />
                      <span className="text-xs text-slate-600 whitespace-nowrap">{src.name}</span>
                      <span className="text-xs font-semibold text-slate-900 ml-auto pl-2">{src.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RECENT TRANSACTIONS ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Transaction Feed
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900">
                Recent payments
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#get-started"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View all transactions <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Customer</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Plan</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Amount</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(transactions ?? []).map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="hover:bg-slate-50/60 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{tx.customer ?? "—"}</p>
                          <p className="text-xs text-slate-400">{tx.email ?? "—"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-slate-600">{tx.plan ?? "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900">${(tx.amount ?? 0).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[tx.status] ?? "bg-slate-100 text-slate-600"}`}>
                          {tx.status ?? "unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-slate-500">{tx.date ?? "—"}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Platform Features
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-slate-900 mb-4">
              Everything your SaaS team needs
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              From real-time event streaming to enterprise-grade security, Pulse gives you the full analytics stack without the complexity.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={fadeInUp}
                  whileHover={{ y: shouldReduceMotion ? 0 : -6, scale: shouldReduceMotion ? 1 : 1.02 }}
                  className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${colorMap[feature.color] ?? "bg-indigo-100 text-indigo-600"} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── INTEGRATIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-violet-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-200 uppercase tracking-widest mb-3">
              Integrations
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">
              Connects with your entire stack
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-indigo-200 max-w-xl mx-auto">
              Plug Pulse into the tools you already use. Data flows in automatically — no custom engineering required.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {integrationLogos.map((logo) => (
              <motion.div
                key={logo.name}
                variants={scaleIn}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.08, y: shouldReduceMotion ? 0 : -4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${logo.bg} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-xs font-bold">{logo.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-white">{logo.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Customer Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-slate-900 mb-4">
              Loved by SaaS teams worldwide
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-xl mx-auto">
              Join 2,400+ companies that use Pulse to understand their growth and make faster, smarter decisions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((tm) => (
              <motion.div
                key={tm.id}
                variants={fadeInUp}
                whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: tm.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">"{tm.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={tm.avatar}
                    alt={tm.name}
                    className="w-10 h-10 rounded-full object-cover bg-indigo-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{tm.name}</p>
                    <p className="text-xs text-slate-500">{tm.role} · {tm.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-slate-900 mb-4">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
              No hidden fees. No per-seat charges. Start free for 14 days — no credit card required.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setActivePricingPeriod("monthly")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activePricingPeriod === "monthly" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActivePricingPeriod("annual")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activePricingPeriod === "annual" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Annual
                <span className="ml-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">-20%</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {pricingTiers.map((tier) => {
              const displayPrice = activePricingPeriod === "annual"
                ? Math.round(tier.price * 0.8)
                : tier.price;

              return (
                <motion.div
                  key={tier.id}
                  variants={scaleIn}
                  whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                  className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-200 scale-105"
                      : "bg-white border border-slate-100 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-slate-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-5 ${tier.highlighted ? "text-indigo-200" : "text-slate-500"}`}>
                      {tier.description}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-extrabold ${tier.highlighted ? "text-white" : "text-slate-900"}`}>
                        ${displayPrice.toLocaleString()}
                      </span>
                      <span className={`text-sm mb-1.5 ${tier.highlighted ? "text-indigo-200" : "text-slate-400"}`}>
                        {tier.period}
                      </span>
                    </div>
                    {activePricingPeriod === "annual" && (
                      <p className={`text-xs mt-1 ${tier.highlighted ? "text-indigo-200" : "text-emerald-600"}`}>
                        Save ${Math.round(tier.price * 0.2 * 12).toLocaleString()} per year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(tier.features ?? []).map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tier.highlighted ? "bg-white/20" : "bg-indigo-50"}`}>
                          <Check className={`w-3 h-3 ${tier.highlighted ? "text-white" : "text-indigo-600"}`} />
                        </div>
                        <span className={`text-sm ${tier.highlighted ? "text-indigo-100" : "text-slate-600"}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#get-started"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      tier.highlighted
                        ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
                        : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-200"
                    }`}
                  >
                    {tier.cta}
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="get-started" className="py-24 px-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>14-day free trial · No credit card required</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to unlock your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              growth potential?
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Join 2,400+ SaaS teams already using Pulse to track revenue, reduce churn, and make data-driven decisions every day.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-900/50 hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Explore Features
            </motion.a>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-xs text-slate-500 mt-8">
            Trusted by teams at Acme Corp, Nova Labs, Helix AI, and 2,400+ others.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}