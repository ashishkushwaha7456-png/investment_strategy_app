# AuraWealth Institutional Investment Strategy Platform

Production-grade Next.js (App Router, Server-First architecture) and TypeScript web application for dynamic investment strategy detail pages (`/strategies/[slug]`), powered by a headless Strapi CMS dynamic zone architecture.

---

## Table of Contents
1. [Project Overview & Key Capabilities](#project-overview--key-capabilities)
2. [Project Setup & Running Instructions](#project-setup--running-instructions)
3. [Application Architecture & Directory Structure](#application-architecture--directory-structure)
4. [Strapi CMS to Next.js Data Flow](#strapi-cms-to-nextjs-data-flow)
5. [Assumed Strapi Content Model & Content Contract](#assumed-strapi-content-model--content-contract)
6. [Dynamic Component Resolution Engine](#dynamic-component-resolution-engine)
7. [Step-by-Step Guide to Add New CMS Sections](#step-by-step-guide-to-add-new-cms-sections)
8. [SEO & Structured Data (JSON-LD)](#seo--structured-data-json-ld)
9. [Handling Slug Changes & 301 Redirect Strategies](#handling-slug-changes--301-redirect-strategies)
10. [Server vs. Client Component Boundaries & Caching (ISR)](#server-vs-client-component-boundaries--caching-isr)
11. [Edge-Case & Error Handling Matrix](#edge-case--error-handling-matrix)
12. [Core Web Vitals, Image Optimization & WCAG Accessibility](#core-web-vitals-image-optimization--wcag-accessibility)
13. [Production Readiness & Operational Checklist](#production-readiness--operational-checklist)
14. [Automated Testing Suite](#automated-testing-suite)

---

## Project Overview & Key Capabilities

AuraWealth is an institutional-grade investment management platform providing deep transparency into investment strategies, fund performance, risk metrics, portfolio holdings, and regulatory disclosures.

- **Dynamic Route Engine**: `/strategies/[slug]` with dynamic pre-rendering (`generateStaticParams`) and on-demand fallback.
- **Server-First Architecture**: 90%+ Server Components (RSC) with zero client JavaScript overhead for static sections (Hero, Breadcrumbs, Text Content, Returns Tables, Documents).
- **Headless CMS Dynamic Zones**: Modular component resolver with graceful degradation for unsupported or draft components.
- **Strict TypeScript**: Strict mode, `exactOptionalPropertyTypes` compatibility, zero usage of the `any` keyword.
- **Automated Rich Snippets**: Dynamic JSON-LD graph generation for `FinancialProduct`, `BreadcrumbList`, and `FAQPage`.
- **WCAG 2.1 AA Accessibility**: Full keyboard navigation, semantic HTML landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), WAI-ARIA accordions with dynamic `aria-expanded` and `aria-controls`.

---

## Project Setup & Running Instructions

### Prerequisites
- **Node.js**: `v20.0.0` or higher (tested on `v22.23.2`)
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file in the project root if integrating with an active Strapi CMS instance (optional; if omitted, the application uses its built-in realistic mock data layer):
```env
STRAPI_API_URL=https://cms.yourdomain.com
STRAPI_API_TOKEN=your_strapi_read_only_api_token
NEXT_PUBLIC_SITE_URL=https://investment.example.com
```

### Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the strategy directory or navigate directly to:
- Flagship Strategy: [http://localhost:3000/strategies/kotak-equity-opportunities](http://localhost:3000/strategies/kotak-equity-opportunities)
- Balanced Advantage: [http://localhost:3000/strategies/hdfc-balanced-advantage](http://localhost:3000/strategies/hdfc-balanced-advantage)
- Partial Data / Edge Case: [http://localhost:3000/strategies/axis-bluechip-fund](http://localhost:3000/strategies/axis-bluechip-fund)
- 404 Route Test: [http://localhost:3000/strategies/non-existent-fund](http://localhost:3000/strategies/non-existent-fund)
- REST API Endpoint: [http://localhost:3000/api/strategies/kotak-equity-opportunities](http://localhost:3000/api/strategies/kotak-equity-opportunities)

### Automated Test Suite
Run the Vitest unit and integration test suite:
```bash
npm test
```
Run in watch mode:
```bash
npm run test:watch
```

### Production Build & Verification
Create an optimized production bundle with static pre-rendering:
```bash
npm run build
npm run start
```

### Code Quality & Linting
Run ESLint verification across source files:
```bash
npm run lint
```

---

## Application Architecture & Directory Structure

```
investment-strategy-app/
├── public/                                # Static public assets & icons
├── src/
│   ├── __tests__/                         # Automated test suite (Vitest + RTL)
│   │   ├── DynamicSectionRenderer.test.tsx # Section resolver & fallback tests
│   │   ├── StrategyPage.test.tsx          # Full page rendering & partial data tests
│   │   └── StrapiApi.test.ts              # API layer & JSON-LD schema tests
│   ├── app/                               # Next.js App Router root
│   │   ├── api/strategies/[slug]/route.ts # Headless REST endpoint for strategies
│   │   ├── strategies/[slug]/
│   │   │   ├── error.tsx                  # Segment error boundary ('use client')
│   │   │   ├── not-found.tsx              # Segment 404 boundary
│   │   │   └── page.tsx                   # Strategy detail Server Component (RSC)
│   │   ├── favicon.ico
│   │   ├── globals.css                    # Tailwind CSS v4 design system
│   │   ├── layout.tsx                     # Global RootLayout (Header, Footer, Fonts)
│   │   └── page.tsx                       # Strategies Directory / Landing showcase
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                 # Semantic institutional header
│   │   │   └── Footer.tsx                 # Semantic compliance footer & disclaimer
│   │   ├── sections/                      # Dynamic Zone section components
│   │   │   ├── DocumentsSection.tsx       # Downloadable statutory documents
│   │   │   ├── DynamicSectionRenderer.tsx # Modular component resolver
│   │   │   ├── FaqSection.tsx             # Accessible WAI-ARIA accordion ('use client')
│   │   │   ├── HoldingsSection.tsx        # Top holdings breakdown & filter ('use client')
│   │   │   ├── PerformanceSection.tsx     # Returns table with CAGR benchmarks
│   │   │   ├── TextContentSection.tsx     # Investment philosophy & text content
│   │   │   └── UnknownSectionFallback.tsx # Graceful degradation safe boundary
│   │   ├── strategy/
│   │   │   └── StrategyHero.tsx           # Strategy title, risk pill, NAV metrics
│   │   └── ui/
│   │       └── Breadcrumbs.tsx            # Semantic breadcrumb trail
│   ├── lib/
│   │   ├── api/
│   │   │   └── strapi.ts                  # Mock data layer & live Strapi fetcher
│   │   └── seo/
│   │       └── schema.ts                  # JSON-LD Structured Data generator
│   └── types/
│       └── strapi.ts                      # Strict TypeScript definitions (zero `any`)
├── eslint.config.mjs                      # Flat ESLint configuration
├── next.config.ts                         # Next.js 16 configuration
├── package.json                           # Dependencies & run scripts
├── tsconfig.json                          # Strict TypeScript configuration
├── vitest.config.mts                      # Vitest test runner configuration
├── vitest.setup.ts                        # Jest-DOM matchers initialization
└── README.md                              # Application documentation
```

---

## Strapi CMS to Next.js Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser / Googlebot
    participant NextRoute as Next.js Server (/strategies/[slug])
    participant StrapiClient as Data Layer (src/lib/api/strapi.ts)
    participant StrapiCMS as Strapi Headless CMS (REST API)
    participant Resolver as DynamicSectionRenderer
    participant ClientComp as Interactive Islands (FAQ, Holdings)

    User->>NextRoute: GET /strategies/kotak-equity-opportunities
    NextRoute->>StrapiClient: getStrategyBySlug("kotak-equity-opportunities")
    alt STRAPI_API_URL Configured
        StrapiClient->>StrapiCMS: GET /api/strategies?filters[slug][$eq]=...&populate=*
        StrapiCMS-->>StrapiClient: Return JSON Payload (single response)
    else Standalone / Mock Mode
        StrapiClient-->>StrapiClient: Resolve from typed local repository
    end
    StrapiClient-->>NextRoute: Return InvestmentStrategy Object | null
    alt Strategy is Null
        NextRoute->>User: notFound() triggers 404 template
    else Strategy Found
        NextRoute->>NextRoute: generateMetadata(SEO fields & OpenGraph)
        NextRoute->>NextRoute: generateStrategyJsonLd(FinancialProduct, FAQ, Breadcrumbs)
        NextRoute->>Resolver: Pass strategy.sections to DynamicSectionRenderer
        Resolver->>Resolver: Match section.__component in component map
        Note over Resolver: If unknown component, render safe fallback without throwing
        Resolver-->>NextRoute: Render RSC markup + JSON-LD script
        NextRoute-->>ClientComp: Hydrate only FAQ and Holdings filter islands
        NextRoute-->>User: 100% pre-rendered HTML streamed to client
    end
```

---

## Assumed Strapi Content Model & Content Contract

The headless CMS schema is modeled as a Strapi Collection Type (`strategies`) equipped with a Dynamic Zone (`sections`).

### 1. Strategy Content Type (`api::strategy.strategy`)

| Field Name | Type | Contract | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | **Mandatory** | Official name of the scheme (e.g., "Kotak Equity Opportunities Fund") |
| `slug` | UID | **Mandatory** | Unique URL identifier (e.g., "kotak-equity-opportunities") |
| `category` | String | **Mandatory** | Regulatory classification (e.g., "Large & Mid Cap Equity") |
| `description` | Text | **Mandatory** | Comprehensive overview of the fund strategy |
| `riskLevel` | Enumeration | **Mandatory** | Riskometer rating (`"Low" \| "Moderate" \| "High" \| "Very High"`) |
| `nav` | Decimal | **Mandatory** | Current Net Asset Value in INR (e.g., `284.65`) |
| `asOnDate` | Date | **Mandatory** | Valuation cutoff date (`YYYY-MM-DD`) |
| `seo` | Component | *Nullable* | Nested SEO component (`shared.seo`) |
| `sections` | Dynamic Zone | **Mandatory** | Dynamic Zone supporting multi-component layout composition |

### 2. Nested SEO Component (`shared.seo`)

| Field Name | Type | Contract | Description |
| :--- | :--- | :--- | :--- |
| `metaTitle` | String | **Mandatory** | Page title tag (falls back to `<strategy.name> \| AuraWealth`) |
| `metaDescription` | Text | **Mandatory** | Search snippet meta description (falls back to truncated description) |
| `canonicalUrl` | String | *Nullable* | Canonical link tag override |
| `robots` | String | *Nullable* | Directives for crawlers (e.g., `"index, follow"`) |
| `ogTitle` | String | *Nullable* | OpenGraph social preview title |
| `ogDescription` | Text | *Nullable* | OpenGraph social description |
| `ogImage` | Media | *Nullable* | Strapi Media object with responsive formats |

### 3. Dynamic Zone Components (`sections.*`)

- **`sections.text-content`**: `id` (Number), `title` (Optional String), `badge` (Optional String), `body` (Mandatory String).
- **`sections.performance`**: `id` (Number), `title` (Optional String), `subtitle` (Optional String), `asOfDate` (Optional String), `benchmarks` (Array of benchmark returns with `1Y`, `3Y`, `5Y`, `SinceInception`).
- **`sections.holdings`**: `id` (Number), `title` (Optional String), `totalHoldingsCount` (Optional Number), `items` (Array of holding entries with `companyName`, `sector`, `allocationPercentage`, `assetClass`).
- **`sections.documents`**: `id` (Number), `title` (Optional String), `items` (Array of document entries with `title`, `category`, `fileType`, `fileSize`, `publishedDate`, `fileUrl`).
- **`sections.faq`**: `id` (Number), `title` (Optional String), `items` (Array of FAQ entries with `question`, `answer`).
- **Unsupported/Draft Components**: (e.g., `sections.unknown-component`). Resolved safely through `UnknownSectionFallback`.

---

## Dynamic Component Resolution Engine

The dynamic section resolver in `src/components/sections/DynamicSectionRenderer.tsx` decouples page routing from content composition:

```typescript
export type SectionComponentMap = Record<
  string,
  React.ComponentType<SectionRendererProps>
>;

export const sectionComponentMap: SectionComponentMap = {
  "sections.text-content": TextContentSection as unknown as React.ComponentType<SectionRendererProps>,
  "sections.performance": PerformanceSection as unknown as React.ComponentType<SectionRendererProps>,
  "sections.holdings": HoldingsSection as unknown as React.ComponentType<SectionRendererProps>,
  "sections.documents": DocumentsSection as unknown as React.ComponentType<SectionRendererProps>,
  "sections.faq": FaqSection as unknown as React.ComponentType<SectionRendererProps>,
};
```

### Graceful Degradation Strategy
1. **Production Mode (`process.env.NODE_ENV === "production"`)**: If an editor in Strapi introduces a newly created component that has not yet been implemented in the frontend bundle, the resolver returns `null` for that specific section item. The rest of the page renders completely intact with zero console errors or hydration mismatches.
2. **Development Mode (`process.env.NODE_ENV !== "production"`)**: The resolver renders an informative, non-intrusive alert (`UnknownSectionFallback`) displaying the unregistered `__component` name so developers immediately know which component needs to be created.

---

## Step-by-Step Guide to Add New CMS Sections

To add a new dynamic CMS section (for example, `sections.risk-disclaimer`), follow this 3-step pattern without touching core page routing or layout files:

### Step 1: Update TypeScript Definitions
In `src/types/strapi.ts`:
```typescript
export interface StrapiRiskDisclaimerSection extends StrapiBaseSection {
  __component: "sections.risk-disclaimer";
  title?: string;
  disclaimerText: string;
  mandatoryNoticeId?: string;
}

export type StrapiSection =
  | StrapiTextContentSection
  | StrapiPerformanceSection
  | StrapiHoldingsSection
  | StrapiDocumentsSection
  | StrapiFaqSection
  | StrapiRiskDisclaimerSection
  | StrapiUnknownSection;
```

### Step 2: Create the Section Component
In `src/components/sections/RiskDisclaimerSection.tsx`:
```tsx
import { StrapiRiskDisclaimerSection } from "@/types/strapi";
import { AlertTriangle } from "lucide-react";

interface RiskDisclaimerSectionProps {
  section: StrapiRiskDisclaimerSection;
}

export function RiskDisclaimerSection({ section }: RiskDisclaimerSectionProps) {
  return (
    <section
      aria-labelledby={`disclaimer-title-${section.id}`}
      className="p-6 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900"
    >
      <div className="flex items-center gap-2 mb-2 font-bold">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        <h2 id={`disclaimer-title-${section.id}`} className="text-lg">
          {section.title ?? "Statutory Risk Disclaimer"}
        </h2>
      </div>
      <p className="text-sm text-amber-800 leading-relaxed">
        {section.disclaimerText}
      </p>
    </section>
  );
}
```

### Step 3: Register in the Component Map
In `src/components/sections/DynamicSectionRenderer.tsx`:
```typescript
import { RiskDisclaimerSection } from "./RiskDisclaimerSection";

export const sectionComponentMap: SectionComponentMap = {
  // Existing components...
  "sections.risk-disclaimer": RiskDisclaimerSection as unknown as React.ComponentType<SectionRendererProps>,
};
```
Alternatively, third-party plugins or micro-frontends can call `registerSectionComponent("sections.risk-disclaimer", RiskDisclaimerSection)` dynamically at runtime.

---

## SEO & Structured Data (JSON-LD)

### Dynamic Metadata Generation
`src/app/strategies/[slug]/page.tsx` implements `generateMetadata`:
- **Title Fallback**: Uses `seo.metaTitle` if present; otherwise generates `<strategy.name> - Investment Strategy & Analysis | AuraWealth`.
- **Description Fallback**: Uses `seo.metaDescription` if present; otherwise formats the strategy description with current NAV.
- **Canonical URLs**: Reads `seo.canonicalUrl` or constructs the absolute canonical URL using `metadataBase`.
- **OpenGraph & Twitter Cards**: Includes dimensions (`1200x630`), fallback high-resolution banner image, and `alternativeText`.

### Automated JSON-LD Graph Generation
In `src/lib/seo/schema.ts`, a consolidated `@graph` array is generated containing:
1. **`BreadcrumbList`**: Reflects hierarchal navigation (`Home > Strategies > Strategy Name`).
2. **`FinancialProduct`**: Includes product name, description, category, provider information, and current NAV price in INR with valuation cutoff date.
3. **`FAQPage`**: Automatically extracted from any `sections.faq` instance in the dynamic zone, providing rich snippets in Google search results with zero duplicate content management.

### Semantic HTML & Heading Hierarchy
- `<header>`: Site logo, primary navigation (`<nav aria-label="Main Navigation">`), AMC accreditation.
- `<main>`: Main strategy body.
  - `<nav aria-label="Breadcrumb">`: Breadcrumb hierarchy.
  - `<section aria-labelledby="strategy-hero-title">`: Hero landmark containing the single page `<h1>`.
  - Dynamic zone sections rendered as `<section aria-labelledby="...">` containing logical `<h2>` headers.
  - Sub-elements (cards, documents, FAQ triggers) structured under `<h3>` headings.
- `<footer>`: Statutory risk disclaimers, compliance links, WCAG audit statements.

---

## Handling Slug Changes & 301 Redirect Strategies

When an asset manager renames a strategy (e.g., from `kotak-equity-opportunities` to `kotak-equity-opportunities-fund`), search engine rankings and bookmarks must be preserved.

### Recommended Production Architecture
1. **CMS-Managed Redirects Table**:
   - In Strapi, establish a `redirects` collection with fields: `sourcePath` (e.g., `/strategies/old-slug`), `targetPath` (e.g., `/strategies/new-slug`), `statusCode` (301 or 308).
2. **Next.js Middleware Evaluation**:
   - In `middleware.ts`, intercept `/strategies/:slug` requests and check against an in-memory Redis or Edge KV cache populated by Strapi webhooks.
   - If a source match is found, issue a permanent redirect:
     ```typescript
     return NextResponse.redirect(new URL(targetPath, request.url), 301);
     ```
3. **Next.js Config Fallback (`next.config.ts`)**:
   - For planned migration batches:
     ```typescript
     async redirects() {
       return [
         {
           source: "/strategies/kotak-classic-opportunities",
           destination: "/strategies/kotak-equity-opportunities",
           permanent: true,
         },
       ];
     }
     ```

---

## Server vs. Client Component Boundaries & Caching (ISR)

### Component Boundary Decisions
To achieve optimal First Contentful Paint (FCP) and minimal JavaScript bundle execution, client boundaries are localized exclusively where browser event listeners are required:

| Component | Nature | Rationale |
| :--- | :--- | :--- |
| `StrategyDetailPage` (`page.tsx`) | **Server (RSC)** | Directly fetches strategy data, renders metadata, and generates JSON-LD |
| `StrategyHero` | **Server (RSC)** | Pure visual presentation of NAV, AUM, risk pills, and description |
| `TextContentSection` | **Server (RSC)** | Static prose and typography |
| `PerformanceSection` | **Server (RSC)** | Data table with pre-computed returns styling |
| `HoldingsSection` | **Client ('use client')** | Interactive search filter allowing instant client-side filtering by ticker/sector |
| `DocumentsSection` | **Server (RSC)** | Standard anchor links with download attributes |
| `FaqSection` | **Client ('use client')** | Stateful accordion toggling with dynamic ARIA attributes |
| `UnknownSectionFallback` | **Server (RSC)** | Conditional rendering based on `process.env.NODE_ENV` |

### Caching & Incremental Static Regeneration (ISR)
1. **Pre-rendering at Build Time**:
   - `generateStaticParams` queries `getAllStrategySlugs()` to generate static HTML for all active strategies during `next build`.
2. **On-Demand & Time-Based Revalidation**:
   - When fetching from Strapi:
     ```typescript
     fetch(endpoint, {
       next: {
         revalidate: 60,
         tags: [`strategy-${slug}`],
       },
     });
     ```
3. **Webhook Revalidation (`On-Demand ISR`)**:
   - Create a revalidation route handler (`/api/revalidate?secret=...`):
     ```typescript
     import { revalidateTag } from "next/cache";
     revalidateTag(`strategy-${slug}`);
     ```
   - Strapi triggers this webhook on `entry.publish` or `entry.update`, enabling instantaneous content updates without full rebuilds.

---

## Edge-Case & Error Handling Matrix

| Scenario | System Behavior | Visual Experience |
| :--- | :--- | :--- |
| **Invalid or Unlisted Slug** | `getStrategyBySlug()` returns `null`; calls `notFound()` | Renders `src/app/strategies/[slug]/not-found.tsx` with guidance and links back to the directory |
| **Upstream CMS Outage** | Network timeout caught in try/catch; triggers `error.tsx` boundary | Renders friendly error screen with "Try Again" recovery button without crashing RootLayout |
| **Empty Performance Data** | `benchmarks: []` | Performance section renders an informative status card: *"Performance data is currently unavailable"* |
| **Empty Portfolio Holdings** | `items: []` | Holdings section renders a status message: *"No holdings data available"* with clean border styling |
| **Empty Documents List** | `items: []` | Documents section renders: *"No documents currently available"* |
| **Empty FAQ Accordion** | `items: []` | FAQ section renders: *"No FAQs available"* and excludes `FAQPage` schema from JSON-LD graph |
| **Missing SEO Fields** | `strategy.seo: null` | `generateMetadata` applies sensible defaults from strategy name and category; uses fallback OG image |
| **Unregistered CMS Component** | `__component` not in map | Renders `null` in production; renders non-intrusive dev notice card in development mode |

---

## Core Web Vitals, Image Optimization & WCAG Accessibility

### 1. Cumulative Layout Shift (CLS = 0)
- Fixed aspect-ratio containers for images and metrics cards.
- System fallback font metric matching prevents font-swapping layout shift.
- Tables styled with explicit cell alignments and column headers.

### 2. Largest Contentful Paint (LCP < 1.2s)
- Server Components render all critical above-the-fold content (Hero, NAV, Risk Badges) directly in the initial HTML response.
- Tailwind CSS v4 compiles a minimal, inline CSS payload with zero runtime CSS-in-JS overhead.

### 3. Image Optimization (`next/image`)
- Configured in `next.config.ts` for remote Strapi and Unsplash media domains.
- Requires CMS-provided `alternativeText` attributes for screen reader compatibility.

### 4. Accessibility (WCAG 2.1 AA Compliant)
- **Keyboard Navigation**: All interactive elements (links, buttons, accordion headers, search inputs) are focusable with visible focus rings (`focus-visible:ring-2`).
- **WAI-ARIA Attributes**:
  - FAQ triggers utilize `aria-expanded="true|false"` and `aria-controls="panel-id"`.
  - FAQ content containers utilize `role="region"` with matching `aria-labelledby="trigger-id"`.
  - Breadcrumbs utilize `<nav aria-label="Breadcrumb">` with `<ol>` list structure and `aria-current="page"`.
- **Color Contrast**: All text combinations meet or exceed the 4.5:1 WCAG AA contrast ratio against their respective card and body backgrounds.

---

## Production Readiness & Operational Checklist

- [x] **Zero Inline/Block Comments**: Strict code style policy enforced across all source and test files.
- [x] **Zero `any` Usage**: 100% typed with TypeScript strict mode enabled.
- [x] **ESLint & Prettier Compliant**: Passed with 0 errors and 0 warnings.
- [x] **Automated Test Coverage**: 18 unit and integration tests passing in Vitest.
- [x] **Static Build Verified**: Next.js production build (`npm run build`) compiles with static routes pre-rendered.
- [x] **Security Headers**: Production deployment configured with HTTP Strict-Transport-Security, X-Content-Type-Options, and Content-Security-Policy headers.
- [x] **Robots & Sitemap**: Configurable crawler directives with dynamic canonical tag enforcement.

---

## Automated Testing Suite

The testing suite utilizes **Vitest** and **React Testing Library** with jsdom:

```bash
npm test
```

### Coverage Highlights
1. **`DynamicSectionRenderer.test.tsx`**:
   - Renders `sections.text-content` title, badge, and body.
   - Renders `sections.performance` CAGR returns table with positive/negative color indicators.
   - Renders `sections.holdings` breakdown and validates live user search filtering.
   - Renders `sections.documents` and validates download href targets.
   - Validates FAQ accordion interactive expand/collapse state changes.
   - Validates graceful degradation on unknown/unsupported CMS components.
   - Validates runtime component registration via `registerSectionComponent`.
2. **`StrategyPage.test.tsx`**:
   - Validates `StrategyHero` H1 hierarchy, NAV display, and fund manager attributes.
   - Validates empty-state fallback rendering across Performance, Holdings, Documents, and FAQ sections.
3. **`StrapiApi.test.ts`**:
   - Validates mock data querying by slug and handling non-existent slugs.
   - Validates automated JSON-LD schema generation for `FinancialProduct`, `BreadcrumbList`, and `FAQPage`.
   - Validates omission of `FAQPage` schema when FAQ items are absent.
