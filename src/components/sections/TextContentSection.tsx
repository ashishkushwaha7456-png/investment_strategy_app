import { StrapiTextContentSection } from "@/types/strapi";
import { Sparkles } from "lucide-react";

interface TextContentSectionProps {
  section: StrapiTextContentSection;
}

export function TextContentSection({ section }: TextContentSectionProps) {
  return (
    <section
      aria-labelledby={`section-title-${section.id}`}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
    >
      <div className="max-w-3xl">
        {section.badge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{section.badge}</span>
          </div>
        )}

        {section.title && (
          <h2
            id={`section-title-${section.id}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4"
          >
            {section.title}
          </h2>
        )}

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base sm:text-lg">
          <p>{section.body}</p>
        </div>
      </div>
    </section>
  );
}
