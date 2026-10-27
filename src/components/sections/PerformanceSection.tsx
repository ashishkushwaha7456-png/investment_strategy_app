import { StrapiPerformanceSection } from "@/types/strapi";
import { TrendingUp, BarChart3, AlertCircle } from "lucide-react";

interface PerformanceSectionProps {
  section: StrapiPerformanceSection;
}

function formatReturn(val?: number | null): string {
  if (val === undefined || val === null) {
    return "-";
  }
  return `${val > 0 ? "+" : ""}${val.toFixed(2)}%`;
}

function getReturnColor(val?: number | null): string {
  if (val === undefined || val === null) {
    return "text-slate-400";
  }
  return val >= 0 ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold";
}

export function PerformanceSection({ section }: PerformanceSectionProps) {
  const hasBenchmarks = Array.isArray(section.benchmarks) && section.benchmarks.length > 0;

  return (
    <section
      aria-labelledby={`performance-title-${section.id}`}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/60 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Returns Analysis</span>
          </div>
          <h2
            id={`performance-title-${section.id}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
          >
            {section.title ?? "Performance Track Record"}
          </h2>
          {section.subtitle && (
            <p className="text-sm text-slate-500 mt-1">{section.subtitle}</p>
          )}
        </div>

        {section.asOfDate && (
          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
            Returns as of:{" "}
            <time dateTime={section.asOfDate} className="font-semibold text-slate-700">
              {section.asOfDate}
            </time>
          </div>
        )}
      </div>

      {!hasBenchmarks ? (
        <div
          role="status"
          className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500"
        >
          <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">Performance data is currently unavailable</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Historical returns for this strategy are being reconciled for the latest reporting period.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th scope="col" className="py-3.5 px-4 rounded-tl-lg">
                  Scheme / Benchmark
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  1 Year
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  3 Years (CAGR)
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  5 Years (CAGR)
                </th>
                <th scope="col" className="py-3.5 px-4 text-right rounded-tr-lg">
                  Since Inception
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.benchmarks.map((row) => (
                <tr
                  key={row.id ?? row.label}
                  className={`transition-colors ${
                    row.isFund
                      ? "bg-emerald-50/40 hover:bg-emerald-50/70 font-medium"
                      : "hover:bg-slate-50/80 text-slate-700"
                  }`}
                >
                  <th scope="row" className="py-4 px-4 font-medium text-slate-900 flex items-center gap-2">
                    {row.isFund && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                    )}
                    <span>{row.label}</span>
                  </th>
                  <td className={`py-4 px-4 text-right ${getReturnColor(row.returns.oneYear)}`}>
                    {formatReturn(row.returns.oneYear)}
                  </td>
                  <td className={`py-4 px-4 text-right ${getReturnColor(row.returns.threeYear)}`}>
                    {formatReturn(row.returns.threeYear)}
                  </td>
                  <td className={`py-4 px-4 text-right ${getReturnColor(row.returns.fiveYear)}`}>
                    {formatReturn(row.returns.fiveYear)}
                  </td>
                  <td className={`py-4 px-4 text-right ${getReturnColor(row.returns.sinceInception)}`}>
                    {formatReturn(row.returns.sinceInception)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span>Past performance may or may not be sustained in future. Calculations assume reinvestment of dividends.</span>
          </p>
        </div>
      )}
    </section>
  );
}
