import { Activity, Condition, Duration, Season, TripParams } from "./trip-schema";

const ACTIVITY_HINTS: Array<[Activity, RegExp]> = [
  ["paddle", /\b(kayak\w*|canoe\w*|paddl\w+|sup\b|paddleboard\w*|hobie)\b/i],
  ["climb", /\b(climb\w*|boulder\w*|crag\w*|trad|sport climb)\b/i],
  ["snow", /\b(ski\w*|snowboard\w*|snowshoe\w*|snow\b|alpine|ice climb|glacier)\b/i],
  ["hike-backpack", /\b(hike|hiking|trek\w*|trail|backpack\w*|camp\w*|thru-hike\w*)\b/i]
];

const SEASON_HINTS: Array<[Season, RegExp]> = [
  ["spring", /\b(spring|march|april|may)\b/i],
  ["summer", /\b(summer|june|july|august)\b/i],
  ["fall", /\b(fall|autumn|sept|september|october|november)\b/i],
  ["winter", /\b(winter|december|january|february)\b/i]
];

const DURATION_HINTS: Array<[Duration, RegExp]> = [
  ["week+", /\b(week|7 days|10 days|two weeks|fortnight)\b/i],
  ["3-5d", /\b(3 days|four days|five days|3-5 day|3–5 day|few days|long weekend)\b/i],
  ["weekend", /\b(weekend|two days|2 days|overnight|one night)\b/i],
  ["day", /\b(day hike|day trip|single day|just a day|dawn-to-dusk)\b/i]
];

const CONDITION_HINTS: Array<[Condition, RegExp]> = [
  ["cold", /\b(cold|freezing|frost|sub-zero|below freezing|chilly)\b/i],
  ["wet", /\b(rain|wet|rainy|monsoon|storm|snow)\b/i],
  ["hot", /\b(hot|humid|sweltering|tropical)\b/i],
  ["altitude", /\b(altitude|mountains?|alpine|14er|10,000 ft|elevation|high country)\b/i],
  ["water", /\b(water|river|lake|ocean|gulf|keys|coast|sea)\b/i]
];

export function fallbackParse(freeform: string): Partial<TripParams> {
  const text = freeform ?? "";
  const out: Partial<TripParams> = {};

  for (const [a, re] of ACTIVITY_HINTS) {
    if (re.test(text)) { out.activity = a; break; }
  }
  for (const [s, re] of SEASON_HINTS) {
    if (re.test(text)) { out.season = s; break; }
  }
  for (const [d, re] of DURATION_HINTS) {
    if (re.test(text)) { out.duration = d; break; }
  }
  const conds: Condition[] = [];
  for (const [c, re] of CONDITION_HINTS) {
    if (re.test(text)) conds.push(c);
  }
  if (conds.length > 0) out.conditions = conds;
  if (freeform) out.freeform = freeform;

  return out;
}
