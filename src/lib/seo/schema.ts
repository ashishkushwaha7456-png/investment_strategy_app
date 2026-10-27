import { InvestmentStrategy, StrapiFaqSection } from "@/types/strapi";

export interface JsonLdGraph {
  "@context": string;
  "@graph": Array<Record<string, unknown>>;
}

export function generateStrategyJsonLd(
  strategy: InvestmentStrategy,
  siteUrl: string = "https://investment.example.com"
): JsonLdGraph {
  const pageUrl = `${siteUrl}/strategies/${strategy.slug}`;

  const breadcrumbSchema: Record<string, unknown> = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Strategies",
        item: `${siteUrl}/strategies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: strategy.name,
        item: pageUrl,
      },
    ],
  };

  const financialProductSchema: Record<string, unknown> = {
    "@type": "FinancialProduct",
    "@id": `${pageUrl}#product`,
    name: strategy.name,
    description: strategy.description,
    category: strategy.category,
    url: pageUrl,
    provider: {
      "@type": "FinancialService",
      name: "Asset Management Company",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: strategy.nav.toString(),
      priceCurrency: "INR",
      priceValidUntil: strategy.asOnDate,
    },
  };

  const graphItems: Array<Record<string, unknown>> = [
    breadcrumbSchema,
    financialProductSchema,
  ];

  const faqSection = strategy.sections.find(
    (section): section is StrapiFaqSection =>
      section.__component === "sections.faq" &&
      Array.isArray(section.items) &&
      section.items.length > 0
  );

  if (faqSection && faqSection.items.length > 0) {
    const faqSchema: Record<string, unknown> = {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqSection.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    graphItems.push(faqSchema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphItems,
  };
}
