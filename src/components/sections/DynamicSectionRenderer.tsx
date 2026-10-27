import React from "react";
import {
  StrapiSection,
  StrapiUnknownSection,
} from "@/types/strapi";
import { TextContentSection } from "./TextContentSection";
import { PerformanceSection } from "./PerformanceSection";
import { HoldingsSection } from "./HoldingsSection";
import { DocumentsSection } from "./DocumentsSection";
import { FaqSection } from "./FaqSection";
import { UnknownSectionFallback } from "./UnknownSectionFallback";

export interface SectionRendererProps {
  section: StrapiSection;
}

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

export function registerSectionComponent(
  componentName: string,
  component: React.ComponentType<SectionRendererProps>
): void {
  sectionComponentMap[componentName] = component;
}

interface DynamicSectionRendererProps {
  sections: StrapiSection[];
}

export function DynamicSectionRenderer({ sections }: DynamicSectionRendererProps) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const Component = sectionComponentMap[section.__component];
        const key = `${section.__component}-${section.id ?? index}`;

        if (!Component) {
          return (
            <UnknownSectionFallback
              key={key}
              section={section as StrapiUnknownSection}
            />
          );
        }

        return <Component key={key} section={section} />;
      })}
    </div>
  );
}
