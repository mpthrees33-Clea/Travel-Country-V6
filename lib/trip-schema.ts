import { z } from "zod";

export const Activity = z.enum(["hike-backpack", "climb", "paddle", "snow"]);
export type Activity = z.infer<typeof Activity>;

export const Season = z.enum(["spring", "summer", "fall", "winter"]);
export type Season = z.infer<typeof Season>;

export const Duration = z.enum(["day", "weekend", "3-5d", "week+"]);
export type Duration = z.infer<typeof Duration>;

export const Condition = z.enum([
  "cold",
  "wet",
  "hot",
  "altitude",
  "water"
]);
export type Condition = z.infer<typeof Condition>;

export const TripParams = z.object({
  activity: Activity,
  season: Season.optional(),
  duration: Duration.optional(),
  conditions: z.array(Condition).default([]),
  destination: z.string().optional(),
  freeform: z.string().optional()
});
export type TripParams = z.infer<typeof TripParams>;

export type GearSlot =
  | "boots"
  | "pack"
  | "pants"
  | "baselayer"
  | "midlayer"
  | "shell"
  | "insulation"
  | "parka"
  | "headwear"
  | "gloves"
  | "sunglasses"
  | "headlamp"
  | "tent"
  | "sleeping-bag"
  | "sleeping-pad"
  | "stove"
  | "climbing-shoes"
  | "harness"
  | "helmet-climbing"
  | "chalk-bag"
  | "rope"
  | "kayak"
  | "paddle"
  | "pfd"
  | "snow-pants"
  | "hydration"
  | "cooking";

export interface Loadout {
  query: TripParams;
  slots: {
    slot: GearSlot;
    label: string;
    primary: Product | null;
    alternatives: Product[];
  }[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  slot: GearSlot;
  variant: string;
  tags: string[];
  image: string;
  description: string;
}

export const SLOT_LABELS: Record<GearSlot, string> = {
  boots: "Footwear",
  pack: "Pack",
  pants: "Pants",
  baselayer: "Base layer",
  midlayer: "Mid layer",
  shell: "Shell jacket",
  insulation: "Insulation",
  parka: "Parka",
  headwear: "Headwear",
  gloves: "Gloves",
  sunglasses: "Sunglasses",
  headlamp: "Headlamp",
  tent: "Shelter",
  "sleeping-bag": "Sleeping bag",
  "sleeping-pad": "Sleeping pad",
  stove: "Stove",
  "climbing-shoes": "Climbing shoes",
  harness: "Harness",
  "helmet-climbing": "Helmet",
  "chalk-bag": "Chalk bag",
  rope: "Rope",
  kayak: "Kayak",
  paddle: "Paddle",
  pfd: "PFD",
  "snow-pants": "Snow pants",
  hydration: "Hydration",
  cooking: "Cooking"
};
