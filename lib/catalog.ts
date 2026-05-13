import products from "@/data/products.json";
import brands from "@/data/brands.json";
import type { Product, GearSlot } from "./trip-schema";

export const CATALOG: Product[] = products as Product[];
export const BRANDS = brands as {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  hero: string;
}[];

export function productsForSlot(slot: GearSlot, activityTags: string[] = []): Product[] {
  const slotMatches = CATALOG.filter((p) => p.slot === slot);
  if (activityTags.length === 0) return slotMatches;
  const scored = slotMatches
    .map((p) => ({
      p,
      score: activityTags.filter((t) => p.tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score);
  return scored.map((s) => s.p);
}

export function productsByBrand(brandSlug: string): Product[] {
  const target = BRANDS.find((b) => b.slug === brandSlug)?.name;
  if (!target) return [];
  return CATALOG.filter((p) => p.brand === target);
}

export function productsByCategory(category: string): Product[] {
  if (category === "clearance") return CATALOG.slice(0, 8);
  return CATALOG.filter((p) => p.category === category);
}

export function productById(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function featuredNew(n = 8): Product[] {
  return [...CATALOG]
    .sort((a, b) => b.price - a.price)
    .slice(0, n);
}
