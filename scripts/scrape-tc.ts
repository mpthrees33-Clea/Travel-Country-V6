/**
 * Catalog scraper for travelcountry.com.
 *
 * This is a stub that walks the sitemap, fetches product pages, and writes
 * to data/products.json. The MVP ships with a hand-curated catalog so we can
 * demo immediately; run this later to expand to the full inventory.
 *
 * Usage: npx tsx scripts/scrape-tc.ts
 */
import * as cheerio from "cheerio";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = "https://travelcountry.com";
const SLEEP_MS = 1100;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchSitemap() {
  const res = await fetch(`${ROOT}/sitemap.xml`, {
    headers: { "User-Agent": "TravelCountryMVP/0.1 (research demo)" }
  });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  return $("loc")
    .map((_, el) => $(el).text())
    .get()
    .filter((u) => u.includes("/product/") || u.includes("/p/"));
}

async function fetchProduct(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "TravelCountryMVP/0.1 (research demo)" }
  });
  if (!res.ok) return null;
  const html = await res.text();
  const $ = cheerio.load(html);
  return {
    url,
    name: $("h1").first().text().trim() || $('meta[property="og:title"]').attr("content") || "",
    brand: $('[itemprop="brand"]').first().text().trim(),
    price: $('[itemprop="price"]').first().attr("content") || $(".price").first().text().trim(),
    image: $('meta[property="og:image"]').attr("content") || $("img.product").first().attr("src"),
    description: $('meta[name="description"]').attr("content") || ""
  };
}

async function main() {
  console.log("Fetching sitemap…");
  const urls = await fetchSitemap();
  console.log(`Found ${urls.length} product URLs.`);

  const outDir = path.resolve("data");
  if (!existsSync(outDir)) await mkdir(outDir);

  const out: any[] = [];
  for (const url of urls.slice(0, 200)) {
    const p = await fetchProduct(url);
    if (p && p.name) {
      out.push(p);
      console.log(`  ✓ ${p.name}`);
    }
    await sleep(SLEEP_MS);
  }

  await writeFile(
    path.join(outDir, "products.scraped.json"),
    JSON.stringify(out, null, 2)
  );
  console.log(`\nWrote ${out.length} products to data/products.scraped.json`);
  console.log("Next: tag each with `slot` and `tags` and merge into products.json.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
