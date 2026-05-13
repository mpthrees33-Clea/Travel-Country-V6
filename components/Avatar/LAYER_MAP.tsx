import * as React from "react";

export type Pose = "standing" | "kayak" | "skis";
export type Layer = React.ReactNode;

type PoseLayers = {
  order: string[];
  slotMap: Record<string, string[]>;
  variants: Record<string, Record<string, Layer>>;
};

const standing: PoseLayers = {
  order: ["pants", "midlayer", "shell", "insulation", "boots", "pack", "headwear", "accessory"],
  slotMap: {
    pants: ["pants"],
    midlayer: ["baselayer", "midlayer"],
    shell: ["shell"],
    insulation: ["insulation", "parka"],
    boots: ["boots", "climbing-shoes"],
    pack: ["pack"],
    headwear: ["headwear", "helmet-climbing"],
    accessory: ["sunglasses", "harness", "chalk-bag", "rope", "headlamp"]
  },
  variants: {
    pants: {
      "pants-hiking": (
        <g key="ph">
          <rect x="128" y="318" width="18" height="108" fill="#7d6a52" />
          <rect x="154" y="318" width="18" height="108" fill="#7d6a52" />
          <rect x="124" y="316" width="50" height="8" fill="#5d4f3d" />
        </g>
      ),
      "pants-snow": (
        <g key="ps">
          <rect x="124" y="316" width="22" height="115" rx="2" fill="#1b3346" />
          <rect x="154" y="316" width="22" height="115" rx="2" fill="#1b3346" />
        </g>
      )
    },
    midlayer: {
      "baselayer-merino": (
        <g key="bm">
          <rect x="118" y="198" width="64" height="120" rx="14" fill="#404241" />
        </g>
      ),
      "midlayer-fleece": (
        <g key="mf">
          <rect x="116" y="196" width="68" height="125" rx="16" fill="#586f5a" />
          <rect x="120" y="220" width="60" height="3" fill="#43544b" />
          <rect x="120" y="250" width="60" height="3" fill="#43544b" />
        </g>
      )
    },
    shell: {
      "shell-hooded": (
        <g key="sh">
          <rect x="112" y="196" width="76" height="142" rx="18" fill="#b85c38" />
          <path d="M132 180 Q150 168 168 180 L168 200 L132 200 Z" fill="#b85c38" />
          <rect x="148" y="240" width="4" height="80" fill="#7d3a20" />
        </g>
      ),
      "shell-technical": (
        <g key="st">
          <rect x="112" y="196" width="76" height="142" rx="18" fill="#3a4b3f" />
          <path d="M132 180 Q150 168 168 180 L168 200 L132 200 Z" fill="#3a4b3f" />
          <rect x="148" y="240" width="4" height="80" fill="#26342a" />
        </g>
      ),
      "shell-light": (
        <g key="sl">
          <rect x="114" y="200" width="72" height="125" rx="14" fill="#d6c47b" opacity="0.92" />
          <rect x="148" y="220" width="4" height="100" fill="#bba657" />
        </g>
      )
    },
    insulation: {
      "insulation-puffy": (
        <g key="ip">
          <rect x="110" y="198" width="80" height="140" rx="20" fill="#1f3b46" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="110" y={210 + i * 30} width="80" height="2" fill="#0e2530" />
          ))}
        </g>
      ),
      "insulation-parka": (
        <g key="ipa">
          <rect x="106" y="198" width="88" height="170" rx="22" fill="#2a3340" />
          <path d="M128 180 Q150 162 172 180 L172 210 L128 210 Z" fill="#5b4a3c" />
        </g>
      )
    },
    boots: {
      "boots-low": (
        <g key="bl">
          <rect x="124" y="418" width="26" height="14" rx="3" fill="#2b1f15" />
          <rect x="150" y="418" width="26" height="14" rx="3" fill="#2b1f15" />
        </g>
      ),
      "boots-mid": (
        <g key="bm">
          <rect x="122" y="400" width="28" height="32" rx="4" fill="#3a2a1a" />
          <rect x="150" y="400" width="28" height="32" rx="4" fill="#3a2a1a" />
        </g>
      ),
      "boots-sandal": (
        <g key="bs">
          <rect x="124" y="424" width="26" height="6" rx="3" fill="#4d2d18" />
          <rect x="150" y="424" width="26" height="6" rx="3" fill="#4d2d18" />
          <line x1="135" y1="418" x2="135" y2="424" stroke="#4d2d18" strokeWidth="2" />
          <line x1="161" y1="418" x2="161" y2="424" stroke="#4d2d18" strokeWidth="2" />
        </g>
      ),
      "boots-climbing": (
        <g key="bc">
          <path d="M122 415 L150 415 L156 430 L116 430 Z" fill="#3a1f1f" />
          <path d="M150 415 L178 415 L184 430 L144 430 Z" fill="#3a1f1f" />
        </g>
      )
    },
    pack: {
      "pack-large": (
        <g key="pl">
          <rect x="98" y="210" width="22" height="120" rx="5" fill="#506b5c" />
          <rect x="180" y="210" width="22" height="120" rx="5" fill="#506b5c" />
          <rect x="100" y="222" width="100" height="100" rx="10" fill="#3f5447" opacity="0.92" />
          <rect x="120" y="240" width="60" height="6" fill="#314237" />
        </g>
      ),
      "pack-day": (
        <g key="pd">
          <rect x="105" y="220" width="14" height="90" rx="4" fill="#2e3d35" />
          <rect x="181" y="220" width="14" height="90" rx="4" fill="#2e3d35" />
          <rect x="108" y="225" width="84" height="80" rx="8" fill="#445e51" opacity="0.92" />
        </g>
      )
    },
    headwear: {
      "headwear-sunhat": (
        <g key="hs">
          <ellipse cx="150" cy="138" rx="46" ry="8" fill="#a48a5c" />
          <path d="M126 138 Q150 110 174 138 Z" fill="#bfa376" />
        </g>
      ),
      "headwear-buff": (
        <g key="hb">
          <rect x="118" y="145" width="64" height="22" rx="6" fill="#3a4b3f" />
        </g>
      ),
      "headwear-beanie": (
        <g key="hbe">
          <path d="M120 142 Q150 110 180 142 L180 152 L120 152 Z" fill="#7d2c2c" />
          <rect x="118" y="146" width="64" height="10" fill="#a83b3b" />
        </g>
      ),
      "headwear-helmet": (
        <g key="hh">
          <path d="M118 152 Q150 116 182 152 Z" fill="#dcdcd0" />
          <rect x="118" y="148" width="64" height="6" fill="#bdbdb0" />
        </g>
      )
    },
    accessory: {
      "accessory-sunglasses": (
        <g key="as">
          <rect x="128" y="156" width="18" height="10" rx="4" fill="#1a1a1a" />
          <rect x="154" y="156" width="18" height="10" rx="4" fill="#1a1a1a" />
          <line x1="146" y1="161" x2="154" y2="161" stroke="#1a1a1a" strokeWidth="1" />
        </g>
      ),
      "accessory-harness": (
        <g key="ah">
          <rect x="116" y="288" width="68" height="10" fill="#b85c38" />
          <rect x="132" y="288" width="6" height="20" fill="#b85c38" />
          <rect x="162" y="288" width="6" height="20" fill="#b85c38" />
        </g>
      ),
      "accessory-chalkbag": (
        <g key="ac">
          <ellipse cx="116" cy="320" rx="8" ry="11" fill="#9e9e8d" />
        </g>
      ),
      "accessory-rope": (
        <g key="ar">
          <ellipse cx="150" cy="320" rx="42" ry="10" fill="none" stroke="#d77a52" strokeWidth="6" />
        </g>
      ),
      "accessory-headlamp": (
        <g key="ahl">
          <rect x="130" y="138" width="40" height="6" rx="2" fill="#1a1a1a" />
          <rect x="142" y="140" width="16" height="6" rx="1" fill="#f8e08e" />
        </g>
      )
    }
  }
};

