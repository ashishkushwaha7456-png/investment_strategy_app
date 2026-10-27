import Link from "next/link";
import { getAllStrategies } from "@/lib/api/strapi";
import { Layers, ArrowRight } from "lucide-react";

export default async function HomePage() {
  const strategies = await getAllStrategies();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Investment Strategies
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Explore disciplined investment strategies across equity and dynamic asset allocation with transparent performance track records, portfolio holdings, and statutory regulatory filings.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Available Strategies
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Select a strategy to view detailed portfolio composition, returns history, and scheme documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <article
              key={strategy.slug}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                    <Layers className="w-3.5 h-3.5 mr-1 text-slate-500" />
                    {strategy.category}
                  </span>
                  <span className="inline-flex items-center text-xs font-semibold text-slate-500">
                    Risk: {strategy.riskLevel}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    <Link href={`/strategies/${strategy.slug}`} className="focus:outline-none">
                      {strategy.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {strategy.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Net Asset Value
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 mt-0.5 block">
                      ₹{strategy.nav.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Valuation Date
                    </span>
                    <span className="text-xs font-medium text-slate-700 mt-1 block">
                      {strategy.asOnDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Link
                  href={`/strategies/${strategy.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-white group-hover:bg-emerald-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <span>View Strategy Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
