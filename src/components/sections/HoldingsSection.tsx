"use client";

import { useState } from "react";
import { StrapiHoldingsSection } from "@/types/strapi";
import { Briefcase, Search, PieChart, AlertCircle } from "lucide-react";

interface HoldingsSectionProps {
  section: StrapiHoldingsSection;
}

export function HoldingsSection({ section }: HoldingsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const items = Array.isArray(section.items) ? section.items : [];

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.companyName.toLowerCase().includes(query) ||
      item.sector.toLowerCase().includes(query)
    );
  });

  return (
    <section
      aria-labelledby={`holdings-title-${section.id}`}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/60 mb-2">
            <PieChart className="w-3.5 h-3.5 text-purple-600" />
            <span>Portfolio Allocation</span>
          </div>
          <h2
            id={`holdings-title-${section.id}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
          >
            {section.title ?? "Top Portfolio Holdings"}
          </h2>
          {section.subtitle && (
            <p className="text-sm text-slate-500 mt-1">{section.subtitle}</p>
          )}
        </div>

        {section.totalHoldingsCount !== undefined && section.totalHoldingsCount > 0 && (
          <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 self-start sm:self-auto flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>
              Total Holdings:{" "}
              <strong className="text-slate-900 font-semibold">
                {section.totalHoldingsCount}
              </strong>
            </span>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div
          role="status"
          className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500"
        >
          <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">No holdings data available</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Portfolio constituent data is currently undergoing audit and will be published shortly.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by company or sector..."
              aria-label="Filter portfolio holdings"
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-sm border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                  <th scope="col" className="py-3 px-4 rounded-tl-lg">
                    Company Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Sector
                  </th>
                  <th scope="col" className="py-3 px-4 text-right rounded-tr-lg">
                    Weightage (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id ?? `${item.companyName}-${index}`}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div>{item.companyName}</div>
                      {item.assetClass && (
                        <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                          {item.assetClass}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        {item.sector}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div
                          className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden hidden sm:block"
                          aria-hidden="true"
                        >
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, item.allocationPercentage * 10)}%`,
                            }}
                          />
                        </div>
                        <span className="font-semibold text-slate-800 tabular-nums">
                          {item.allocationPercentage.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <p className="text-xs text-center text-slate-500 py-4">
              No holdings matched your filter criteria &quot;{searchQuery}&quot;.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
