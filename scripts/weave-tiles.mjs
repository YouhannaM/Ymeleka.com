// Builds public/weave-light.webp (the white weave) and public/weave-dark.webp
// (its edges in orange on black) as seamless tiles from the source strip.
//
//   node scripts/weave-tiles.mjs <strip.png> <outDir> [gain gamma blur floor] [previewDir]
//
// The strip repeats every 440px horizontally; one period is cut at x0 and
// its last F columns crossfade into the previous period so the tile loops.
// Vertically the tile is mirrored. The dark tile is a Sobel edge magnitude
// of the light tile mapped from near-black to Ficio orange.
import sharp from 'sharp';

const [SRC, OUT, gainArg, gammaArg, blurArg, floorArg, PREVIEW] =
  process.argv.slice(2);
if (!SRC || !OUT) {
  console.error(
    'usage: node scripts/weave-tiles.mjs <strip.png> <outDir> [gain gamma blur floor] [previewDir]',
  );
  process.exit(1);
}
const ORANGE = [255, 90, 31];
const BLACK = [10, 10, 10];
const P = 440;
const F = 70;
const x0 = 559;
const gain = Number(gainArg ?? 0.45);
const gamma = Number(gammaArg ?? 0.8);
const blurR = Number(blurArg ?? 1.2);
const floorK = Number(floorArg ?? 0);

const { data: src, info } = await sharp(SRC)
  .raw()
  .toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const C = info.channels;

const tile = Buffer.alloc(P * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < P; x++) {
    const t = x >= P - F ? (x - (P - F)) / F : 0;
    for (let c = 0; c < 3; c++) {
      const a = src[(y * W + x0 + x) * C + c];
      const b = src[(y * W + x0 + x - P) * C + c];
      tile[(y * P + x) * 3 + c] = Math.round(a * (1 - t) + b * t);
    }
  }
}
const raw = { raw: { width: P, height: H, channels: 3 } };
const top = await sharp(tile, raw).png().toBuffer();
const flip = await sharp(tile, raw).flip().png().toBuffer();
const h = H * 2;
const lightPng = await sharp({
  create: { width: P, height: h, channels: 3, background: '#fff' },
})
  .composite([
    { input: top, top: 0, left: 0 },
    { input: flip, top: H, left: 0 },
  ])
  .png()
  .toBuffer();
await sharp(lightPng).webp({ quality: 82 }).toFile(`${OUT}/weave-light.webp`);

const g = await sharp(lightPng)
  .greyscale()
  .blur(blurR)
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = g.info.width;
const d = g.data;
const px = (x, y) => d[((y + h) % h) * w + ((x + w) % w)];
const mag = new Float32Array(w * h);
let mx = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const gx =
      -px(x - 1, y - 1) -
      2 * px(x - 1, y) -
      px(x - 1, y + 1) +
      px(x + 1, y - 1) +
      2 * px(x + 1, y) +
      px(x + 1, y + 1);
    const gy =
      -px(x - 1, y - 1) -
      2 * px(x, y - 1) -
      px(x + 1, y - 1) +
      px(x - 1, y + 1) +
      2 * px(x, y + 1) +
      px(x + 1, y + 1);
    const m = Math.hypot(gx, gy);
    mag[y * w + x] = m;
    if (m > mx) mx = m;
  }
}
const floor = floorK * mx;
const out = Buffer.alloc(w * h * 3);
for (let i = 0; i < w * h; i++) {
  const t = Math.min(1, Math.max(0, mag[i] - floor) / (mx * gain - floor));
  const k = t ** gamma;
  for (let c = 0; c < 3; c++) {
    out[i * 3 + c] = Math.round(BLACK[c] + (ORANGE[c] - BLACK[c]) * k);
  }
}
const darkPng = await sharp(out, { raw: { width: w, height: h, channels: 3 } })
  .png()
  .toBuffer();
await sharp(darkPng).webp({ quality: 82 }).toFile(`${OUT}/weave-dark.webp`);

if (PREVIEW) {
  for (const [name, buf] of [
    ['light', lightPng],
    ['dark', darkPng],
  ]) {
    const comps = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        comps.push({ input: buf, left: i * P, top: j * h });
      }
    }
    await sharp({
      create: { width: P * 3, height: h * 2, channels: 3, background: '#000' },
    })
      .composite(comps)
      .resize(1200)
      .jpeg({ quality: 85 })
      .toFile(`${PREVIEW}/weave-${name}-preview.jpg`);
  }
}
console.log(`tile ${P}x${h}, max gradient ${mx.toFixed(1)}`);
