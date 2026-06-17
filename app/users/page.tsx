"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Search, Download, ChevronUp, ChevronDown, Users, UserPlus, Activity, Clock, Eye } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = "Starter" | "Pro" | "Enterprise";
type Status = "Active" | "Inactive" | "Trial";
type SortKey = "name" | "email" | "plan" | "status" | "joinDate";
type SortDir = "asc" | "desc";

interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  joinDate: string;
  initials: string;
  avatarColor: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USERS: User[] = [
  { id: "u1",  name: "Alice Hartman",    email: "alice@acmecorp.io",      plan: "Enterprise", status: "Active",   joinDate: "2023-01-15", initials: "AH", avatarColor: "bg-indigo-500" },
  { id: "u2",  name: "Brian Cho",        email: "brian@novalabs.co",      plan: "Pro",        status: "Active",   joinDate: "2023-03-22", initials: "BC", avatarColor: "bg-violet-500" },
  { id: "u3",  name: "Carmen Reyes",     email: "carmen@orbitapp.com",    plan: "Starter",    status: "Trial",    joinDate: "2023-06-10", initials: "CR", avatarColor: "bg-sky-500" },
  { id: "u4",  name: "David Kim",        email: "david@helixai.dev",      plan: "Enterprise", status: "Active",   joinDate: "2023-07-04", initials: "DK", avatarColor: "bg-emerald-500" },
  { id: "u5",  name: "Elena Vasquez",    email: "elena@prismdata.io",     plan: "Pro",        status: "Inactive", joinDate: "2023-08-19", initials: "EV", avatarColor: "bg-rose-500" },
  { id: "u6",  name: "Frank Nguyen",     email: "frank@cascadehq.com",    plan: "Starter",    status: "Active",   joinDate: "2023-09-30", initials: "FN", avatarColor: "bg-amber-500" },
  { id: "u7",  name: "Grace Liu",        email: "grace@syntheticai.io",   plan: "Enterprise", status: "Active",   joinDate: "2023-11-05", initials: "GL", avatarColor: "bg-teal-500" },
  { id: "u8",  name: "Henry Okafor",     email: "henry@stackforge.dev",   plan: "Pro",        status: "Trial",    joinDate: "2024-01-12", initials: "HO", avatarColor: "bg-indigo-400" },
  { id: "u9",  name: "Isla Brennan",     email: "isla@luminary.co",       plan: "Starter",    status: "Active",   joinDate: "2024-02-28", initials: "IB", avatarColor: "bg-violet-400" },
  { id: "u10", name: "James Patel",      email: "james@quantumleap.io",   plan: "Enterprise", status: "Active",   joinDate: "2024-03-14", initials: "JP", avatarColor: "bg-cyan-500" },
  { id: "u11", name: "Karen Müller",     email: "karen@driftworks.de",    plan: "Pro",        status: "Inactive", joinDate: "2024-04-01", initials: "KM", avatarColor: "bg-pink-500" },
  { id: "u12", name: "Liam Torres",      email: "liam@apexcloud.net",     plan: "Starter",    status: "Active",   joinDate: "2024-05-17", initials: "LT", avatarColor: "bg-lime-500" },
  { id: "u13", name: "Mia Johansson",    email: "mia@nordicsaas.se",      plan: "Pro",        status: "Active",   joinDate: "2024-06-22", initials: "MJ", avatarColor: "bg-orange-500" },
  { id: "u14", name: "Noah Williams",    email: "noah@bridgetech.com",    plan: "Enterprise", status: "Trial",    joinDate: "2024-08-09", initials: "NW", avatarColor: "bg-indigo-600" },
  { id: "u15", name: "Olivia Chen",      email: "olivia@pixelcraft.io",   plan: "Starter",    status: "Active",   joinDate: "2024-10-03", initials: "OC", avatarColor: "bg-violet-600" },
];

const GROWTH_DATA = [
  { month: "Jan", totalUsers: 1200, activeUsers: 980 },
  { month: "Feb", totalUsers: 1380, activeUsers: 1100 },
  { month: "Mar", totalUsers: 1520, activeUsers: 1240 },
  { month: "Apr", totalUsers: 1740, activeUsers: 1430 },
  { month: "May", totalUsers: 1890, activeUsers: 1560 },
  { month: "Jun", totalUsers: 2100, activeUsers: 1780 },
  { month: "Jul", totalUsers: 2340, activeUsers: 1960 },
  { month: "Aug", totalUsers: 2580, activeUsers: 2150 },
  { month: "Sep", totalUsers: 2820, activeUsers: 2380 },
  { month: "Oct", totalUsers: 3060, activeUsers: 2590 },
  { month: "Nov", totalUsers: 3340, activeUsers: 2840 },
  { month: "Dec", totalUsers: 3680, activeUsers: 3120 },
];

