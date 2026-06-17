"use client";

import { motion, useReducedMotion } from "framer-motion";
import { APP_NAME, APP_TAGLINE, footerSections } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Sparkles, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#1e1b4b] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10"
        >
          {/* Brand column */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 space-y-4"
          >
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {APP_NAME}
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {APP_TAGLINE}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Trusted by 2,400+ SaaS teams worldwide to track growth, reduce churn, and make data-driven decisions.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 flex items-center justify-center transition-all duration-200"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.1, y: shouldReduceMotion ? 0 : -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.heading} variants={fadeInUp} className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-500 hover:text-indigo-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}