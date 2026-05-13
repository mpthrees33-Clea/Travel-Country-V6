# Travel Country MVP

A demo rebuild of [travelcountry.com](https://travelcountry.com) — a Central Florida outdoor outfitter — built around a headline "Plan Your Trip" feature that returns a head-to-toe gear loadout with a layered SVG avatar.

> Visual direction: editorial premium (Huckberry / Filson feel) — cream palette, serif headlines.

## Run it

```bash
cd /home/cleaserver/projects/travelcountry-mvp
npm install        # already done on this machine
npm run dev        # http://localhost:3000
```

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Anthropic SDK for freeform trip parsing (falls back to keyword parser when `ANTHROPIC_API_KEY` is unset)
- Zod for trip-param schema
- Framer Motion for avatar layer cross-fades
- All product data hand-curated in `data/products.json` (real TC brands + gear-slot tagging)

## Folder layout (Shopify-style)

```
app/                # Templates (Shopify parity)
sections/           # Composable page sections
snippets/           # Small reusable bits (cards, list items)
components/Avatar/  # Layered SVG avatar (Avatar.tsx + LAYER_MAP.tsx)
lib/                # recommender, trip-schema, prompts, catalog helpers
data/               # products.json · brands.json · gear-rules.json
scripts/scrape-tc.ts# Stub scraper (cheerio + fetch); run when you want to expand the catalog
```

## The headline feature

`/plan-trip` is the centerpiece. Flow:

1. User types a freeform trip description ("a week backpacking the Smokies in late October") **or** picks chips (activity, season, duration, conditions).
2. `POST /api/plan-trip` parses the freeform input with Claude (or keyword fallback) into structured `TripParams`.
3. UI overrides win → handed to `matchLoadout()` in `lib/recommender.ts`.
4. Recommender resolves gear slots via `data/gear-rules.json` (base slots + modifiers like `cold`, `multiday`, `wet`).
5. Each slot gets ranked products from `data/products.json`.
6. Avatar swaps its layers (boots, pants, jacket, shell, pack, hat, accessories) with a soft cross-fade.

## Adding an Anthropic API key (optional)

```bash
cp .env.example .env.local
# add ANTHROPIC_API_KEY=sk-ant-...
```

Without a key, the freeform parser still works via `lib/fallback-parser.ts` — it covers the demo well enough that you can ship without the LLM.

## Talking points for the demo

- **Differentiator:** the trip planner is the wow moment — nothing on travelcountry.com today does this.
- **Local angle preserved:** Hobie / BGE / Central FL delivery messaging is front-and-center on home, store, and footer.
- **Shopify migration path:** sections/snippets/templates mirror Shopify Online Store 2.0 — when it's time, this maps to a real theme.
- **What's intentionally NOT here:** real payments/checkout, account, search, reviews. They're the next layer once dad is bought in on the direction.

## Verification

1. Run `npm run dev` and walk `/` → `/plan-trip`.
2. Type *"Five days kayaking the Florida Keys in July"* → submit → confirm the avatar shows the kayak pose with PFD, sun hat, paddle, and real TC brands (Hobie, NRS, Werner) in the gear list.
3. Try *"Weekend in Aspen skiing in February"* → snow pose, parka, snow pants, gloves, beanie.
4. Visit `/brands/patagonia`, `/collections/footwear`, `/store`, `/about`, `/contact` — all should render.
