"use client";
import { useState, useTransition } from "react";
import { Avatar } from "@/components/Avatar/Avatar";
import { GearChecklistItem } from "@/snippets/GearChecklistItem";
import { ProductCard } from "@/snippets/ProductCard";
import {
  Activity,
  Condition,
  Duration,
  Season,
  TripParams,
  Loadout
} from "@/lib/trip-schema";
import {
  matchLoadout,
  poseFor,
  ACTIVITY_LABEL,
  SEASON_LABEL,
  DURATION_LABEL,
  CONDITION_LABEL
} from "@/lib/recommender";

const ACTIVITIES: Activity[] = ["hike-backpack", "climb", "paddle", "snow"];
const SEASONS: Season[] = ["spring", "summer", "fall", "winter"];
const DURATIONS: Duration[] = ["day", "weekend", "3-5d", "week+"];
const CONDITIONS: Condition[] = ["cold", "wet", "hot", "altitude", "water"];

const EXAMPLES = [
  "A week backpacking the Smoky Mountains in late October — two nights at altitude, freezing temps possible.",
  "Five days kayaking the Florida Keys in July, hot and sunny.",
  "Weekend sport climbing at Red Rock, October, cool mornings.",
  "Long weekend skiing in Aspen, mid-February."
];

export function PlanTripClient() {
  const [freeform, setFreeform] = useState("");
  const [activity, setActivity] = useState<Activity | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loadout, setLoadout] = useState<Loadout | null>(null);
  const [source, setSource] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function submit() {
    const overrides: Partial<TripParams> = {};
    if (activity) overrides.activity = activity;
    if (season) overrides.season = season;
    if (duration) overrides.duration = duration;
    if (conditions.length) overrides.conditions = conditions;

    const res = await fetch("/api/plan-trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ freeform, overrides })
    });
    const json = await res.json();
    setSource(json.source);
    startTransition(() => {
      const result = matchLoadout(json.params as TripParams);
      setLoadout(result);
    });
  }

  function toggleCondition(c: Condition) {
    setConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function reset() {
    setLoadout(null);
    setSource("");
  }

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-16 pb-12 max-w-4xl">
        <p className="eyebrow mb-4">Plan Your Trip</p>
        <h1 className="font-serif mb-6">Tell us where you&rsquo;re going. We&rsquo;ll dress you for it.</h1>
        <p className="text-ink-muted text-lg max-w-2xl">
          Describe your trip in plain English. Our outfitters&rsquo; system suggests a head-to-toe loadout from the
          brands we stock — boots up to beanie.
        </p>
      </section>

      {/* Form */}
      {!loadout && (
        <section className="container-page pb-20">
          <div className="bg-surface border border-rule p-6 md:p-10 max-w-4xl">
            <label className="eyebrow block mb-3">Describe the trip</label>
            <textarea
              value={freeform}
              onChange={(e) => setFreeform(e.target.value)}
              rows={4}
              placeholder="e.g. A week backpacking the Smokies in late October..."
              className="w-full bg-bg border border-rule p-4 font-sans text-base resize-none focus:outline-none focus:border-rust"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="eyebrow self-center mr-2">Try:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setFreeform(ex)}
                  className="text-[12px] underline underline-offset-4 text-ink-muted hover:text-rust text-left"
                >
                  {ex.slice(0, 48)}…
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-rule pt-6">
              <p className="eyebrow mb-4">— or refine with —</p>

              <Group label="Activity">
                {ACTIVITIES.map((a) => (
                  <Chip key={a} active={activity === a} onClick={() => setActivity(activity === a ? null : a)}>
                    {ACTIVITY_LABEL[a]}
                  </Chip>
                ))}
              </Group>

              <Group label="Season">
                {SEASONS.map((s) => (
                  <Chip key={s} active={season === s} onClick={() => setSeason(season === s ? null : s)}>
                    {SEASON_LABEL[s]}
                  </Chip>
                ))}
              </Group>

              <Group label="Duration">
                {DURATIONS.map((d) => (
                  <Chip key={d} active={duration === d} onClick={() => setDuration(duration === d ? null : d)}>
                    {DURATION_LABEL[d]}
                  </Chip>
                ))}
              </Group>

              <Group label="Conditions">
                {CONDITIONS.map((c) => (
                  <Chip key={c} active={conditions.includes(c)} onClick={() => toggleCondition(c)}>
                    {CONDITION_LABEL[c]}
                  </Chip>
                ))}
              </Group>
            </div>

            <button onClick={submit} className="btn btn-primary mt-8 px-8 py-4 text-sm" disabled={isPending}>
              {isPending ? "Picking gear…" : "Dress me for it →"}
            </button>
          </div>
        </section>
      )}

      {/* Result */}
      {loadout && (
        <section className="container-page pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <Avatar loadout={loadout} pose={poseFor(loadout.query.activity)} />
                <div className="mt-6 text-center text-[11px] text-ink-muted">
                  {source === "ai"
                    ? "Parsed by Claude · refined with your filters"
                    : source === "fallback"
                    ? "Parsed by keyword fallback · set ANTHROPIC_API_KEY for LLM parsing"
                    : "Built from your filters"}
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow mb-2">Loadout</p>
              <h2 className="font-serif mb-1">
                {loadout.query.destination
                  ? `For ${loadout.query.destination}`
                  : `Your ${ACTIVITY_LABEL[loadout.query.activity]} kit`}
              </h2>
              <p className="text-ink-muted mb-6">
                {loadout.query.season && SEASON_LABEL[loadout.query.season] + " · "}
                {loadout.query.duration && DURATION_LABEL[loadout.query.duration]}
                {loadout.query.conditions && loadout.query.conditions.length > 0
                  ? " · " + loadout.query.conditions.map((c) => CONDITION_LABEL[c]).join(", ")
                  : ""}
              </p>

              <div className="bg-surface border border-rule p-6">
                {loadout.slots.map((s) => (
                  <GearChecklistItem key={s.slot} label={s.label} product={s.primary} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={reset} className="btn btn-ghost text-sm">
                  ← Edit trip
                </button>
                <button onClick={() => window.print()} className="btn btn-ghost text-sm">
                  Print checklist
                </button>
                <button className="btn btn-primary text-sm">Add loadout to cart</button>
              </div>

              <div className="mt-12">
                <p className="eyebrow mb-4">Full picks</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {loadout.slots
                    .filter((s) => s.primary)
                    .map((s) => (
                      <ProductCard key={s.slot} product={s.primary!} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-[12px] uppercase tracking-wider border transition-colors ${
        active
          ? "bg-ink text-bg border-ink"
          : "bg-bg text-ink border-rule hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
