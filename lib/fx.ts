// Procedural green-screen families: grid, wave, glitch, orbit, liquid, radar, streak.
// t = 0..1 = one seamless loop. Every motion uses integer multiples of t, so the loop closes.
export const FX_IDS = ["grid", "wave", "glitch", "orbit", "liquid", "radar", "streak"];
const CHROMA = "#00B140";
const TAU = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function drawFx(c: any, W: number, H: number, t: number, seed: number, o: { style: string; pal: number; energy: number }, cols: string[]) {
  // every random draw happens in the same order on every frame, so the layout stays fixed
  const r = rng((seed * 2654435761 + FX_IDS.indexOf(o.style) * 97) >>> 0);
  const e = o.energy, lw = Math.max(2, H * 0.003);
  c.globalAlpha = 1; c.fillStyle = CHROMA; c.fillRect(0, 0, W, H);
  c.lineCap = "round"; c.lineJoin = "round";
  switch (o.style) {
    case "grid": return grid(c, W, H, t, r, e, cols, lw);
    case "wave": return wave(c, W, H, t, r, e, cols, lw);
    case "glitch": return glitch(c, W, H, t, r, e, cols);
    case "orbit": return orbit(c, W, H, t, r, e, cols, lw);
    case "liquid": return liquid(c, W, H, t, r, e, cols);
    case "radar": return radar(c, W, H, t, r, e, cols, lw);
    case "streak": return streak(c, W, H, t, r, e, cols, lw);
  }
}

function grid(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[], lw: number) {
  const hz = H * 0.38, N = 10 + Math.floor(r() * 5), M = 12 + Math.floor(r() * 5);
  c.lineWidth = lw;
  for (let i = 0; i < N; i++) {
    const u = frac(i / N + e * t); // 0 at horizon -> 1 at viewer
    const y = hz + (H - hz) * u * u;
    c.globalAlpha = 0.15 + 0.7 * u; c.strokeStyle = cols[i % cols.length];
    c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
  }
  c.globalAlpha = 0.6; c.strokeStyle = cols[0];
  for (let j = 0; j <= M; j++) {
    c.beginPath(); c.moveTo(W / 2, hz); c.lineTo(W * (-0.5 + (2 * j) / M), H); c.stroke();
  }
  c.globalAlpha = 1; c.lineWidth = lw * 2; c.strokeStyle = cols[1 % cols.length];
  c.beginPath(); c.moveTo(0, hz); c.lineTo(W, hz); c.stroke();
}

