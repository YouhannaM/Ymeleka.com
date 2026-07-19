import React from 'react';

/**
 * Renaissance-engraving vignettes for each life chapter, drawn in the
 * manner of copperplate etchings: fine hatching for shade, scrolled
 * clouds, and radiant suns. All strokes inherit `currentColor` so the
 * same artwork works in light and dark rooms.
 */

const svgProps = {
  viewBox: '0 0 200 200',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  role: 'img',
};

export const PyramidsVignette: React.FC = () => (
  <svg {...svgProps} aria-label="Engraving of the pyramids of Giza in Egypt">
    <title>
      Engraving of the pyramids of Giza in Egypt, with a radiant sun, clouds,
      and a palm tree by the Nile
    </title>
    {/* radiant sun */}
    <circle cx="150" cy="44" r="11" />
    <g strokeWidth={1.2}>
      <path d="M165 44 L172 44" />
      <path d="M161 33 L166 28" />
      <path d="M150 29 L150 22" />
      <path d="M139 33 L134 28" />
      <path d="M135 44 L128 44" />
      <path d="M161 55 L165 59" />
      <path d="M139 55 L135 59" />
    </g>
    {/* scrolled cloud */}
    <g strokeWidth={1.4}>
      <path d="M32 50 Q34 40 44 42 Q46 34 56 36 Q64 32 66 40 Q76 40 72 50" />
      <path d="M32 50 H72" />
      <path d="M44 46 Q48 42 52 46" opacity={0.5} />
    </g>
    {/* great pyramid with shaded face */}
    <path d="M56 142 L104 60 L152 142 Z" />
    <path d="M104 60 L120 142" strokeWidth={1.4} />
    <g strokeWidth={1} opacity={0.5}>
      <path d="M111 90 H121" />
      <path d="M114 105 H129" />
      <path d="M117 120 H138" />
      <path d="M119 133 H146" />
    </g>
    {/* second pyramid */}
    <path d="M28 142 L64 92 L100 142" />
    <path d="M64 92 L74 142" strokeWidth={1.4} />
    <g strokeWidth={1} opacity={0.5}>
      <path d="M69 118 H78" />
      <path d="M71 130 H84" />
    </g>
    {/* palm by the Nile */}
    <g strokeWidth={1.4}>
      <path d="M168 142 Q166 122 172 108" />
      <path d="M172 108 Q162 100 154 102" />
      <path d="M172 108 Q166 96 160 90" />
      <path d="M172 108 Q174 94 174 86" />
      <path d="M172 108 Q180 96 186 92" />
      <path d="M172 108 Q182 102 190 106" />
    </g>
    {/* ground and river */}
    <path d="M16 142 H184" />
    <g strokeWidth={1} opacity={0.5}>
      <path d="M22 152 H60" />
      <path d="M72 152 H130" />
      <path d="M142 152 H178" />
      <path d="M34 160 H74" />
      <path d="M96 160 H150" />
    </g>
    <g strokeWidth={1.4}>
      <path d="M28 172 Q36 168 44 172 T60 172 T76 172" />
      <path d="M104 174 Q112 170 120 174 T136 174 T152 174" />
    </g>
  </svg>
);

