import { describe, it, expect } from "vitest";
import {
  getStrategyBySlug,
  getAllStrategies,
  getAllStrategySlugs,
} from "@/lib/api/strapi";
import { generateStrategyJsonLd } from "@/lib/seo/schema";

describe("Strapi API Layer and SEO Schema", () => {
  it("retrieves a valid strategy by existing slug", async () => {
    const strategy = await getStrategyBySlug("kotak-equity-opportunities");
    expect(strategy).not.toBeNull();
    expect(strategy?.slug).toBe("kotak-equity-opportunities");
    expect(strategy?.name).toBe("Kotak Equity Opportunities Fund");
    expect(strategy?.nav).toBeGreaterThan(0);
    expect(strategy?.sections.length).toBeGreaterThan(0);
  });

  it("returns null for non-existent strategy slug", async () => {
    const strategy = await getStrategyBySlug("non-existent-fund-slug");
    expect(strategy).toBeNull();
  });

  it("retrieves all strategies with their slugs", async () => {
    const strategies = await getAllStrategies();
    expect(strategies.length).toBeGreaterThanOrEqual(3);

    const slugs = await getAllStrategySlugs();
    expect(slugs).toContain("kotak-equity-opportunities");
    expect(slugs).toContain("hdfc-balanced-advantage");
    expect(slugs).toContain("axis-bluechip-fund");
  });

  it("generates correct JSON-LD structured data graph", async () => {
    const strategy = await getStrategyBySlug("kotak-equity-opportunities");
    expect(strategy).not.toBeNull();

    if (strategy) {
      const jsonLd = generateStrategyJsonLd(strategy);
      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(Array.isArray(jsonLd["@graph"])).toBe(true);

      const breadcrumb = jsonLd["@graph"].find(
        (item) => item["@type"] === "BreadcrumbList"
      );
      expect(breadcrumb).toBeDefined();

      const product = jsonLd["@graph"].find(
        (item) => item["@type"] === "FinancialProduct"
      );
      expect(product).toBeDefined();
      expect(product?.name).toBe(strategy.name);

      const faq = jsonLd["@graph"].find((item) => item["@type"] === "FAQPage");
      expect(faq).toBeDefined();
    }
  });

  it("omits FAQPage in JSON-LD when strategy has no FAQ section", async () => {
    const strategy = await getStrategyBySlug("axis-bluechip-fund");
    expect(strategy).not.toBeNull();

    if (strategy) {
      const jsonLd = generateStrategyJsonLd(strategy);
      const faq = jsonLd["@graph"].find((item) => item["@type"] === "FAQPage");
      expect(faq).toBeUndefined();
    }
  });
});