const kayak: PoseLayers = {
  order: ["pfd", "headwear", "accessory", "paddle"],
  slotMap: {
    pfd: ["pfd"],
    headwear: ["headwear"],
    accessory: ["sunglasses"],
    paddle: ["paddle"]
  },
  variants: {
    pfd: {
      "torso-pfd": (
        <g key="tp">
          <rect x="116" y="208" width="68" height="100" rx="10" fill="#b85c38" />
          <rect x="128" y="240" width="44" height="6" fill="#7d3a20" />
          <rect x="128" y="260" width="44" height="6" fill="#7d3a20" />
        </g>
      )
    },
    headwear: {
      "headwear-sunhat": (
        <g key="hsk">
          <ellipse cx="150" cy="148" rx="48" ry="8" fill="#a48a5c" />
          <path d="M124 148 Q150 116 176 148 Z" fill="#bfa376" />
        </g>
      ),
      "headwear-buff": (
        <g key="hbk">
          <rect x="118" y="156" width="64" height="22" rx="6" fill="#3a4b3f" />
        </g>
      )
    },
    accessory: {
      "accessory-sunglasses": (
        <g key="ask">
          <rect x="128" y="166" width="18" height="10" rx="4" fill="#1a1a1a" />
          <rect x="154" y="166" width="18" height="10" rx="4" fill="#1a1a1a" />
        </g>
      )
    },
    paddle: {
      "accessory-paddle": (
        <g key="ap">
          <rect x="60" y="240" width="180" height="6" rx="3" fill="#9a7244" transform="rotate(-15 150 243)" />
          <ellipse cx="62" cy="232" rx="22" ry="10" fill="#37536b" transform="rotate(-15 62 232)" />
          <ellipse cx="238" cy="278" rx="22" ry="10" fill="#37536b" transform="rotate(-15 238 278)" />
        </g>
      )
    }
  }
};