export const PennStateVignette: React.FC = () => (
  <svg
    {...svgProps}
    aria-label="Engraving of the Nittany Lion shrine before Beaver Stadium at Penn State"
  >
    <title>
      Engraving of the Nittany Lion shrine crouching on its pedestal before
      Beaver Stadium and its floodlights at Penn State
    </title>
    {/* Beaver Stadium bowl behind */}
    <g strokeWidth={1.6}>
      <path d="M26 78 Q100 54 174 78" />
      <path d="M32 92 Q100 70 168 92" />
      <path d="M26 78 L32 92" />
      <path d="M174 78 L168 92" />
    </g>
    <g strokeWidth={1} opacity={0.5}>
      <path d="M70 69 V86" />
      <path d="M100 65 V81" />
      <path d="M130 69 V86" />
    </g>
    {/* floodlights */}
    <g strokeWidth={1.4}>
      <path d="M44 74 V38" />
      <path d="M156 74 V38" />
      <path d="M36 38 H52" />
      <path d="M148 38 H164" />
      <path d="M38 34 V38 M44 34 V38 M50 34 V38" />
      <path d="M150 34 V38 M156 34 V38 M162 34 V38" />
    </g>
    {/* the Nittany Lion, crouching low with head raised */}
    <g strokeWidth={1.8}>
      {/* wedge muzzle and brow */}
      <path d="M74 88 L62 96 L58 102 L62 106" />
      {/* jaw and throat */}
      <path d="M62 106 L72 110 L80 108" />
      {/* two pointed ears */}
      <path d="M74 88 L77 80 L83 87" />
      <path d="M83 87 L88 82 L92 89" />
      {/* back of head to neck */}
      <path d="M92 89 L98 94" />
      {/* eye */}
      <path d="M68 97 L72 97" strokeWidth={1.2} />
      {/* long flat back to the rump */}
      <path d="M98 94 L126 97 L138 101 Q148 106 150 116 L150 130 Q149 142 140 149" />
      {/* chest */}
      <path d="M80 108 Q84 116 82 126 L78 134" />
      {/* front legs on the pedestal */}
      <path d="M78 134 L62 148" />
      <path d="M62 149 H78" />
      <path d="M88 130 L74 147" strokeWidth={1.4} opacity={0.7} />
      {/* belly */}
      <path d="M84 148 Q104 141 118 146" />
      {/* haunch and hind paw */}
      <path d="M124 118 Q134 124 132 136 Q131 143 124 147" strokeWidth={1.4} />
      <path d="M120 147 H140" />
      {/* tail draped along the pedestal edge */}
      <path d="M148 138 Q158 148 150 153 Q141 156 130 152" strokeWidth={1.4} />
    </g>
    {/* shoulder hatching */}
    <g strokeWidth={1} opacity={0.5}>
      <path d="M104 102 Q106 110 103 118" />
      <path d="M114 104 Q116 112 113 120" />
    </g>
    {/* pedestal */}
    <path d="M48 150 H152 V164 H48 Z" />
    <g strokeWidth={1} opacity={0.5}>
      <path d="M56 164 L60 150" />
      <path d="M74 164 L78 150" />
      <path d="M124 164 L128 150" />
      <path d="M142 164 L146 150" />
    </g>
    {/* ground */}
    <g strokeWidth={1} opacity={0.5}>
      <path d="M38 174 H88" />
      <path d="M104 174 H164" />
    </g>
  </svg>
);

export const TeslaVignette: React.FC = () => (
  <svg
    {...svgProps}
    aria-label="Engraving of a Tesla Cybertruck before a factory in California"
  >
    <title>
      Engraving of a Tesla Cybertruck before a factory with a smoking stack and
      a lightning bolt, for the California years
    </title>
    {/* factory with smoke curls */}
    <g strokeWidth={1.6}>
      <path d="M26 72 V54 L44 40 V54 L62 40 V54 L80 40 V72" />
      <path d="M26 72 H80" />
      <path d="M92 72 V34 H100 V72" />
    </g>
    <g strokeWidth={1} opacity={0.5}>
      <path d="M32 66 V60 M50 66 V60 M68 66 V60" />
      <path d="M38 46 L42 42 M56 46 L60 42 M74 46 L78 42" />
    </g>
    <g strokeWidth={1.2} opacity={0.7}>
      <path d="M96 30 Q92 25 98 21 Q105 17 101 11" />
      <path d="M103 27 Q109 23 107 16" />
    </g>
    {/* lightning bolt */}
    <path d="M156 28 L142 52 H154 L140 76" strokeWidth={1.8} />
    {/* Cybertruck */}
    <path d="M32 132 L46 112 L108 88 L172 116 V134" />
    <path d="M32 132 V140 H44" />
    <path d="M86 140 H120" />
    <path d="M162 140 H172 V134" />
    <path d="M52 116 L104 96 L150 116" strokeWidth={1.4} opacity={0.7} />
    <circle cx="65" cy="140" r="13" />
    <circle cx="65" cy="140" r="4" strokeWidth={1.4} />
    <circle cx="141" cy="140" r="13" />
    <circle cx="141" cy="140" r="4" strokeWidth={1.4} />
    {/* road and shadow hatching */}
    <path d="M18 156 H182" />
    <g strokeWidth={1} opacity={0.5}>
      <path d="M48 164 L54 158" />
      <path d="M66 164 L72 158" />
      <path d="M86 164 L92 158" />
      <path d="M120 164 L126 158" />
      <path d="M140 164 L146 158" />
    </g>
  </svg>
);

