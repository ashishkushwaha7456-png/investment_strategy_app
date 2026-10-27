import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StrategyHero } from "@/components/strategy/StrategyHero";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { HoldingsSection } from "@/components/sections/HoldingsSection";
import { DocumentsSection } from "@/components/sections/DocumentsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  InvestmentStrategy,
  StrapiPerformanceSection,
  StrapiHoldingsSection,
  StrapiDocumentsSection,
  StrapiFaqSection,
} from "@/types/strapi";

describe("Strategy Component & Fallback Suite", () => {
  const mockStrategy: InvestmentStrategy = {
    id: 1,
    name: "Kotak Equity Opportunities Fund",
    slug: "kotak-equity-opportunities",
    category: "Large & Mid Cap Equity",
    description: "An open-ended equity scheme investing across large and mid cap stocks.",
    riskLevel: "Very High",
    nav: 284.65,
    asOnDate: "2026-10-24",
    sections: [],
  };

  it("renders StrategyHero metrics and typography correctly", () => {
    render(<StrategyHero strategy={mockStrategy} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Kotak Equity Opportunities Fund"
    );
    expect(screen.getByText("Large & Mid Cap Equity")).toBeInTheDocument();
    expect(screen.getByText("Risk: Very High")).toBeInTheDocument();
    expect(screen.getByText("₹284.65")).toBeInTheDocument();
    expect(screen.getAllByText("2026-10-24").length).toBeGreaterThan(0);
  });

  it("renders empty state when performance section benchmarks are missing", () => {
    const emptyPerformance: StrapiPerformanceSection = {
      id: 10,
      __component: "sections.performance",
      title: "Performance Verification",
      benchmarks: [],
    };

    render(<PerformanceSection section={emptyPerformance} />);

    expect(screen.getByText("Performance data is currently unavailable")).toBeInTheDocument();
  });

  it("renders empty state when holdings section items are empty", () => {
    const emptyHoldings: StrapiHoldingsSection = {
      id: 20,
      __component: "sections.holdings",
      title: "Portfolio Constituents",
      items: [],
    };

    render(<HoldingsSection section={emptyHoldings} />);

    expect(screen.getByText("No holdings data available")).toBeInTheDocument();
  });

  it("renders empty state when documents section items are empty", () => {
    const emptyDocuments: StrapiDocumentsSection = {
      id: 30,
      __component: "sections.documents",
      title: "Scheme Documents",
      items: [],
    };

    render(<DocumentsSection section={emptyDocuments} />);

    expect(screen.getByText("No documents currently available")).toBeInTheDocument();
  });

  it("renders empty state when FAQ section items are empty", () => {
    const emptyFaq: StrapiFaqSection = {
      id: 40,
      __component: "sections.faq",
      title: "Frequently Asked Questions",
      items: [],
    };

    render(<FaqSection section={emptyFaq} />);

    expect(screen.getByText("No FAQs available")).toBeInTheDocument();
  });
});
