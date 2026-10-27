export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  robots: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: StrapiMedia | null;
}

export interface StrapiBaseSection {
  id: number | string;
  __component: string;
}

export interface StrapiTextContentSection extends StrapiBaseSection {
  __component: "sections.text-content";
  title?: string;
  badge?: string;
  body: string;
}

export interface PerformanceReturns {
  oneYear?: number | null;
  threeYear?: number | null;
  fiveYear?: number | null;
  sinceInception?: number | null;
}

export interface PerformanceBenchmark {
  id?: string;
  label: string;
  isFund?: boolean;
  returns: PerformanceReturns;
}

export interface StrapiPerformanceSection extends StrapiBaseSection {
  __component: "sections.performance";
  title?: string;
  subtitle?: string;
  asOfDate?: string;
  benchmarks: PerformanceBenchmark[];
}

export interface HoldingItem {
  id?: string;
  companyName: string;
  sector: string;
  allocationPercentage: number;
  assetClass?: string;
}

export interface StrapiHoldingsSection extends StrapiBaseSection {
  __component: "sections.holdings";
  title?: string;
  subtitle?: string;
  totalHoldingsCount?: number;
  items: HoldingItem[];
}

export type DocumentFileType = "pdf" | "xlsx" | "doc";

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileType: DocumentFileType;
  fileSize: string;
  publishedDate: string;
  fileUrl: string;
}

export interface StrapiDocumentsSection extends StrapiBaseSection {
  __component: "sections.documents";
  title?: string;
  subtitle?: string;
  items: DocumentItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StrapiFaqSection extends StrapiBaseSection {
  __component: "sections.faq";
  title?: string;
  subtitle?: string;
  items: FaqItem[];
}

export interface StrapiUnknownSection extends StrapiBaseSection {
  __component: string;
  [key: string]: unknown;
}

export type StrapiSection =
  | StrapiTextContentSection
  | StrapiPerformanceSection
  | StrapiHoldingsSection
  | StrapiDocumentsSection
  | StrapiFaqSection
  | StrapiUnknownSection;

export interface InvestmentStrategy {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  description: string;
  riskLevel: RiskLevel;
  nav: number;
  asOnDate: string;
  seo?: StrapiSEO | null;
  sections: StrapiSection[];
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta?: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}
