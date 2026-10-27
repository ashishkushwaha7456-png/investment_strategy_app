import { NextRequest, NextResponse } from "next/server";
import { getStrategyBySlug } from "@/lib/api/strapi";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy) {
    return NextResponse.json(
      { error: "Strategy not found", slug },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: strategy });
}
