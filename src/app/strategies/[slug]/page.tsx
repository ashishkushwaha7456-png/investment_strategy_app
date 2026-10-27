import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStrategyBySlug, getAllStrategySlugs } from "@/lib/api/strapi";
import { generateStrategyJsonLd } from "@/lib/seo/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StrategyHero } from "@/components/strategy/StrategyHero";
import { DynamicSectionRenderer } from "@/components/sections/DynamicSectionRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllStrategySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy) {
    return {
      title: "Strategy Not Found | AuraWealth",
      description: "The requested investment strategy could not be located.",
    };
  }

  const seo = strategy.seo;
  const title =
    seo?.metaTitle ||
    `${strategy.name} - Investment Strategy & Analysis | AuraWealth`;
  const description =
    seo?.metaDescription ||
    `${strategy.description.slice(0, 155)}... Latest NAV ₹${strategy.nav.toFixed(2)}.`;
  const canonical =
    seo?.canonicalUrl ||
    `https://investment.example.com/strategies/${strategy.slug}`;

  const ogImages = seo?.ogImage?.url
    ? [
        {
          url: seo.ogImage.url,
          width: seo.ogImage.width || 1200,
          height: seo.ogImage.height || 630,
          alt: seo.ogImage.alternativeText || strategy.name,
        },
      ]
    : [
        {
          url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "AuraWealth Institutional Investment Strategies",
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: seo?.robots || "index, follow",
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: canonical,
      siteName: "AuraWealth Asset Management",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: ogImages.map((img) => img.url),
    },
  };
}

export default async function StrategyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy) {
    notFound();
  }

  const jsonLd = generateStrategyJsonLd(strategy);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-slate-50/50 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Strategies", href: "/" },
              { label: strategy.name },
            ]}
          />
        </div>

        <StrategyHero strategy={strategy} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <DynamicSectionRenderer sections={strategy.sections} />
        </div>
      </main>
    </>
  );
}
