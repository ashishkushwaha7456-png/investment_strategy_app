import Link from "next/link";
import { AlertCircle, FileText, Lock, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-lg tracking-tight">AuraWealth Asset Management</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Leading institutional investment management offering disciplined equity, hybrid, and thematic investment strategies engineered for sustainable risk-adjusted compounding.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                256-bit SSL Encrypted
              </span>
              <span>AMFI Registered Mutual Fund</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Featured Strategies
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/strategies/kotak-equity-opportunities"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kotak Equity Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/hdfc-balanced-advantage"
                  className="hover:text-emerald-400 transition-colors"
                >
                  HDFC Balanced Advantage
                </Link>
              </li>
              <li>
                <Link
                  href="/strategies/axis-bluechip-fund"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Axis Bluechip Fund
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Compliance & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Statutory Disclosures</span>
              </li>
              <li>
                <span>Investor Charter</span>
              </li>
              <li>
                <span>Privacy & Cookies Policy</span>
              </li>
              <li>
                <span>Grievance Redressal Mechanism</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Statutory Regulatory Risk Disclaimer: </strong>
            Mutual fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future returns. Net Asset Value (NAV) of the schemes may fluctuate depending on the factors and forces affecting the securities market including the fluctuations in the interest rates. The NAV will be declared on all business days.
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 AuraWealth Asset Management. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Security Audited</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
