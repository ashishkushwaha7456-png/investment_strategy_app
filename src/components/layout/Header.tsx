import Link from "next/link";
import { TrendingUp, ShieldCheck, PieChart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight text-slate-900">
                AuraWealth
              </span>
              <span className="text-xs text-slate-500 block -mt-0.5 tracking-wider font-medium">
                INSTITUTIONAL STRATEGIES
              </span>
            </div>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              All Strategies
            </Link>
            <Link
              href="/strategies/kotak-equity-opportunities"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Equity Opportunities
            </Link>
            <Link
              href="/strategies/hdfc-balanced-advantage"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Balanced Advantage
            </Link>
            <Link
              href="/strategies/axis-bluechip-fund"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Bluechip Strategy
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SEBI Registered AMC</span>
            </div>
            <Link
              href="/strategies/kotak-equity-opportunities"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <PieChart className="w-4 h-4" />
              <span>Explore Funds</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
