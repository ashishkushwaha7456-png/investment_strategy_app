import { InvestmentStrategy, RiskLevel } from "@/types/strapi";
import { Calendar, Layers } from "lucide-react";

interface StrategyHeroProps {
  strategy: InvestmentStrategy;
}

function getRiskBadgeClasses(risk: RiskLevel): {
  badge: string;
  dot: string;
} {
  switch (risk) {
    case "Low":
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        dot: "bg-emerald-500",
      };
    case "Moderate":
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200/80",
        dot: "bg-amber-500",
      };
    case "High":
      return {
        badge: "bg-orange-50 text-orange-700 border-orange-200/80",
        dot: "bg-orange-500",
      };
    case "Very High":
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200/80",
        dot: "bg-rose-500",
      };
    default:
      return {
        badge: "bg-slate-100 text-slate-700 border-slate-200",
        dot: "bg-slate-500",
      };
  }
}

export function StrategyHero({ strategy }: StrategyHeroProps) {
  const riskStyles = getRiskBadgeClasses(strategy.riskLevel);

  return (
    <section
      aria-labelledby="strategy-hero-title"
      className="bg-white border-b border-slate-200 pt-8 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70">
            <Layers className="w-3.5 h-3.5 mr-1 text-slate-500" />
            {strategy.category}
          </span>

          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${riskStyles.badge}`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-1.5 ${riskStyles.dot}`}
              aria-hidden="true"
            />
            Risk: {strategy.riskLevel}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h1
              id="strategy-hero-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
            >
              {strategy.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {strategy.description}
            </p>

            <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                As on:{" "}
                <time dateTime={strategy.asOnDate} className="text-slate-700 font-medium">
                  {strategy.asOnDate}
                </time>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                Net Asset Value
              </span>
              <div className="mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  ₹{strategy.nav.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Valuation Date</span>
                <span className="text-slate-200 font-medium">{strategy.asOnDate}</span>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <a
                  href="#documents"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl font-medium text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  View Scheme Documents
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
