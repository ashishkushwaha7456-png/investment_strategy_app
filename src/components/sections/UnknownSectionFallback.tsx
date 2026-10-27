import { StrapiUnknownSection } from "@/types/strapi";
import { AlertCircle } from "lucide-react";

interface UnknownSectionFallbackProps {
  section: StrapiUnknownSection;
}

export function UnknownSectionFallback({ section }: UnknownSectionFallbackProps) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <aside
      aria-label="CMS Component Notice"
      className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/70 text-amber-900 text-xs"
    >
      <div className="flex items-center gap-2 font-semibold">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Development Notice: Unregistered Strapi Component</span>
      </div>
      <p className="mt-1 text-amber-700">
        Component identifier <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-semibold">{section.__component}</code> has no registered React component in DynamicSectionRenderer.
      </p>
    </aside>
  );
}