function wave(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[], lw: number) {
  const L = 6 + Math.floor(r() * 6) + 2 * e, k = 1 + Math.floor(r() * 3), A = H * (0.03 + 0.02 * e);
  for (let l = 0; l < L; l++) {
    const y0 = (H * (l + 0.5)) / L, ph = l * 0.35;
    c.strokeStyle = cols[l % cols.length]; c.lineWidth = lw * (1 + (l % 2)); c.globalAlpha = 0.85;
    c.beginPath();
    for (let x = 0; x <= W; x += W / 160) {
      const u = x / W;
      const y = y0 + A * (Math.sin(TAU * (k * u + e * t) + ph) + 0.4 * Math.sin(TAU * (2 * k * u - e * t) + 2 * ph));
      x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
  }
  c.globalAlpha = 1;
}

function glitch(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[]) {
  const S = 14 + Math.floor(r() * 10);
  for (let s = 0; s < S; s++) {
    const y = r() * H, h = H * (0.005 + r() * 0.04), ph = r(), x = r() * W, w = W * (0.2 + r() * 0.6);
    const on = frac(e * t + ph) < 0.35; // flicker gate, periodic in t
    if (!on) continue;
    const off = W * 0.06 * Math.sin(TAU * (e * t + ph));
    c.globalAlpha = 0.9; c.fillStyle = cols[s % cols.length]; c.fillRect(x + off, y, w, h);
    c.globalAlpha = 0.5; c.fillStyle = cols[(s + 1) % cols.length]; c.fillRect(x - off, y + h * 0.3, w, h * 0.4);
  }
  c.globalAlpha = 1;
}

function orbit(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[], lw: number) {
  const cx = W / 2, cy = H / 2, N = 4 + Math.floor(r() * 4), tilt = 0.35 + r() * 0.3, m0 = Math.min(W, H);
  for (let i = 0; i < N; i++) {
    const R = m0 * (0.18 + 0.07 * i + r() * 0.03), dir = i % 2 === 0 ? 1 : -1, ph = r();
    c.globalAlpha = 0.35; c.strokeStyle = cols[i % cols.length]; c.lineWidth = lw;
    c.beginPath(); c.ellipse(cx, cy, R, R * tilt, 0, 0, TAU); c.stroke();
    const a = TAU * (dir * e * t + ph);
    const x = cx + R * Math.cos(a), y = cy + R * tilt * Math.sin(a);
    const depth = (Math.sin(a) + 1) / 2, rad = m0 * (0.012 + 0.02 * depth);
    c.globalAlpha = 0.5 + 0.5 * depth; c.fillStyle = cols[i % cols.length];
    c.beginPath(); c.arc(x, y, rad, 0, TAU); c.fill();
  }
  c.globalAlpha = 1;
}

function liquid(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[]) {
  const B = 5 + Math.floor(r() * 3), step = Math.max(6, Math.round(H / 360)), pos: { x: number; y: number; R: number }[] = [];
  for (let b = 0; b < B; b++) {
    const ax = 0.25 + r() * 0.25, ay = 0.2 + r() * 0.25, px = r(), py = r(), k = 1 + Math.floor(r() * 2), rad = 0.1 + r() * 0.1;
    pos.push({ x: W * (0.5 + ax * Math.sin(TAU * (e * t + px))), y: H * (0.5 + ay * Math.cos(TAU * (k * t + py))), R: H * rad });
  }
  for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
    let f = 0;
    for (const p of pos) { const dx = x - p.x, dy = y - p.y; f += (p.R * p.R) / (dx * dx + dy * dy + 1); }
    if (f > 1) { c.fillStyle = cols[Math.min(cols.length - 1, Math.floor((f - 1) * cols.length * 0.5))]; c.fillRect(x, y, step, step); }
  }
}

function radar(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[], lw: number) {
  const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.44, col = cols[0], ang = TAU * e * t;
  c.strokeStyle = col; c.lineWidth = lw; c.globalAlpha = 0.35;
  for (let i = 1; i <= 4; i++) { c.beginPath(); c.arc(cx, cy, (R * i) / 4, 0, TAU); c.stroke(); }
  c.beginPath(); c.moveTo(cx - R, cy); c.lineTo(cx + R, cy); c.moveTo(cx, cy - R); c.lineTo(cx, cy + R); c.stroke();
  for (let k = 0; k < 30; k++) {
    const a = ang - k * 0.025;
    c.globalAlpha = 0.5 * (1 - k / 30); c.lineWidth = lw * 2;
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a)); c.stroke();
  }
  const B = 8 + Math.floor(r() * 6);
  for (let i = 0; i < B; i++) {
    const ba = TAU * r(), br = R * (0.2 + 0.75 * r()), px = cx + br * Math.cos(ba), py = cy + br * Math.sin(ba);
    const d = frac((ang - ba) / TAU);
    c.globalAlpha = Math.max(0, 1 - d * 4); c.fillStyle = cols[i % cols.length];
    c.beginPath(); c.arc(px, py, lw * 4, 0, TAU); c.fill();
  }
  c.globalAlpha = 1;
}

function streak(c: any, W: number, H: number, t: number, r: () => number, e: number, cols: string[], lw: number) {
  const S = 26 + Math.floor(r() * 14);
  for (let i = 0; i < S; i++) {
    const x0 = r(), y = r() * H, len = W * (0.08 + 0.25 * r()), sp = 1 + Math.floor(r() * 2), col = cols[i % cols.length], w = lw * (1 + 2 * r());
    const hx = frac(x0 + sp * e * t) * (W + 2 * len) - len;
    const g = c.createLinearGradient(hx - len, 0, hx, 0);
    g.addColorStop(0, col + "00"); g.addColorStop(1, col);
    c.strokeStyle = g; c.lineWidth = w; c.globalAlpha = 0.9;
    c.beginPath(); c.moveTo(hx - len, y); c.lineTo(hx, y); c.stroke();
  }
  c.globalAlpha = 1;
}
