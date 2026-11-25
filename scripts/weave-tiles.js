// Builds public/weave-light.webp (white weave) and public/weave-dark.webp
// (orange edges on black) as seamless tiles from the supplied strip.
const sharp = require('/home/user/Ymeleka.com/node_modules/sharp');
const SRC = process.argv[2];
const OUT = process.argv[3];
const S =
  '/tmp/claude-0/-home-user-Ymeleka-com/67c5fb04-6333-5ddc-b584-9dbf6acdca3e/scratchpad';
const ORANGE = [255, 90, 31];
const BLACK = [10, 10, 10];

(async () => {
  const P = 440,
    F = 70,
    x0 = 559;
  const { data: src, info } = await sharp(SRC)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width,
    H = info.height,
    C = info.channels;
  // One period, with the last F columns crossfaded into the same phase of the previous period
  const tile = Buffer.alloc(P * H * 3);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < P; x++) {
      const t = x >= P - F ? (x - (P - F)) / F : 0;
      for (let c = 0; c < 3; c++) {
        const a = src[(y * W + x0 + x) * C + c];
        const b = src[(y * W + x0 + x - P) * C + c];
        tile[(y * P + x) * 3 + c] = Math.round(a * (1 - t) + b * t);
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

  // Dark: Sobel edge magnitude of the light tile, mapped black -> orange
  const blurR = Number(process.argv[6] || 2.2);
  const g = await sharp(lightPng)
    .greyscale()
    .blur(blurR)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = g.info.width,
    d = g.data;
  const px = (x, y) => d[((y + h) % h) * w + ((x + w) % w)];
  const mag = new Float32Array(w * h);
  let mx = 0;
  for (let y = 0; y < h; y++)
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
  const gain = Number(process.argv[4] || 0.45),
    gamma = Number(process.argv[5] || 0.8);
  const floor = Number(process.argv[7] || 0.14) * mx;
  const out = Buffer.alloc(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    const t = Math.min(
      1,
      Math.pow(Math.max(0, mag[i] - floor) / (mx * gain - floor), gamma),
    );
    for (let c = 0; c < 3; c++)
      out[i * 3 + c] = Math.round(BLACK[c] + (ORANGE[c] - BLACK[c]) * t);
  }
  const darkPng = await sharp(out, {
    raw: { width: w, height: h, channels: 3 },
  })
    .png()
    .toBuffer();
  await sharp(darkPng).webp({ quality: 82 }).toFile(`${OUT}/weave-dark.webp`);

  for (const [name, buf] of [
    ['light', lightPng],
    ['dark', darkPng],
  ]) {
    const comps = [];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 2; j++)
        comps.push({ input: buf, left: i * P, top: j * h });
    await sharp({
      create: { width: P * 3, height: h * 2, channels: 3, background: '#000' },
    })
      .composite(comps)
      .resize(1200)
      .jpeg({ quality: 85 })
      .toFile(`${S}/weave-${name}-preview.jpg`);
  }
  console.log('tile', P, h, 'max grad', mx.toFixed(1));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