const SUMMARY_STATS = [
  { id: "total",   label: "Total Users",      value: "3,680",  change: "+10.2%", up: true,  icon: Users },
  { id: "new",     label: "New This Month",   value: "+340",   change: "+18.5%", up: true,  icon: UserPlus },
  { id: "active",  label: "Active Rate",      value: "84.8%",  change: "+1.3%",  up: true,  icon: Activity },
  { id: "session", label: "Avg. Session",     value: "4m 32s", change: "+0.4%",  up: true,  icon: Clock },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function planBadge(plan: Plan) {
  const map: Record<Plan, string> = {
    Starter:    "bg-slate-100 text-slate-700",
    Pro:        "bg-indigo-100 text-indigo-700",
    Enterprise: "bg-violet-100 text-violet-700",
  };
  return map[plan];
}

function statusBadge(status: Status) {
  const map: Record<Status, string> = {
    Active:   "bg-emerald-100 text-emerald-700",
    Inactive: "bg-red-100 text-red-700",
    Trial:    "bg-amber-100 text-amber-700",
  };
  return map[status];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [planFilter, setPlan]     = useState("All Plans");
  const [sortKey, setSortKey]     = useState<SortKey>("joinDate");
  const [sortDir, setSortDir]     = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    let list = [...MOCK_USERS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      list = list.filter((u) => u.status === statusFilter);
    }
    if (planFilter !== "All Plans") {
      list = list.filter((u) => u.plan === planFilter);
    }

    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, statusFilter, planFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 text-slate-300 ml-1 inline" />;
    return sortDir === "asc"
      ? <ChevronUp   className="w-3 h-3 text-indigo-500 ml-1 inline" />
      : <ChevronDown className="w-3 h-3 text-indigo-500 ml-1 inline" />;
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 pt-28 pb-20 px-4">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            {APP_NAME} · User Management
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            User{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Management
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-10"
          >
            Monitor, search, and manage every user across your platform. Track
            growth trends, filter by plan or status, and export data in seconds.
          </motion.p>

          {/* Stat pills */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
              <Users className="w-4 h-4 text-indigo-300" />
              3,680 Total Users
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
              <Activity className="w-4 h-4 text-violet-300" />
              284 Active Today
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SEARCH & TABLE ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* Filter bar */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users by name or email…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                {["All", "Active", "Inactive", "Trial"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              {/* Plan filter */}
              <select
                value={planFilter}
                onChange={(e) => setPlan(e.target.value)}
                className="px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                {["All Plans", "Starter", "Pro", "Enterprise"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              {/* Export */}
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow hover:shadow-indigo-200 hover:shadow-md transition-all duration-200 whitespace-nowrap">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {([
                      { key: "name",     label: "Name" },
                      { key: "email",    label: "Email" },
                      { key: "plan",     label: "Plan" },
                      { key: "status",   label: "Status" },
                      { key: "joinDate", label: "Join Date" },
                    ] as { key: SortKey; label: string }[]).map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-indigo-600 transition-colors"
                      >
                        {col.label}
                        <SortIcon col={col.key} />
                      </th>
                    ))}
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        No users match your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Name + avatar */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                              {user.initials}
                            </div>
                            <span className="font-medium text-slate-800">{user.name}</span>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500">{user.email}</td>
                        {/* Plan */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planBadge(user.plan)}`}>
                            {user.plan}
                          </span>
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        {/* Join Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500">{formatDate(user.joinDate)}</td>
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Row count */}
            <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
              Showing {filtered.length} of {MOCK_USERS.length} users
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── USER GROWTH CHART ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Chart card */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">User Growth Over Time</h2>
              <p className="text-sm text-slate-500 mt-1">
                Monthly total users vs. active users — Jan through Dec 2024
              </p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={GROWTH_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={48} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                  labelStyle={{ fontWeight: 600, color: "#1e293b" }}
                />
                <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "16px" }} />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  name="Total Users"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#gradTotal)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Users"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#gradActive)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Summary stat cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SUMMARY_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-0.5">{stat.label}</p>
                    <p className="text-2xl font-extrabold text-slate-900 leading-tight">{stat.value}</p>
                    <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
