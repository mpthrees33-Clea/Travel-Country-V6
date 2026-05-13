"use client";
import { motion, AnimatePresence } from "framer-motion";
import { LAYER_MAP, Pose, Layer } from "./LAYER_MAP";
import type { Loadout } from "@/lib/trip-schema";

function layerKey(loadout: Loadout, layerSlots: string[]): string | null {
  const slot = loadout.slots.find((s) => layerSlots.includes(s.slot));
  if (!slot?.primary) return null;
  return slot.primary.variant;
}

export function Avatar({ loadout, pose }: { loadout: Loadout; pose: Pose }) {
  const layers = LAYER_MAP[pose];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="aspect-[3/5] relative">
        <svg viewBox="0 0 300 500" className="w-full h-full">
          {/* Backdrop */}
          <defs>
            <radialGradient id="bg-spot" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#EEE7D8" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="300" height="500" fill="url(#bg-spot)" />
          <line x1="0" y1="430" x2="300" y2="430" stroke="#D9CFB8" strokeWidth="1.5" />

          {/* Base body — always rendered */}
          <BaseBody pose={pose} />

          {/* Stacked clothing layers */}
          {layers.order.map((slotKey) => {
            const variant = layerKey(loadout, layers.slotMap[slotKey]);
            const render = variant ? layers.variants[slotKey]?.[variant] : null;
            return (
              <AnimatePresence mode="wait" key={slotKey}>
                {render ? (
                  <motion.g
                    key={`${slotKey}-${variant}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {render}
                  </motion.g>
                ) : null}
              </AnimatePresence>
            );
          })}
        </svg>
      </div>
      <p className="eyebrow text-center mt-3">Your loadout</p>
    </div>
  );
}

function BaseBody({ pose }: { pose: Pose }) {
  if (pose === "kayak") {
    return (
      <g>
        {/* Water line */}
        <ellipse cx="150" cy="380" rx="135" ry="14" fill="#cfe7ec" />
        {/* Kayak hull */}
        <ellipse cx="150" cy="370" rx="125" ry="22" fill="#0e7c89" />
        <ellipse cx="150" cy="362" rx="120" ry="16" fill="#0a6b75" />
        {/* Body, seated */}
        <circle cx="150" cy="170" r="38" fill="#e8c9a8" />
        <rect x="120" y="205" width="60" height="120" rx="14" fill="#3a3a3a" />
        {/* Arms */}
        <rect x="92" y="220" width="20" height="80" rx="10" fill="#3a3a3a" transform="rotate(-22 102 260)" />
        <rect x="188" y="220" width="20" height="80" rx="10" fill="#3a3a3a" transform="rotate(22 198 260)" />
        {/* Paddle suggestion handled by layer */}
      </g>
    );
  }
  if (pose === "skis") {
    return (
      <g>
        {/* Snow */}
        <rect x="0" y="430" width="300" height="70" fill="#f4f7fa" />
        {/* Skis */}
        <rect x="105" y="430" width="90" height="6" rx="2" fill="#1a1a1a" />
        <rect x="105" y="442" width="90" height="6" rx="2" fill="#1a1a1a" />
        {/* Legs */}
        <rect x="130" y="350" width="16" height="85" fill="#2a3340" />
        <rect x="154" y="350" width="16" height="85" fill="#2a3340" />
        {/* Torso */}
        <rect x="118" y="240" width="64" height="125" rx="16" fill="#2a3340" />
        {/* Head */}
        <circle cx="150" cy="200" r="34" fill="#e8c9a8" />
        {/* Arms */}
        <rect x="95" y="250" width="20" height="90" rx="10" fill="#2a3340" />
        <rect x="185" y="250" width="20" height="90" rx="10" fill="#2a3340" />
      </g>
    );
  }
  // standing default
  return (
    <g>
      {/* Ground line shadow */}
      <ellipse cx="150" cy="428" rx="55" ry="6" fill="#00000022" />
      {/* Legs */}
      <rect x="128" y="320" width="18" height="105" rx="3" fill="#2f2a26" />
      <rect x="154" y="320" width="18" height="105" rx="3" fill="#2f2a26" />
      {/* Torso */}
      <rect x="116" y="200" width="68" height="135" rx="18" fill="#3a342f" />
      {/* Head */}
      <circle cx="150" cy="158" r="36" fill="#e8c9a8" />
      {/* Neck */}
      <rect x="140" y="186" width="20" height="20" fill="#d4b08c" />
      {/* Arms */}
      <rect x="92" y="208" width="20" height="115" rx="10" fill="#3a342f" />
      <rect x="188" y="208" width="20" height="115" rx="10" fill="#3a342f" />
    </g>
  );
}
