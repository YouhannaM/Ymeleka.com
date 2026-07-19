import React from 'react';

/**
 * Monoline engravings for each life chapter. All strokes inherit
 * `currentColor` so the same artwork works in light and dark rooms.
 */

const svgProps = {
  viewBox: '0 0 200 200',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const PyramidsVignette: React.FC = () => (
  <svg {...svgProps}>
    {/* sun */}
    <circle cx="152" cy="46" r="13" />
    {/* great pyramid */}
    <path d="M58 140 L106 58 L154 140 Z" />
    <path d="M106 58 L122 140" />
    {/* second pyramid */}
    <path d="M22 140 L58 88 L94 140" />
    {/* horizon and dunes */}
    <path d="M14 140 H186" />
    <path d="M26 158 Q60 150 94 158 T162 158" />
    <path d="M44 172 Q84 164 124 172 T188 172" strokeOpacity="0.5" />
  </svg>
);

export const PennStateVignette: React.FC = () => (
  <svg {...svgProps}>
    {/* stadium bowl tiers */}
    <path d="M30 128 Q100 108 170 128" />
    <path d="M24 112 Q100 90 176 112" />
    <path d="M30 128 L24 112 M170 128 L176 112" />
    <path d="M38 96 Q100 78 162 96" strokeOpacity="0.5" />
    {/* field */}
    <path d="M46 142 Q100 132 154 142" />
    <path d="M30 128 Q100 148 170 128" />
    {/* floodlights */}
    <path d="M44 92 V46 M156 92 V46" />
    <path d="M34 46 H54 M146 46 H66" strokeOpacity="0" />
    <path d="M34 46 H54 M146 46 H166" />
    <path d="M36 40 H52 M148 40 H164" />
    {/* pennant */}
    <path d="M100 78 V34 L126 41 L100 48" />
    {/* ground */}
    <path d="M20 160 H180" strokeOpacity="0.5" />
  </svg>
);

export const TeslaVignette: React.FC = () => (
  <svg {...svgProps}>
    {/* factory skyline */}
    <path d="M26 72 V54 L44 40 V54 L62 40 V54 L80 40 V72" />
    <path d="M32 72 V60 M50 72 V60 M68 72 V60" strokeOpacity="0.5" />
    {/* smokestack */}
    <path d="M92 72 V34 H100 V72" />
    {/* bolt */}
    <path d="M156 28 L142 52 H154 L140 76" />
    {/* cybertruck */}
    <path d="M32 132 L46 112 L108 88 L172 116 V134" />
    <path d="M32 132 V140 H44" />
    <path d="M86 140 H120" />
    <path d="M162 140 H172 V134" />
    <path d="M52 116 L104 96 L150 116" strokeOpacity="0.5" />
    <circle cx="65" cy="140" r="13" />
    <circle cx="141" cy="140" r="13" />
    {/* road */}
    <path d="M18 164 H182" strokeOpacity="0.5" />
  </svg>
);

export const CornellVignette: React.FC = () => (
  <svg {...svgProps}>
    {/* McGraw tower */}
    <path d="M86 148 V58 M114 148 V58" />
    <path d="M82 58 L100 26 L118 58 Z" />
    {/* clock */}
    <circle cx="100" cy="78" r="11" />
    <path d="M100 78 V71 M100 78 L106 81" />
    {/* belfry windows */}
    <path d="M93 102 V116 M107 102 V116" />
    <path d="M86 128 H114" strokeOpacity="0.5" />
    {/* pcb traces from the base */}
    <path d="M86 148 H52 V132" />
    <circle cx="52" cy="126" r="4" />
    <path d="M114 148 H148 V128" />
    <circle cx="148" cy="122" r="4" />
    <path d="M92 148 V168 H64" />
    <circle cx="58" cy="168" r="4" />
    <path d="M108 148 V174 H134" />
    <circle cx="140" cy="174" r="4" />
    <path d="M100 148 V186" />
    <circle cx="100" cy="190" r="3" />
  </svg>
);

export const FicioVignette: React.FC = () => (
  <svg {...svgProps}>
    {/* robot base */}
    <path d="M38 152 H82 V140 H38 Z" />
    {/* arm segments */}
    <path d="M60 140 L78 104" />
    <circle cx="80" cy="100" r="6" />
    <path d="M84 96 L116 78" />
    <circle cx="120" cy="76" r="6" />
    {/* gripper */}
    <path d="M126 74 L138 68 M126 80 L140 84" />
    {/* wheat stalk in the gripper */}
    <path d="M146 62 Q150 100 146 148" />
    <path d="M146 74 Q136 70 134 60 M146 74 Q156 70 158 60" />
    <path
      d="M147 92 Q137 88 135 78 M147 92 Q157 88 159 78"
      strokeOpacity="0.5"
    />
    {/* conveyor */}
    <path d="M26 164 H174" />
    <circle cx="46" cy="172" r="5" />
    <circle cx="100" cy="172" r="5" />
    <circle cx="154" cy="172" r="5" />
    {/* apple on the line */}
    <circle cx="106" cy="152" r="10" />
    <path d="M106 142 Q110 134 118 134" />
  </svg>
);