const skis: PoseLayers = {
  order: ["snowpants", "insulation", "shell", "boots", "headwear", "gloves", "accessory"],
  slotMap: {
    snowpants: ["snow-pants", "pants"],
    insulation: ["insulation", "parka"],
    shell: ["shell"],
    boots: ["boots"],
    headwear: ["headwear"],
    gloves: ["gloves"],
    accessory: ["sunglasses"]
  },
  variants: {
    snowpants: {
      "pants-snow": (
        <g key="sps">
          <rect x="128" y="346" width="18" height="92" rx="3" fill="#1b3346" />
          <rect x="154" y="346" width="18" height="92" rx="3" fill="#1b3346" />
        </g>
      ),
      "pants-hiking": (
        <g key="phs">
          <rect x="128" y="346" width="18" height="92" rx="3" fill="#7d6a52" />
          <rect x="154" y="346" width="18" height="92" rx="3" fill="#7d6a52" />
        </g>
      )
    },
    insulation: {
      "insulation-puffy": (
        <g key="ips">
          <rect x="112" y="236" width="76" height="135" rx="18" fill="#1f3b46" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="112" y={246 + i * 28} width="76" height="2" fill="#0e2530" />
          ))}
        </g>
      ),
      "insulation-parka": (
        <g key="ipas">
          <rect x="108" y="236" width="84" height="160" rx="22" fill="#2a3340" />
          <path d="M124 218 Q150 200 176 218 L176 245 L124 245 Z" fill="#5b4a3c" />
        </g>
      )
    },
    shell: {
      "shell-hooded": (
        <g key="shs">
          <rect x="112" y="236" width="76" height="135" rx="18" fill="#b85c38" />
          <path d="M128 218 Q150 200 172 218 L172 245 L128 245 Z" fill="#b85c38" />
        </g>
      ),
      "shell-technical": (
        <g key="sts">
          <rect x="112" y="236" width="76" height="135" rx="18" fill="#3a4b3f" />
          <path d="M128 218 Q150 200 172 218 L172 245 L128 245 Z" fill="#3a4b3f" />
        </g>
      )
    },
    boots: {
      "boots-mid": (
        <g key="bms">
          <rect x="120" y="430" width="30" height="14" rx="2" fill="#3a2a1a" />
          <rect x="150" y="430" width="30" height="14" rx="2" fill="#3a2a1a" />
        </g>
      ),
      "boots-low": (
        <g key="bls">
          <rect x="120" y="432" width="30" height="10" rx="2" fill="#2b1f15" />
          <rect x="150" y="432" width="30" height="10" rx="2" fill="#2b1f15" />
        </g>
      )
    },
    headwear: {
      "headwear-beanie": (
        <g key="hbes">
          <path d="M118 190 Q150 158 182 190 L182 200 L118 200 Z" fill="#7d2c2c" />
          <rect x="118" y="194" width="64" height="10" fill="#a83b3b" />
        </g>
      ),
      "headwear-helmet": (
        <g key="hhs">
          <path d="M118 200 Q150 164 182 200 Z" fill="#dcdcd0" />
        </g>
      ),
      "headwear-buff": (
        <g key="hbs">
          <rect x="118" y="194" width="64" height="22" rx="6" fill="#3a4b3f" />
        </g>
      ),
      "headwear-sunhat": (
        <g key="hss">
          <ellipse cx="150" cy="190" rx="46" ry="8" fill="#a48a5c" />
          <path d="M126 190 Q150 162 174 190 Z" fill="#bfa376" />
        </g>
      )
    },
    gloves: {
      "accessory-gloves": (
        <g key="ags">
          <rect x="89" y="328" width="22" height="20" rx="4" fill="#2a2a2a" />
          <rect x="189" y="328" width="22" height="20" rx="4" fill="#2a2a2a" />
        </g>
      )
    },
    accessory: {
      "accessory-sunglasses": (
        <g key="ass">
          <rect x="128" y="200" width="18" height="10" rx="4" fill="#1a1a1a" />
          <rect x="154" y="200" width="18" height="10" rx="4" fill="#1a1a1a" />
        </g>
      )
    }
  }
};

export const LAYER_MAP: Record<Pose, PoseLayers> = {
  standing,
  kayak,
  skis
};
