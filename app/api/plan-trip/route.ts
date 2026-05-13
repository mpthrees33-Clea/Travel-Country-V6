import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, userPromptFor } from "@/lib/prompts/plan-trip";
import { fallbackParse } from "@/lib/fallback-parser";
import { TripParams, Activity } from "@/lib/trip-schema";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-4-5-20250929";

async function parseWithClaude(freeform: string): Promise<Partial<TripParams> | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" }
        }
      ] as any,
      messages: [
        { role: "user", content: userPromptFor(freeform) }
      ]
    });
    const block = res.content[0];
    if (block.type !== "text") return null;
    const text = block.text.trim();
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (e) {
    console.error("Claude parse failed:", e);
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const freeform: string = body.freeform ?? "";
  const overrides: Partial<TripParams> = body.overrides ?? {};

  let parsed: Partial<TripParams> | null = null;
  if (freeform.trim().length > 0) {
    parsed = await parseWithClaude(freeform);
    if (!parsed) parsed = fallbackParse(freeform);
  }

  // Compose: overrides from UI win.
  const merged: Partial<TripParams> = {
    ...(parsed ?? {}),
    ...overrides,
    conditions: dedupe([...(parsed?.conditions ?? []), ...(overrides.conditions ?? [])])
  };

  if (!merged.activity) {
    merged.activity = "hike-backpack" as Activity;
  }
  if (freeform) merged.freeform = freeform;

  return NextResponse.json({
    params: merged,
    source: parsed && process.env.ANTHROPIC_API_KEY ? "ai" : freeform ? "fallback" : "filters"
  });
}

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
