"use client";

import { useState } from "react";
import { StrapiFaqSection } from "@/types/strapi";
import { HelpCircle, ChevronDown, AlertCircle } from "lucide-react";

interface FaqSectionProps {
  section: StrapiFaqSection;
}

export function FaqSection({ section }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const items = Array.isArray(section.items) ? section.items : [];

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      aria-labelledby={`faq-title-${section.id}`}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Investor Clarifications</span>
        </div>
        <h2
          id={`faq-title-${section.id}`}
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
        >
          {section.title ?? "Frequently Asked Questions"}
        </h2>
        {section.subtitle && (
          <p className="text-sm text-slate-500 mt-1">{section.subtitle}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div
          role="status"
          className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500"
        >
          <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">No FAQs available</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Investor queries for this scheme are currently being compiled.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {items.map((item) => {
            const isOpen = !!openIds[item.id];
            const buttonId = `faq-trigger-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div key={item.id} className="py-4">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 text-left font-semibold text-slate-900 hover:text-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-lg py-1"
                >
                  <span className="text-base sm:text-lg">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base pr-6"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
