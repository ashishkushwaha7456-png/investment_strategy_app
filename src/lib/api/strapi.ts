import { InvestmentStrategy } from "@/types/strapi";

const mockStrategies: InvestmentStrategy[] = [
  {
    id: 1,
    name: "Kotak Equity Opportunities Fund",
    slug: "kotak-equity-opportunities",
    category: "Large & Mid Cap Equity",
    description:
      "An open-ended equity scheme investing predominantly in a diversified portfolio of large-cap and mid-cap companies. The fund aims to generate capital appreciation by actively balancing established market leaders with high-growth mid-sized enterprises.",
    riskLevel: "Very High",
    nav: 284.65,
    asOnDate: "2026-10-24",
    seo: {
      metaTitle: "Kotak Equity Opportunities Fund - NAV, Returns, Portfolio & Analysis",
      metaDescription:
        "Comprehensive analysis of Kotak Equity Opportunities Fund. Explore latest NAV of ₹284.65, historical risk-adjusted returns, top holdings, fund manager insights, and downloadable factsheets.",
      canonicalUrl: "https://investment.example.com/strategies/kotak-equity-opportunities",
      robots: "index, follow, max-image-preview:large, max-snippet:-1",
      ogTitle: "Kotak Equity Opportunities Fund Performance & Holdings",
      ogDescription:
        "Detailed performance metrics, portfolio composition, and regulatory documentation for Kotak Equity Opportunities Fund.",
      ogImage: {
        id: 101,
        name: "kotak-equity-og.jpg",
        alternativeText: "Kotak Equity Opportunities Fund Strategy Banner",
        caption: null,
        width: 1200,
        height: 630,
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      },
    },
    sections: [
      {
        id: 101,
        __component: "sections.text-content",
        badge: "Investment Thesis",
        title: "Balanced Growth Across Market Capitalizations",
        body: "The strategy focuses on identifying resilient businesses with sustainable competitive advantages, disciplined capital allocation, and strong corporate governance. By maintaining a dynamic 50-70% allocation to large caps for stability and 30-50% to emerging mid caps for alpha generation, the fund seeks superior risk-adjusted returns across market cycles.",
      },
      {
        id: 102,
        __component: "sections.performance",
        title: "Historical Trailing Returns",
        subtitle: "Compound Annual Growth Rate (CAGR) relative to scheme benchmark and broader market indices.",
        asOfDate: "2026-10-24",
        benchmarks: [
          {
            id: "bm-fund",
            label: "Kotak Equity Opportunities Fund",
            isFund: true,
            returns: {
              oneYear: 26.42,
              threeYear: 21.85,
              fiveYear: 19.34,
              sinceInception: 16.78,
            },
          },
          {
            id: "bm-primary",
            label: "NIFTY LargeMidcap 250 TRI (Benchmark)",
            isFund: false,
            returns: {
              oneYear: 24.18,
              threeYear: 19.62,
              fiveYear: 17.81,
              sinceInception: 14.92,
            },
          },
          {
            id: "bm-secondary",
            label: "NIFTY 50 TRI",
            isFund: false,
            returns: {
              oneYear: 21.5,
              threeYear: 16.94,
              fiveYear: 15.62,
              sinceInception: 13.85,
            },
          },
        ],
      },
      {
        id: 103,
        __component: "sections.holdings",
        title: "Top Portfolio Holdings",
        subtitle: "Key equity exposures reflecting high-conviction thematic and sectoral allocations.",
        totalHoldingsCount: 54,
        items: [
          {
            id: "h1",
            companyName: "ICICI Bank Ltd.",
            sector: "Financial Services",
            allocationPercentage: 8.42,
            assetClass: "Equity (Large Cap)",
          },
          {
            id: "h2",
            companyName: "Larsen & Toubro Ltd.",
            sector: "Capital Goods",
            allocationPercentage: 6.85,
            assetClass: "Equity (Large Cap)",
          },
          {
            id: "h3",
            companyName: "Infosys Ltd.",
            sector: "Information Technology",
            allocationPercentage: 5.92,
            assetClass: "Equity (Large Cap)",
          },
          {
            id: "h4",
            companyName: "Bharat Electronics Ltd.",
            sector: "Aerospace & Defence",
            allocationPercentage: 5.14,
            assetClass: "Equity (Mid Cap)",
          },
          {
            id: "h5",
            companyName: "Reliance Industries Ltd.",
            sector: "Energy & Petrochemicals",
            allocationPercentage: 4.78,
            assetClass: "Equity (Large Cap)",
          },
          {
            id: "h6",
            companyName: "Trent Ltd.",
            sector: "Consumer Retailing",
            allocationPercentage: 4.25,
            assetClass: "Equity (Mid Cap)",
          },
          {
            id: "h7",
            companyName: "Solar Industries India Ltd.",
            sector: "Specialty Chemicals",
            allocationPercentage: 3.84,
            assetClass: "Equity (Mid Cap)",
          },
          {
            id: "h8",
            companyName: "Axis Bank Ltd.",
            sector: "Financial Services",
            allocationPercentage: 3.52,
            assetClass: "Equity (Large Cap)",
          },
          {
            id: "h9",
            companyName: "Cummins India Ltd.",
            sector: "Industrial Machinery",
            allocationPercentage: 3.19,
            assetClass: "Equity (Mid Cap)",
          },
          {
            id: "h10",
            companyName: "Tata Consultancy Services Ltd.",
            sector: "Information Technology",
            allocationPercentage: 2.95,
            assetClass: "Equity (Large Cap)",
          },
        ],
      },
      {
        id: 104,
        __component: "sections.documents",
        title: "Statutory & Regulatory Documents",
        subtitle: "Download official scheme disclosures, monthly portfolios, and investor communication.",
        items: [
          {
            id: "doc-1",
            title: "Scheme Information Document (SID)",
            category: "Regulatory",
            fileType: "pdf",
            fileSize: "2.8 MB",
            publishedDate: "2026-09-30",
            fileUrl: "https://example.com/documents/kotak-equity-sid.pdf",
          },
          {
            id: "doc-2",
            title: "Key Information Memorandum (KIM)",
            category: "Investor Notice",
            fileType: "pdf",
            fileSize: "1.2 MB",
            publishedDate: "2026-09-30",
            fileUrl: "https://example.com/documents/kotak-equity-kim.pdf",
          },
          {
            id: "doc-3",
            title: "Monthly Portfolio Factsheet - September 2026",
            category: "Factsheet",
            fileType: "pdf",
            fileSize: "4.1 MB",
            publishedDate: "2026-10-10",
            fileUrl: "https://example.com/documents/kotak-equity-factsheet-sep26.pdf",
          },
          {
            id: "doc-4",
            title: "Complete Portfolio Holdings Disclosure",
            category: "Data Sheet",
            fileType: "xlsx",
            fileSize: "680 KB",
            publishedDate: "2026-10-15",
            fileUrl: "https://example.com/documents/kotak-equity-portfolio-data.xlsx",
          },
        ],
      },
      {
        id: 105,
        __component: "sections.faq",
        title: "Frequently Asked Questions",
        subtitle: "Important investor queries regarding investment guidelines, risk factors, and redemption terms.",
        items: [
          {
            id: "faq-1",
            question: "What is the recommended investment horizon for this strategy?",
            answer:
              "Given the substantial allocation to both large-cap and growth-oriented mid-cap equities, this strategy is best suited for an investment horizon of 5 years or longer to smooth out market volatility and harness compounding benefits.",
          },
          {
            id: "faq-2",
            question: "How are capital gains taxed for this fund?",
            answer:
              "As an equity-oriented fund (allocating over 65% in domestic equities), short-term capital gains (units held for 12 months or less) are taxed at 20%. Long-term capital gains (units held for over 12 months) are taxed at 12.5% for gains exceeding ₹1.25 Lakh per financial year, without indexation benefits.",
          },
          {
            id: "faq-3",
            question: "Is Systematic Investment Plan (SIP) available for this fund?",
            answer:
              "Yes, investors can start a SIP with a minimum monthly contribution of ₹1,000. Daily, weekly, monthly, and quarterly frequencies are supported.",
          },
          {
            id: "faq-4",
            question: "What is the exit load structure?",
            answer:
              "An exit load of 1.00% is levied if units are redeemed or switched out within 365 days from the date of allotment. Redemption after 365 days attracts zero exit load.",
          },
        ],
      },
      {
        id: 106,
        __component: "sections.unknown-component",
        unsupportedFeatureName: "AlgorithmicRiskMeter",
        metadata: {
          version: "v2.0-beta",
        },
      },
    ],
  },
  {
    id: 2,
    name: "HDFC Balanced Advantage Fund",
    slug: "hdfc-balanced-advantage",
    category: "Dynamic Asset Allocation",
    description:
      "A dynamic asset allocation fund that tactically rebalances between equity and debt instruments based on proprietary valuation models, aiming to deliver steady returns with reduced drawdown volatility.",
    riskLevel: "Moderate",
    nav: 421.3,
    asOnDate: "2026-10-24",
    seo: {
      metaTitle: "HDFC Balanced Advantage Fund - NAV, Asset Allocation & Returns",
      metaDescription:
        "Track HDFC Balanced Advantage Fund latest NAV of ₹421.30, dynamic equity-debt asset allocation mix, historical performance, and risk ratings.",
      canonicalUrl: "https://investment.example.com/strategies/hdfc-balanced-advantage",
      robots: "index, follow",
      ogTitle: "HDFC Balanced Advantage Fund Asset Allocation Strategy",
      ogDescription: "Dynamic equity and debt allocation strategy designed for balanced growth and downside protection.",
      ogImage: {
        id: 102,
        name: "hdfc-ba-og.jpg",
        alternativeText: "HDFC Balanced Advantage Strategy",
        caption: null,
        width: 1200,
        height: 630,
        url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
      },
    },
    sections: [
      {
        id: 201,
        __component: "sections.text-content",
        badge: "Dynamic Allocation",
        title: "Intelligent Counter-Cyclical Asset Rebalancing",
        body: "The scheme employs an institutional quantitative framework assessing trailing P/E ratios, Price-to-Book spreads, and bond-yield gaps. When equity valuations stretch, equity exposure is automatically trimmed into high-quality corporate bonds and sovereign securities, protecting capital from market corrections.",
      },
      {
        id: 202,
        __component: "sections.performance",
        title: "Consistent Long-Term Compounding",
        subtitle: "Multi-cycle performance comparison against hybrid debt-equity benchmark indices.",
        asOfDate: "2026-10-24",
        benchmarks: [
          {
            id: "hdfc-fund",
            label: "HDFC Balanced Advantage Fund",
            isFund: true,
            returns: {
              oneYear: 18.72,
              threeYear: 17.45,
              fiveYear: 16.82,
              sinceInception: 15.35,
            },
          },
          {
            id: "hdfc-bm",
            label: "NIFTY 50 Hybrid Composite Debt 50:50 Index",
            isFund: false,
            returns: {
              oneYear: 14.2,
              threeYear: 12.8,
              fiveYear: 12.15,
              sinceInception: 11.4,
            },
          },
        ],
      },
      {
        id: 203,
        __component: "sections.holdings",
        title: "Representative Asset Composition",
        subtitle: "Top holdings across equity and high-grade fixed income instruments.",
        totalHoldingsCount: 88,
        items: [
          {
            id: "hba-1",
            companyName: "HDFC Bank Ltd.",
            sector: "Private Banking",
            allocationPercentage: 6.12,
            assetClass: "Large Cap Equity",
          },
          {
            id: "hba-2",
            companyName: "7.18% Government of India Sovereign Bond 2033",
            sector: "Sovereign Debt",
            allocationPercentage: 5.45,
            assetClass: "Government Securities",
          },
          {
            id: "hba-3",
            companyName: "State Bank of India",
            sector: "Public Banking",
            allocationPercentage: 4.88,
            assetClass: "Large Cap Equity",
          },
          {
            id: "hba-4",
            companyName: "National Bank for Agriculture (NABARD) AAA Bonds",
            sector: "Corporate Debt",
            allocationPercentage: 4.15,
            assetClass: "AAA Corporate Debt",
          },
          {
            id: "hba-5",
            companyName: "ITC Ltd.",
            sector: "FMCG",
            allocationPercentage: 3.92,
            assetClass: "Large Cap Equity",
          },
        ],
      },
      {
        id: 204,
        __component: "sections.faq",
        title: "Frequently Asked Questions",
        subtitle: "Clarifications on fund taxation and asset allocation mechanisms.",
        items: [
          {
            id: "hfaq-1",
            question: "How does the fund maintain equity taxation status?",
            answer:
              "The fund utilizes derivative instruments such as equity arbitrage to ensure that gross equity exposure remains consistently at or above 65%, qualifying it for favorable equity taxation while keeping net equity exposure adjusted dynamically.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Axis Bluechip Fund",
    slug: "axis-bluechip-fund",
    category: "Large Cap Equity",
    description:
      "A conservative equity strategy concentrated in market leaders with clean balance sheets and durable market leadership.",
    riskLevel: "High",
    nav: 54.12,
    asOnDate: "2026-10-24",
    seo: null,
    sections: [
      {
        id: 301,
        __component: "sections.text-content",
        badge: "Core Holding",
        title: "Quality First Approach",
        body: "Targeting secular growth businesses with pricing power and minimal leverage.",
      },
      {
        id: 302,
        __component: "sections.performance",
        title: "Performance Data",
        subtitle: "Historical data is currently undergoing annual verification.",
        asOfDate: "2026-10-24",
        benchmarks: [],
      },
      {
        id: 303,
        __component: "sections.holdings",
        title: "Portfolio Holdings",
        subtitle: "Holdings data is being audited for the upcoming monthly rebalancing cycle.",
        totalHoldingsCount: 0,
        items: [],
      },
      {
        id: 304,
        __component: "sections.documents",
        title: "Statutory Disclosures",
        subtitle: "Regulatory filings are being processed.",
        items: [],
      },
    ],
  },
];

export async function getStrategyBySlug(slug: string): Promise<InvestmentStrategy | null> {
  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (strapiUrl) {
    try {
      const endpoint = `${strapiUrl}/api/strategies?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate[seo][populate]=*&populate[sections][populate]=*`;

      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        },
        next: {
          revalidate: 60,
          tags: [`strategy-${slug}`],
        },
      });

      if (!response.ok) {
        return null;
      }

      const json = await response.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data[0] as InvestmentStrategy;
      }
    } catch {
      return null;
    }
  }

  const found = mockStrategies.find((strategy) => strategy.slug === slug);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

export async function getAllStrategies(): Promise<InvestmentStrategy[]> {
  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (strapiUrl) {
    try {
      const endpoint = `${strapiUrl}/api/strategies?populate=*`;
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        },
        next: {
          revalidate: 60,
          tags: ["strategies-list"],
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json.data)) {
          return json.data as InvestmentStrategy[];
        }
      }
    } catch {
      return JSON.parse(JSON.stringify(mockStrategies));
    }
  }

  return JSON.parse(JSON.stringify(mockStrategies));
}

export async function getAllStrategySlugs(): Promise<string[]> {
  const strategies = await getAllStrategies();
  return strategies.map((s) => s.slug);
}
