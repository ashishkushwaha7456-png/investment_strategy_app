import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  DynamicSectionRenderer,
  registerSectionComponent,
  SectionRendererProps,
} from "@/components/sections/DynamicSectionRenderer";
import {
  StrapiTextContentSection,
  StrapiPerformanceSection,
  StrapiHoldingsSection,
  StrapiDocumentsSection,
  StrapiFaqSection,
  StrapiUnknownSection,
} from "@/types/strapi";

describe("DynamicSectionRenderer", () => {
  it("renders null when sections array is empty", () => {
    const { container } = render(<DynamicSectionRenderer sections={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders text content section accurately", () => {
    const section: StrapiTextContentSection = {
      id: 1,
      __component: "sections.text-content",
      badge: "Core Philosophy",
      title: "Growth At Reasonable Price",
      body: "We target market leaders with sustainable competitive advantages.",
    };

    render(<DynamicSectionRenderer sections={[section]} />);

    expect(screen.getByText("Core Philosophy")).toBeInTheDocument();
    expect(screen.getByText("Growth At Reasonable Price")).toBeInTheDocument();
    expect(
      screen.getByText("We target market leaders with sustainable competitive advantages.")
    ).toBeInTheDocument();
  });

  it("renders performance returns table", () => {
    const section: StrapiPerformanceSection = {
      id: 2,
      __component: "sections.performance",
      title: "Annual Trailing Returns",
      asOfDate: "2026-10-24",
      benchmarks: [
        {
          id: "fund-1",
          label: "Alpha Strategy",
          isFund: true,
          returns: {
            oneYear: 24.5,
            threeYear: 18.2,
            fiveYear: 16.1,
            sinceInception: 15.0,
          },
        },
      ],
    };

    render(<DynamicSectionRenderer sections={[section]} />);

    expect(screen.getByText("Annual Trailing Returns")).toBeInTheDocument();
    expect(screen.getByText("Alpha Strategy")).toBeInTheDocument();
    expect(screen.getByText("+24.50%")).toBeInTheDocument();
    expect(screen.getByText("+18.20%")).toBeInTheDocument();
  });

  it("renders holdings breakdown and supports filtering", async () => {
    const user = userEvent.setup();
    const section: StrapiHoldingsSection = {
      id: 3,
      __component: "sections.holdings",
      title: "Portfolio Constituents",
      totalHoldingsCount: 2,
      items: [
        {
          id: "h-1",
          companyName: "Infosys Technologies",
          sector: "IT Services",
          allocationPercentage: 8.5,
        },
        {
          id: "h-2",
          companyName: "HDFC Bank",
          sector: "Banking",
          allocationPercentage: 7.2,
        },
      ],
    };

    render(<DynamicSectionRenderer sections={[section]} />);

    expect(screen.getByText("Infosys Technologies")).toBeInTheDocument();
    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();

    const searchInput = screen.getByLabelText("Filter portfolio holdings");
    await user.type(searchInput, "Infosys");

    expect(screen.getByText("Infosys Technologies")).toBeInTheDocument();
    expect(screen.queryByText("HDFC Bank")).not.toBeInTheDocument();
  });

  it("renders downloadable documents section", () => {
    const section: StrapiDocumentsSection = {
      id: 4,
      __component: "sections.documents",
      title: "Scheme Documents",
      items: [
        {
          id: "doc-1",
          title: "Quarterly Portfolio Disclosure",
          category: "Factsheet",
          fileType: "pdf",
          fileSize: "1.5 MB",
          publishedDate: "2026-10-01",
          fileUrl: "https://example.com/doc.pdf",
        },
      ],
    };

    render(<DynamicSectionRenderer sections={[section]} />);

    expect(screen.getByText("Quarterly Portfolio Disclosure")).toBeInTheDocument();
    expect(screen.getByText("1.5 MB")).toBeInTheDocument();
    const downloadLink = screen.getByLabelText(
      "Download Quarterly Portfolio Disclosure (PDF, 1.5 MB)"
    );
    expect(downloadLink).toHaveAttribute("href", "https://example.com/doc.pdf");
  });

  it("renders accessible FAQ accordion and toggles items on click", async () => {
    const user = userEvent.setup();
    const section: StrapiFaqSection = {
      id: 5,
      __component: "sections.faq",
      title: "Investor Queries",
      items: [
        {
          id: "q-1",
          question: "What is the lock-in duration?",
          answer: "This is an open-ended scheme with no statutory lock-in period.",
        },
      ],
    };

    render(<DynamicSectionRenderer sections={[section]} />);

    const button = screen.getByRole("button", { name: /What is the lock-in duration\?/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("This is an open-ended scheme with no statutory lock-in period.")
    ).not.toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("This is an open-ended scheme with no statutory lock-in period.")
    ).toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("This is an open-ended scheme with no statutory lock-in period.")
    ).not.toBeInTheDocument();
  });

  it("gracefully degrades when encountering an unknown section without crashing", () => {
    const unknownSection: StrapiUnknownSection = {
      id: 99,
      __component: "sections.custom-unsupported-widget",
      customField: 12345,
    };

    expect(() => {
      render(<DynamicSectionRenderer sections={[unknownSection]} />);
    }).not.toThrow();

    expect(
      screen.getByText("Development Notice: Unregistered Strapi Component")
    ).toBeInTheDocument();
  });

  it("allows registration of new dynamic components at runtime", () => {
    function CustomDisclaimerComponent({ section }: SectionRendererProps) {
      return <div data-testid="custom-disclaimer">Custom Risk Disclaimer: {section.id}</div>;
    }

    registerSectionComponent(
      "sections.risk-disclaimer",
      CustomDisclaimerComponent as unknown as React.ComponentType<SectionRendererProps>
    );

    const customSection: StrapiUnknownSection = {
      id: 777,
      __component: "sections.risk-disclaimer",
    };

    render(<DynamicSectionRenderer sections={[customSection]} />);
    expect(screen.getByTestId("custom-disclaimer")).toHaveTextContent("Custom Risk Disclaimer: 777");
  });
});