export const CornellVignette: React.FC = () => (
  <svg
    {...svgProps}
    aria-label="Engraving of McGraw Tower at Cornell University rising from circuit traces"
  >
    <title>
      Engraving of McGraw Tower at Cornell University above the hills of Ithaca,
      its base dissolving into semiconductor circuit traces
    </title>
    {/* Ithaca hills */}
    <g strokeWidth={1.4} opacity={0.6}>
      <path d="M14 120 Q45 100 76 118" />
      <path d="M124 118 Q158 98 186 120" />
    </g>
    <g strokeWidth={1} opacity={0.4}>
      <path d="M30 112 Q45 106 60 113" />
      <path d="M140 110 Q156 104 172 112" />
    </g>
    {/* tower */}
    <path d="M86 150 V56" />
    <path d="M114 150 V56" />
    <path d="M82 56 L100 24 L118 56 Z" />
    <path d="M100 24 V16" strokeWidth={1.4} />
    <circle cx="100" cy="13" r="2.5" strokeWidth={1.4} />
    <g strokeWidth={1.4} opacity={0.7}>
      <path d="M82 56 H118" />
      <path d="M84 92 H116" />
      <path d="M84 130 H116" />
    </g>
    {/* clock with ticks and hands */}
    <circle cx="100" cy="74" r="11" />
    <g strokeWidth={1.2}>
      <path d="M100 65 V67" />
      <path d="M109 74 H107" />
      <path d="M100 83 V81" />
      <path d="M91 74 H93" />
      <path d="M100 74 V68" />
      <path d="M100 74 L105 77" />
    </g>
    {/* arched belfry windows */}
    <g strokeWidth={1.4}>
      <path d="M91 104 V118 M97 104 V118" />
      <path d="M91 104 Q94 99 97 104" />
      <path d="M103 104 V118 M109 104 V118" />
      <path d="M103 104 Q106 99 109 104" />
    </g>
    {/* stone coursing */}
    <g strokeWidth={1} opacity={0.4}>
      <path d="M87 100 H92 M108 100 H113" />
      <path d="M87 112 H92 M108 112 H113" />
      <path d="M87 124 H92 M108 124 H113" />
    </g>
    {/* door */}
    <path d="M96 150 V140 Q100 136 104 140 V150" strokeWidth={1.4} />
    {/* circuit traces from the base */}
    <g strokeWidth={1.6}>
      <path d="M86 144 H52 V132" />
      <circle cx="52" cy="126" r="4" />
      <path d="M114 144 H148 V128" />
      <circle cx="148" cy="122" r="4" />
      <path d="M92 150 V168 H64" />
      <circle cx="58" cy="168" r="4" />
      <path d="M108 150 V174 H134" />
      <circle cx="140" cy="174" r="4" />
      <path d="M100 150 V186" />
      <circle cx="100" cy="189" r="3" />
    </g>
  </svg>
);

export const FicioVignette: React.FC = () => (
  <svg
    {...svgProps}
    aria-label="Engraving of a robotic arm harvesting a wheat sheaf, for Ficio, robotics for food"
  >
    <title>
      Engraving of a robotic arm tending a sheaf of wheat over a conveyor with
      an apple, for Ficio, robotics for food
    </title>
    {/* small radiant sun */}
    <circle cx="44" cy="38" r="8" />
    <g strokeWidth={1.2}>
      <path d="M55 38 L60 38" />
      <path d="M52 30 L56 26" />
      <path d="M44 27 L44 22" />
      <path d="M36 30 L32 26" />
      <path d="M33 38 L28 38" />
    </g>
    {/* robot arm */}
    <path d="M34 150 H84 V138 H34 Z" />
    <g strokeWidth={1} opacity={0.4}>
      <path d="M42 150 L46 138" />
      <path d="M58 150 L62 138" />
      <path d="M74 150 L78 138" />
    </g>
    <path d="M58 138 L76 102" />
    <circle cx="78" cy="98" r="6" />
    <circle cx="78" cy="98" r="1.5" strokeWidth={1.2} />
    <path d="M83 95 L114 78" />
    <circle cx="118" cy="76" r="6" />
    <circle cx="118" cy="76" r="1.5" strokeWidth={1.2} />
    <path d="M124 73 L136 66 M124 79 L138 84" strokeWidth={1.6} />
    {/* wheat sheaf */}
    <g strokeWidth={1.6}>
      <path d="M144 60 Q149 100 145 148" />
      <path d="M152 64 Q154 102 148 148" />
      <path d="M138 66 Q140 104 142 148" />
      <path d="M136 118 Q144 122 152 118" />
    </g>
    <g strokeWidth={1.2} opacity={0.7}>
      <path d="M144 72 Q136 68 134 58 M144 72 Q152 68 154 58" />
      <path d="M145 84 Q137 80 135 70 M145 84 Q153 80 155 70" />
      <path d="M152 76 Q158 72 160 62" />
      <path d="M138 78 Q132 74 130 64" />
    </g>
    {/* conveyor with apple */}
    <path d="M24 162 H176" />
    <circle cx="46" cy="170" r="5" strokeWidth={1.4} />
    <circle cx="100" cy="170" r="5" strokeWidth={1.4} />
    <circle cx="154" cy="170" r="5" strokeWidth={1.4} />
    <circle cx="104" cy="151" r="10" />
    <path d="M104 141 Q107 135 113 134" strokeWidth={1.4} />
    <path d="M107 137 Q114 131 118 135 Q113 139 107 137" strokeWidth={1.2} />
    <path d="M97 155 Q100 158 104 159" strokeWidth={1} opacity={0.4} />
  </svg>
);
