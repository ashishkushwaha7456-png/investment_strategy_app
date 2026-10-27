import Link from "next/link";
import { AlertOctagon, ArrowLeft, Search } from "lucide-react";

export default function StrategyNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            404 — Strategy Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Investment Strategy Unavailable
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The investment strategy you requested could not be found. It may have been renamed, merged into another scheme, or the URL slug may be incorrect.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All Strategies</span>
          </Link>
          <Link
            href="/strategies/kotak-equity-opportunities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Explore Flagship Fund</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
