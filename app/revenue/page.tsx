"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrArrData = [
  { month: "Jan", mrr: 72000, arr: 864000 },
  { month: "Feb", mrr: 75500, arr: 906000 },
  { month: "Mar", mrr: 79000, arr: 948000 },
  { month: "Apr", mrr: 82400, arr: 988800 },
  { month: "May", mrr: 85000, arr: 1020000 },
  { month: "Jun", mrr: 88200, arr: 1058400 },
  { month: "Jul", mrr: 91500, arr: 1098000 },
  { month: "Aug", mrr: 94800, arr: 1137600 },
  { month: "Sep", mrr: 97600, arr: 1171200 },
  { month: "Oct", mrr: 100200, arr: 1202400 },
  { month: "Nov", mrr: 102400, arr: 1228800 },
  { month: "Dec", mrr: 104000, arr: 1248000 },
];

const planTierData = [
  { name: "Starter", value: 22, color: "#a5b4fc", monthly: 22880 },
  { name: "Pro", value: 45, color: "#6366f1", monthly: 46800 },
  { name: "Enterprise", value: 33, color: "#7c3aed", monthly: 34320 },
];

const topCustomers = [
  { id: "c1", name: "Acme Corp", plan: "Enterprise", mrr: 2400, growth: 12.4 },
  { id: "c2", name: "Helix AI", plan: "Enterprise", mrr: 2200, growth: 8.7 },
  { id: "c3", name: "Nova Labs", plan: "Enterprise", mrr: 2000, growth: 15.2 },
  { id: "c4", name: "Orbit SaaS", plan: "Pro", mrr: 1600, growth: 6.3 },
  { id: "c5", name: "Prism Data", plan: "Enterprise", mrr: 1800, growth: 9.1 },
  { id: "c6", name: "Cascade HQ", plan: "Pro", mrr: 1200, growth: 4.8 },
  { id: "c7", name: "Vertex Cloud", plan: "Pro", mrr: 1000, growth: 11.5 },
  { id: "c8", name: "Zenith Tech", plan: "Pro", mrr: 800, growth: 3.2 },
];

const monthlyBarData = [
  { month: "Jan", revenue: 86400, mrr: 72000 },
  { month: "Feb", revenue: 90600, mrr: 75500 },
  { month: "Mar", revenue: 94800, mrr: 79000 },
  { month: "Apr", revenue: 98880, mrr: 82400 },
  { month: "May", revenue: 102000, mrr: 85000 },
  { month: "Jun", revenue: 105840, mrr: 88200 },
  { month: "Jul", revenue: 109800, mrr: 91500 },
  { month: "Aug", revenue: 113760, mrr: 94800 },
  { month: "Sep", revenue: 117120, mrr: 97600 },
  { month: "Oct", revenue: 120240, mrr: 100200 },
  { month: "Nov", revenue: 122880, mrr: 102400 },
  { month: "Dec", revenue: 124800, mrr: 104000 },
];

const q4Highlights = [
  {
    id: "oct",
    month: "October",
    revenue: 120240,
    mrr: 100200,
    newCustomers: 87,
    trend: 2.1,
  },
  {
    id: "nov",
    month: "November",
    revenue: 122880,
    mrr: 102400,
    newCustomers: 94,
    trend: 2.2,
  },
  {
    id: "dec",
    month: "December",
    revenue: 124800,
    mrr: 104000,
    newCustomers: 102,
    trend: 1.6,
  },
];

const summaryCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$104,000",
    change: 10.6,
    icon: DollarSign,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "arr",
    label: "Annual Recurring Revenue",
    value: "$1,248,000",
    change: 10.6,
    icon: TrendingUp,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: "$28.26",
    change: 2.1,
    icon: Users,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "nrr",
    label: "Net Revenue Retention",
    value: "118%",
    change: 3.0,
    icon: Activity,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDollar = (v: number) =>
  v >= 1000000
    ? `$${(v / 1000000).toFixed(2)}M`
    : v >= 1000
    ? `$${(v / 1000).toFixed(0)}k`
    : `$${v}`;

const planBadgeClass = (plan: string) => {
  if (plan === "Enterprise")
    return "bg-violet-100 text-violet-700 border border-violet-200";
  if (plan === "Pro")
    return "bg-indigo-100 text-indigo-700 border border-indigo-200";
  return "bg-slate-100 text-slate-600 border border-slate-200";
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── 1. HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-medium mb-6">
              <DollarSign className="w-3.5 h-3.5" />
              {APP_NAME} · Revenue Intelligence
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
            >
              Revenue{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                Breakdown
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-lg text-slate-300 mb-10"
            >
              Track MRR, ARR, and revenue trends across every plan tier. Understand
              where your revenue comes from and where it's headed.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white">
                <DollarSign className="w-4 h-4 text-indigo-300" />
                <span className="text-sm font-semibold">MRR&nbsp;</span>
                <span className="text-indigo-200 font-bold">$104,000</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white">
                <TrendingUp className="w-4 h-4 text-violet-300" />
                <span className="text-sm font-semibold">ARR&nbsp;</span>
                <span className="text-violet-200 font-bold">$1.25M</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SUMMARY CARDS + MRR/ARR TREND ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                      +{card.change}%
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* MRR & ARR Trend Chart */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-6">MRR &amp; ARR Trend</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={mrrArrData} margin={{ top: 4, right: 24, left: 16, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={(v: number) => formatDollar(v)}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "mrr" ? "MRR" : "ARR",
                  ]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 13 }}
                />
                <Legend
                  formatter={(value: string) => (value === "mrr" ? "MRR" : "ARR")}
                  wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="arr"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 3. PLAN-TIER DISTRIBUTION + TOP CUSTOMERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Plan Tier Pie */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue by Plan Tier</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={planTierData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {planTierData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom legend */}
            <div className="mt-2 space-y-2">
              {planTierData.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: tier.color }}
                    />
                    <span className="font-medium text-slate-700">{tier.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">{tier.value}%</span>
                    <span className="font-semibold text-slate-800">
                      ${tier.monthly.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers Table */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">Top Customers by Revenue</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Customer</th>
                    <th className="text-left py-2 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Plan</th>
                    <th className="text-right py-2 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">MRR</th>
                    <th className="text-right py-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-slate-800">{c.name}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planBadgeClass(c.plan)}`}>
                          {c.plan}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-slate-800">
                        ${c.mrr.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-emerald-600 font-semibold">+{c.growth}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4. MONTHLY REVENUE SUMMARY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-6">Monthly Revenue Summary</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyBarData} margin={{ top: 4, right: 24, left: 16, bottom: 4 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={(v: number) => formatDollar(v)}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "revenue" ? "Revenue" : "MRR",
                  ]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 13 }}
                />
                <Legend
                  formatter={(value: string) => (value === "revenue" ? "Revenue" : "MRR")}
                  wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mrr" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Q4 Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {q4Highlights.map((q) => (
              <motion.div
                key={q.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-base">{q.month}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    +{q.trend}%
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Revenue</span>
                    <span className="font-semibold text-slate-800">${q.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">MRR</span>
                    <span className="font-semibold text-slate-800">${q.mrr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">New Customers</span>
                    <span className="font-semibold text-indigo-600">+{q.newCustomers}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
