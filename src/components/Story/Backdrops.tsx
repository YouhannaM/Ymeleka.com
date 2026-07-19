import React from 'react';

/**
 * Full-bleed engraved panoramas that sit faintly behind each scene,
 * like the underdrawing of a fresco. Rendered at very low opacity in
 * the section's ink or paper color, they give each room atmosphere
 * without competing with the circular vignettes.
 *
 * Each panorama also carries one thread of the work: a merchant's
 * scale for commercial acumen in Egypt, a flowchart and braces for
 * software over Happy Valley, meshing gears for manufacturing at the
 * gigafactory, an integrated circuit for hardware in Ithaca, and a
 * rising chart with coins for capital over the Ficio orchard.
 */

const svgProps = {
  viewBox: '0 0 1440 600',
  preserveAspectRatio: 'xMidYMid slice',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const EgyptPanorama: React.FC = () => (
  <svg {...svgProps}>
    {/* radiant sun */}
    <circle cx="1150" cy="140" r="55" />
    <g strokeWidth={1.6}>
      <path d="M1150 62 V38" />
      <path d="M1206 84 L1224 66" />
      <path d="M1228 140 H1252" />
      <path d="M1206 196 L1224 214" />
      <path d="M1094 84 L1076 66" />
      <path d="M1072 140 H1048" />
    </g>
    {/* clouds */}
    <g strokeWidth={1.6}>
      <path d="M170 130 Q174 108 196 112 Q200 94 222 98 Q240 90 244 108 Q266 108 258 130" />
      <path d="M170 130 H258" />
      <path d="M660 92 Q664 74 682 78 Q686 62 704 66 Q720 60 722 76 Q740 78 734 94" />
      <path d="M660 92 H734" />
    </g>
    {/* birds */}
    <g strokeWidth={1.4}>
      <path d="M590 190 Q602 182 614 190 M614 190 Q626 182 638 190" />
      <path d="M660 150 Q670 144 680 150 M680 150 Q690 144 700 150" />
    </g>
    {/* merchant's balance, the first trade */}
    <g strokeWidth={1.6}>
      <path d="M470 210 V140" />
      <circle cx="470" cy="134" r="5" />
      <path d="M420 144 H520" />
      <path d="M420 144 L405 176 M420 144 L435 176" />
      <path d="M402 178 Q420 190 438 178" />
      <path d="M520 144 L505 176 M520 144 L535 176" />
      <path d="M502 178 Q520 190 538 178" />
      <path d="M452 210 H488" />
    </g>
    {/* pyramids */}
    <path d="M560 400 L810 170 L1060 400 Z" />
    <path d="M810 170 L890 400" strokeWidth={1.6} />
    <g strokeWidth={1.2} opacity={0.5}>
      <path d="M841 250 H894" />
      <path d="M858 300 H946" />
      <path d="M876 350 H1000" />
      <path d="M890 390 H1043" />
    </g>
    <path d="M240 400 L420 240 L600 400" />
    <path d="M420 240 L480 400" strokeWidth={1.6} />
    <g strokeWidth={1.2} opacity={0.5}>
      <path d="M446 320 H506" />
      <path d="M472 370 H562" />
    </g>
    <path d="M1080 400 L1170 320 L1260 400" />
    {/* horizon and dunes */}
    <path d="M40 400 H1400" />
    <path d="M0 470 Q240 430 480 470 T960 470 T1440 470" strokeWidth={1.6} />
    <path
      d="M0 540 Q300 500 600 540 T1200 540"
      strokeWidth={1.4}
      opacity={0.6}
    />
    <g strokeWidth={1.2} opacity={0.5}>
      <path d="M300 452 L340 444" />
      <path d="M700 452 L740 444" />
      <path d="M1100 452 L1140 444" />
    </g>
    {/* foreground palms */}
    <g strokeWidth={1.8}>
      <path d="M120 470 Q114 390 130 344" />
      <path d="M130 344 Q106 328 86 332" />
      <path d="M130 344 Q116 316 100 306" />
      <path d="M130 344 Q134 312 132 296" />
      <path d="M130 344 Q152 316 168 310" />
      <path d="M130 344 Q158 330 176 334" />
    </g>
  </svg>
);

export const PennStatePanorama: React.FC = () => (
  <svg {...svgProps}>
    {/* Happy Valley ridges */}
    <path
      d="M0 300 Q260 260 520 296 Q700 320 900 298 Q1150 272 1440 300"
      strokeWidth={1.4}
      opacity={0.4}
    />
    <path
      d="M0 340 Q200 300 400 335 Q600 368 800 340 Q1000 312 1200 342 Q1320 356 1440 344"
      strokeWidth={1.6}
      opacity={0.7}
    />
    {/* valley trees */}
    <g strokeWidth={1.4} opacity={0.6}>
      <circle cx="150" cy="322" r="10" />
      <path d="M150 332 V344" />
      <circle cx="220" cy="318" r="8" />
      <path d="M220 326 V338" />
      <circle cx="1250" cy="326" r="10" />
      <path d="M1250 336 V348" />
      <circle cx="1330" cy="320" r="8" />
      <path d="M1330 328 V340" />
    </g>
    {/* a system, drawn as a flowchart */}
    <g strokeWidth={1.6}>
      <circle cx="392" cy="86" r="16" />
      <path d="M408 86 H460" />
      <path d="M460 66 H526 V106 H460 Z" />
      <path d="M526 86 H556" />
      <path d="M582 62 L610 86 L582 110 L554 86 Z" />
      <path d="M582 110 V138" />
      <circle cx="582" cy="152" r="13" />
      <path d="M493 106 V152 H569" strokeWidth={1.2} opacity={0.6} />
    </g>
    {/* code braces between the floodlights */}
    <g strokeWidth={1.6}>
      <path d="M862 40 Q842 48 848 70 Q852 82 838 86 Q852 90 848 102 Q842 124 862 132" />
      <path d="M942 40 Q962 48 956 70 Q952 82 966 86 Q952 90 956 102 Q962 124 942 132" />
      <path d="M916 54 L892 118" strokeWidth={1.4} opacity={0.6} />
    </g>
    {/* Beaver Stadium bowl */}
    <path d="M380 250 Q720 190 1060 250" />
    <path d="M420 320 Q720 262 1020 320" />
    <path d="M380 250 L420 320" />
    <path d="M1060 250 L1020 320" />
    <g strokeWidth={1.2} opacity={0.5}>
      <path d="M500 232 V296" />
      <path d="M600 220 V284" />
      <path d="M720 215 V279" />
      <path d="M840 220 V284" />
      <path d="M940 232 V296" />
    </g>
    {/* floodlight masts */}
    <g strokeWidth={1.6}>
      <path d="M430 240 V150 M408 150 H452 M412 142 V150 M430 142 V150 M448 142 V150" />
      <path d="M640 205 V115 M618 115 H662 M622 107 V115 M640 107 V115 M658 107 V115" />
      <path d="M800 205 V115 M778 115 H822 M782 107 V115 M800 107 V115 M818 107 V115" />
      <path d="M1010 240 V150 M988 150 H1032 M992 142 V150 M1010 142 V150 M1028 142 V150" />
    </g>
    {/* pennant */}
    <path d="M720 215 V150 L762 162 L720 174" strokeWidth={1.6} />
    {/* field lines */}
    <path d="M300 470 H1140" strokeWidth={1.6} />
    <g strokeWidth={1.2} opacity={0.5}>
      <path d="M380 470 V440" />
      <path d="M470 470 V440" />
      <path d="M560 470 V440" />
      <path d="M650 470 V440" />
      <path d="M790 470 V440" />
      <path d="M880 470 V440" />
      <path d="M970 470 V440" />
      <path d="M1060 470 V440" />
    </g>
  </svg>
);

export const TeslaPanorama: React.FC = () => (
  <svg {...svgProps}>
    {/* bolt in the sky */}
    <path d="M420 90 L380 170 H415 L370 250" strokeWidth={1.8} opacity={0.6} />
    {/* meshing gears */}
    <g strokeWidth={1.6}>
      <circle cx="640" cy="140" r="42" />
      <circle cx="640" cy="140" r="10" />
      <path d="M640 90 V78 M640 190 V202 M590 140 H578 M690 140 H702" />
      <path d="M605 105 L596 96 M675 105 L684 96 M605 175 L596 184 M675 175 L684 184" />
      <circle cx="722" cy="197" r="27" />
      <circle cx="722" cy="197" r="7" />
      <path d="M722 164 V154 M722 230 V240 M689 197 H679 M755 197 H765" />
    </g>
    {/* gigafactory sawtooth roofline */}
    <path d="M200 400 V320 L260 280 V320 L320 280 V320 L380 280 V320 L440 280 V320 L500 280 V320 L560 280 V320 L620 280 V320 L680 280 V320 L740 280 V320 L800 280 V320 L860 280 V320 L920 280 V320 L980 280 V400" />
    <path d="M200 400 H980" />
    <g strokeWidth={1.2} opacity={0.4}>
      <path d="M250 380 V352" />
      <path d="M350 380 V352" />
      <path d="M450 380 V352" />
      <path d="M550 380 V352" />
      <path d="M650 380 V352" />
      <path d="M750 380 V352" />
      <path d="M850 380 V352" />
      <path d="M930 380 V352" />
    </g>
    {/* stack and smoke */}
    <path d="M1020 400 V220 H1044 V400" strokeWidth={1.8} />
    <path d="M1020 260 H1044" strokeWidth={1.2} opacity={0.5} />
    <g strokeWidth={1.4} opacity={0.7}>
      <path d="M1032 210 Q1020 190 1036 176 Q1052 162 1040 146" />
      <path d="M1046 200 Q1058 188 1052 170" />
    </g>
    {/* transmission pylons and wire */}
    <g strokeWidth={1.6}>
      <path d="M1180 400 L1200 250 L1220 400" />
      <path d="M1186 350 L1214 330 M1186 330 L1214 350" />
      <path d="M1160 270 H1240" />
      <path d="M1166 300 H1234" />
      <path d="M1320 400 L1334 290 L1348 400" />
      <path d="M1306 310 H1362" />
    </g>
    <path d="M1200 258 Q1270 280 1334 296" strokeWidth={1.2} opacity={0.6} />
    {/* horizon and road */}
    <path d="M40 400 H1400" />
    <path d="M0 500 H1440" strokeWidth={1.6} />
    <g strokeWidth={1.4} opacity={0.5}>
      <path d="M100 530 H180" />
      <path d="M300 530 H380" />
      <path d="M500 530 H580" />
      <path d="M700 530 H780" />
      <path d="M900 530 H980" />
      <path d="M1100 530 H1180" />
    </g>
  </svg>
);

export const CornellPanorama: React.FC = () => (
  <svg {...svgProps}>
    {/* distant ridge */}
    <path
      d="M0 330 Q300 280 600 320 Q900 355 1200 315 Q1330 300 1440 315"
      strokeWidth={1.4}
      opacity={0.6}
    />
    <g strokeWidth={1.4} opacity={0.6}>
      <circle cx="150" cy="316" r="9" />
      <path d="M150 325 V336" />
      <circle cx="1290" cy="304" r="9" />
      <path d="M1290 313 V324" />
    </g>
    {/* McGraw Tower on the hill */}
    <path d="M860 400 V210" />
    <path d="M900 400 V210" />
    <path d="M852 210 L880 150 L908 210 Z" />
    <path d="M880 150 V132" strokeWidth={1.6} />
    <circle cx="880" cy="127" r="5" strokeWidth={1.6} />
    <circle cx="880" cy="250" r="16" />
    <path d="M880 250 V240 M880 250 L888 255" strokeWidth={1.4} />
    <g strokeWidth={1.4}>
      <path d="M868 300 V330 M876 300 V330" />
      <path d="M868 300 Q872 292 876 300" />
      <path d="M884 300 V330 M892 300 V330" />
      <path d="M884 300 Q888 292 892 300" />
    </g>
    <g strokeWidth={1.2} opacity={0.6}>
      <path d="M856 210 H904" />
      <path d="M858 285 H902" />
      <path d="M858 350 H902" />
    </g>
    {/* horizon */}
    <path d="M40 400 H1400" />
    {/* the gorge and falls */}
    <g strokeWidth={1.8}>
      <path d="M420 600 Q440 500 500 470 Q530 458 560 462" />
      <path d="M760 600 Q740 500 700 470 Q670 458 640 462" />
      <path d="M560 462 H640" />
    </g>
    <g strokeWidth={1.4} opacity={0.5}>
      <path d="M560 470 V600" />
      <path d="M582 466 V600" />
      <path d="M604 468 V600" />
      <path d="M470 500 L502 488" />
      <path d="M452 540 L488 526" />
      <path d="M712 500 L682 488" />
      <path d="M730 540 L696 526" />
    </g>
    {/* an integrated circuit among the traces */}
    <g strokeWidth={1.6}>
      <path d="M960 448 H1100 V528 H960 Z" />
      <circle cx="980" cy="466" r="5" />
      <path d="M960 466 H932 M960 488 H932 M960 510 H932" />
      <path d="M1100 466 H1128 M1100 488 H1128 M1100 510 H1128" />
      <path d="M988 448 V424 M1030 448 V424 M1072 448 V424" />
      <path d="M988 528 V552 M1030 528 V552 M1072 528 V552" />
    </g>
    {/* circuit traces at the edges */}
    <g strokeWidth={1.6}>
      <path d="M340 560 H120" />
      <circle cx="112" cy="560" r="6" />
      <path d="M360 590 H820" />
      <circle cx="828" cy="590" r="6" />
      <path d="M1128 488 H1220 V560 H1360" />
    </g>
  </svg>
);

export const FicioPanorama: React.FC = () => (
  <svg {...svgProps}>
    {/* small sun and birds */}
    <circle cx="180" cy="120" r="40" />
    <g strokeWidth={1.6}>
      <path d="M180 66 V46" />
      <path d="M222 78 L236 64" />
      <path d="M234 120 H254" />
      <path d="M138 78 L124 64" />
      <path d="M126 120 H106" />
    </g>
    <g strokeWidth={1.4}>
      <path d="M560 130 Q572 122 584 130 M584 130 Q596 122 608 130" />
      <path d="M660 100 Q670 94 680 100 M680 100 Q690 94 700 100" />
    </g>
    {/* capital: a rising line and sown coins */}
    <g strokeWidth={1.6}>
      <path d="M700 270 L780 246 L844 268 L924 202 L1004 224 L1104 140" />
      <path d="M1104 140 L1082 142 M1104 140 L1100 162" />
      <circle cx="662" cy="290" r="11" />
      <circle cx="688" cy="292" r="11" />
      <circle cx="674" cy="272" r="11" />
    </g>
    {/* horizon */}
    <path d="M40 380 H1400" />
    {/* far orchard row */}
    <g strokeWidth={1.4} opacity={0.6}>
      <circle cx="280" cy="368" r="13" />
      <path d="M280 381 V392" />
      <circle cx="520" cy="368" r="13" />
      <path d="M520 381 V392" />
      <circle cx="760" cy="368" r="13" />
      <path d="M760 381 V392" />
      <circle cx="1000" cy="368" r="13" />
      <path d="M1000 381 V392" />
    </g>
    {/* middle orchard row */}
    <g strokeWidth={1.6}>
      <circle cx="370" cy="404" r="26" />
      <path d="M370 430 V452" />
      <circle cx="750" cy="404" r="26" />
      <path d="M750 430 V452" />
      <circle cx="1090" cy="404" r="26" />
      <path d="M1090 430 V452" />
    </g>
    {/* front orchard row with apples */}
    <g strokeWidth={1.8}>
      <circle cx="180" cy="430" r="45" />
      <path d="M180 475 V520" />
      <circle cx="170" cy="420" r="4" strokeWidth={1.4} />
      <circle cx="196" cy="438" r="4" strokeWidth={1.4} />
      <circle cx="560" cy="430" r="45" />
      <path d="M560 475 V520" />
      <circle cx="548" cy="422" r="4" strokeWidth={1.4} />
      <circle cx="576" cy="440" r="4" strokeWidth={1.4} />
      <circle cx="940" cy="430" r="45" />
      <path d="M940 475 V520" />
      <circle cx="928" cy="420" r="4" strokeWidth={1.4} />
      <circle cx="956" cy="440" r="4" strokeWidth={1.4} />
    </g>
    {/* greenhouse hoops */}
    <g strokeWidth={1.6}>
      <path d="M1150 470 Q1180 400 1210 470" />
      <path d="M1210 470 Q1240 400 1270 470" />
      <path d="M1270 470 Q1300 400 1330 470" />
      <path d="M1150 470 H1330" />
      <path d="M1180 436 H1300" strokeWidth={1.2} opacity={0.5} />
    </g>
    {/* furrows toward the horizon */}
    <g strokeWidth={1.2} opacity={0.4}>
      <path d="M80 600 L560 386" />
      <path d="M400 600 L640 386" />
      <path d="M1040 600 L800 386" />
      <path d="M1360 600 L880 386" />
    </g>
  </svg>
);
