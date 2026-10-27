import { StrapiDocumentsSection, DocumentFileType } from "@/types/strapi";
import {
  FileText,
  FileSpreadsheet,
  File,
  Download,
  FolderOpen,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface DocumentsSectionProps {
  section: StrapiDocumentsSection;
}

function getFileIcon(type: DocumentFileType) {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-rose-600" />;
    case "xlsx":
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    case "doc":
      return <File className="w-5 h-5 text-blue-600" />;
    default:
      return <File className="w-5 h-5 text-slate-500" />;
  }
}

function getFileBadgeClasses(type: DocumentFileType): string {
  switch (type) {
    case "pdf":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    case "xlsx":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "doc":
      return "bg-blue-50 text-blue-700 border-blue-200/60";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function DocumentsSection({ section }: DocumentsSectionProps) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <section
      id="documents"
      aria-labelledby={`documents-title-${section.id}`}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 mb-2">
          <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Statutory Disclosures</span>
        </div>
        <h2
          id={`documents-title-${section.id}`}
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
        >
          {section.title ?? "Scheme Documents & Disclosures"}
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
          <p className="text-sm font-medium text-slate-700">No documents currently available</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Regulatory and informational documents will be published here upon regulatory clearance.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all bg-slate-50/40 flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="space-y-1">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getFileBadgeClasses(
                      doc.fileType
                    )}`}
                  >
                    {doc.fileType}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {doc.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-0.5">
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{doc.publishedDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={doc.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${doc.title} (${doc.fileType.toUpperCase()}, ${doc.fileSize})`}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-200/70 border border-slate-200/80 shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
