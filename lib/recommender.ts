import rules from "@/data/gear-rules.json";
import { CATALOG } from "./catalog";
import {
  Activity,
  Condition,
  Duration,
  GearSlot,
  Loadout,
  Product,
  SLOT_LABELS,
  Season,
  TripParams
} from "./trip-schema";

type ActivityRule = {
  label: string;
  pose: string;
  baseSlots: GearSlot[];
  modifiers: Record<string, { add?: GearSlot[]; remove?: GearSlot[]; promote?: GearSlot[] }>;
};

const RULES = rules as Record<Activity, ActivityRule>;

function applyModifier(slots: Set<GearSlot>, mod: ActivityRule["modifiers"][string]) {
  for (const a of mod.add ?? []) slots.add(a);
  for (const r of mod.remove ?? []) slots.delete(r);
}

function modifiersFor(params: TripParams): string[] {
  const out = new Set<string>();
  for (const c of params.conditions ?? []) out.add(c);
  if (params.season) out.add(params.season);
  const duration: Duration | undefined = params.duration;
  if (duration === "3-5d" || duration === "week+") out.add("multiday");
  return [...out];
}

function rankProducts(slot: GearSlot, params: TripParams): Product[] {
  const activityTag = params.activity === "hike-backpack" ? ["hike", "backpack"] :
                      params.activity === "climb" ? ["climb"] :
                      params.activity === "paddle" ? ["paddle"] :
                      ["snow"];
  const conditionTags = params.conditions ?? [];
  const seasonTag = params.season ? [params.season] : [];
  const allTags = [...activityTag, ...conditionTags, ...seasonTag];

  return CATALOG
    .filter((p) => p.slot === slot)
    .map((p) => {
      const score = allTags.filter((t) => p.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
}

export function matchLoadout(params: TripParams): Loadout {
  const rule = RULES[params.activity];
  if (!rule) {
    throw new Error(`No rule for activity ${params.activity}`);
  }

  const slots = new Set<GearSlot>(rule.baseSlots);
  const mods = modifiersFor(params);
  for (const m of mods) {
    const def = rule.modifiers[m];
    if (def) applyModifier(slots, def);
  }

  const ordered = [...rule.baseSlots, ...[...slots].filter((s) => !rule.baseSlots.includes(s))];
  const unique = Array.from(new Set(ordered)).filter((s) => slots.has(s));

  return {
    query: params,
    slots: unique.map((slot) => {
      const ranked = rankProducts(slot, params);
      return {
        slot,
        label: SLOT_LABELS[slot],
        primary: ranked[0] ?? null,
        alternatives: ranked.slice(1, 4)
      };
    })
  };
}

export function poseFor(activity: Activity): "standing" | "kayak" | "skis" {
  return (RULES[activity]?.pose ?? "standing") as "standing" | "kayak" | "skis";
}

export const ACTIVITY_LABEL: Record<Activity, string> = {
  "hike-backpack": "Hike · Camp · Backpack",
  climb: "Climb",
  paddle: "Paddle",
  snow: "Snow & Cold"
};

export const SEASON_LABEL: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
  winter: "Winter"
};

export const DURATION_LABEL: Record<Duration, string> = {
  day: "Day trip",
  weekend: "Weekend",
  "3-5d": "3–5 days",
  "week+": "A week or more"
};

export const CONDITION_LABEL: Record<Condition, string> = {
  cold: "Cold",
  wet: "Wet",
  hot: "Hot",
  altitude: "Altitude",
  water: "On the water"
};
