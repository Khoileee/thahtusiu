// Nhạc nền tự soạn, phát bằng Web Audio (không dùng file nhạc nào).
// Pop vui kiểu "rủ đi chơi": Sol trưởng, 116 BPM, vòng G – Em – C – D,
// ukulele gảy nhịp nảy, chuông glockenspiel, bass bật, vỗ tay phách 2 và 4.
const BPM = 116, STEP = 60 / BPM / 4, BARS = 8, STEPS = BARS * 16, SWING = 0.1;
const hz = m => 440 * 2 ** ((m - 69) / 12);

const CHORDS = [
  {root:43, uke:[67, 71, 74, 79], pad:[55, 59, 62]}, // G
  {root:40, uke:[67, 71, 76, 79], pad:[52, 55, 59]}, // Em
  {root:36, uke:[67, 72, 76, 79], pad:[55, 60, 64]}, // C
  {root:38, uke:[66, 69, 74, 78], pad:[54, 57, 62]}, // D
];
// Kiểu gảy ukulele "D - DU - UDU" trên lưới móc kép: [bước, hướng (1 xuống, -1 lên), lực]
const STRUM = [[0, 1, 1], [4, 1, .75], [6, -1, .6], [10, -1, .65], [12, 1, .85], [14, -1, .6]];
// Giai điệu chuông: [ô nhịp, bước móc kép, nốt MIDI]
const MELODY = [
  [0,0,83],[0,2,86],[0,4,83],[0,6,79],[0,10,81],[0,12,83],
  [1,0,79],[1,2,83],[1,4,88],[1,8,86],[1,12,83],
  [2,0,84],[2,2,88],[2,4,84],[2,6,79],[2,8,81],[2,10,84],[2,12,81],
  [3,0,81],[3,2,78],[3,4,81],[3,6,86],[3,10,84],[3,12,83],[3,14,81],
  [4,0,79],[4,4,83],[4,6,86],[4,8,91],[4,12,86],
  [5,0,88],[5,2,86],[5,4,83],[5,8,79],[5,10,83],[5,12,88],
  [6,0,84],[6,4,88],[6,6,91],[6,8,88],[6,12,84],[6,14,86],
  [7,0,86],[7,2,84],[7,4,81],[7,8,78],[7,10,81],[7,14,74]
];
// Vòng thứ hai: nửa đầu là đoạn "huýt sáo" để nghỉ tai, nửa sau giai điệu đầy đủ.
const HOOK = [[0,0,79],[0,3,81],[0,6,83],[1,0,83],[1,3,81],[1,6,79],[2,0,79],[2,3,81],[2,6,84],[3,0,86],[3,6,85],[3,8,86]];

export function createMusic(offline) {
  let ctx = null, master, dry, wet, timer = null, nextTime = 0, step = 0, loop = 0, noise;

  function setup() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!offline && !AC) return false;
    ctx = offline || new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3;
    master = ctx.createGain(); master.gain.value = 0;
    master.connect(comp); comp.connect(ctx.destination);
    dry = ctx.createGain(); dry.gain.value = 0.85; dry.connect(master);
    const len = ctx.sampleRate * 1.4, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3; }
    const verb = ctx.createConvolver(); verb.buffer = ir;
    wet = ctx.createGain(); wet.gain.value = 0.22; wet.connect(verb); verb.connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    return true;
  }

  const out = (node, send = 0.2) => { node.connect(dry); const s = ctx.createGain(); s.gain.value = send; node.connect(s); s.connect(wet); };
  const osc = (type, f, t, end, dest, det = 0) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = det; o.connect(dest); o.start(t); o.stop(end); };

  // Dây ukulele: tiếng gảy sáng, tắt nhanh.
  function uke(t, notes, dir, vel) {
    const order = dir > 0 ? notes : [...notes].reverse();
    order.forEach((n, i) => {
      const at = t + i * 0.011;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 1.2;
      lp.frequency.setValueAtTime(4200, at); lp.frequency.exponentialRampToValueAtTime(900, at + 0.25);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(0.05 * vel, at + 0.004); g.gain.exponentialRampToValueAtTime(0.0008, at + 0.42);
      lp.connect(g); out(g, 0.15);
      osc('triangle', hz(n), at, at + 0.45, lp);
      osc('sawtooth', hz(n), at, at + 0.45, lp, 7);
    });
  }

  function pad(t, notes, dur) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1100;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.018, t + 0.15);
    g.gain.setValueAtTime(0.018, t + dur - 0.1); g.gain.linearRampToValueAtTime(0, t + dur + 0.2);
    lp.connect(g); out(g, 0.3);
    for (const n of notes) osc('sine', hz(n), t, t + dur + 0.25, lp, 4);
  }

  function bass(t, n, vel = 1) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.2 * vel, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700;
    lp.connect(g); out(g, 0);
    osc('sine', hz(n), t, t + 0.26, lp); osc('triangle', hz(n), t, t + 0.26, lp);
  }

  function bell(t, n, vel = 1) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07 * vel, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0006, t + 0.7);
    out(g, 0.3);
    for (const [mult, amp] of [[1, 1], [2.76, 0.22], [5.4, 0.06]]) { const a = ctx.createGain(); a.gain.value = amp; a.connect(g); osc('sine', hz(n) * mult, t, t + 0.75, a); }
  }

  function whistle(t, n, len) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.04); g.gain.setValueAtTime(0.05, t + len - 0.05); g.gain.linearRampToValueAtTime(0, t + len);
    out(g, 0.4);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(hz(n) * 0.97, t); o.frequency.linearRampToValueAtTime(hz(n), t + 0.05);
    const lfo = ctx.createOscillator(), depth = ctx.createGain(); lfo.frequency.value = 5.5; depth.gain.value = hz(n) * 0.008;
    lfo.connect(depth); depth.connect(o.frequency); o.connect(g);
    o.start(t); o.stop(t + len + 0.02); lfo.start(t); lfo.stop(t + len + 0.02);
  }

  function noiseHit(t, type, freq, gain, decay, send = 0.1) {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = 0.9;
    const g = ctx.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0005, t + decay);
    s.connect(f); f.connect(g); out(g, send); s.start(t); s.stop(t + decay + 0.02);
  }
  const clap = t => { for (const d of [0, 0.011, 0.022]) noiseHit(t + d, 'bandpass', 1400, 0.09, 0.09, 0.25); };
  const shaker = (t, v) => noiseHit(t, 'highpass', 7500, 0.016 * v, 0.045);

  function kick(t) {
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(50, t + 0.12);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.32, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(g); out(g, 0); o.start(t); o.stop(t + 0.22);
  }

  function schedule(s, t) {
    const bar = Math.floor(s / 16), i = s % 16, chord = CHORDS[bar % 4];
    const intro = loop === 0 && bar < 2; // hai ô nhịp đầu chỉ có ukulele, rồi cả ban nhạc vào
    if (i === 0) pad(t, chord.pad, STEP * 16);
    for (const [st, dir, v] of STRUM) if (st === i) uke(t, chord.uke, dir, v);
    if (intro) return;
    if (i === 0 || i === 8) bass(t, chord.root);
    if (i === 6 || i === 14) bass(t, chord.root + 7, 0.7);
    if (i === 11) bass(t, chord.root + 12, 0.55);
    if (i === 0 || i === 8 || (i === 10 && bar % 2)) kick(t);
    if (i === 4 || i === 12) clap(t);
    if (i % 2 === 0 && i % 4) shaker(t, 1); else if (i % 2) shaker(t, 0.45);
    const second = loop % 2 === 1;
    if (!second || bar >= 4) for (const [b, st, n] of MELODY) if (b === bar && st === i) bell(t, n, second ? 1 : 0.9);
    if (second && bar < 4) for (const [b, st, n] of HOOK) if (b === bar && st === i) whistle(t, n, STEP * 2.6);
  }

  const advance = () => { nextTime += STEP; step = (step + 1) % STEPS; if (step === 0) loop++; };
  const at = () => nextTime + (step % 2 ? STEP * SWING * 2 : 0);
  function tick() { while (nextTime < ctx.currentTime + 0.15) { schedule(step, at()); advance(); } }
  function fadeTo(v, sec) { const now = ctx.currentTime; master.gain.cancelScheduledValues(now); master.gain.setValueAtTime(master.gain.value, now); master.gain.linearRampToValueAtTime(v, now + sec); }

  return {
    // Dựng sẵn toàn bộ nhạc vào một OfflineAudioContext (dùng để kiểm tra mức âm lượng).
    renderAll(seconds) {
      setup(); master.gain.value = 0.9; nextTime = 0.05;
      while (nextTime < seconds - 0.5) { schedule(step, at()); advance(); }
      return ctx.startRendering();
    },
    get playing() { return !!timer; },
    // Thử phát ngay khi mở trang; trình duyệt chặn thì trả về false (cần người xem chạm vào trang).
    async tryAutoplay() {
      if (timer) return true;
      if (!setup()) return false;
      try { await Promise.race([ctx.resume(), new Promise(r => setTimeout(r, 400))]); } catch {}
      if (ctx.state !== 'running') return false;
      return this.start();
    },
    // Gọi trong sự kiện bấm/chạm để trình duyệt cho phép phát âm thanh.
    start() {
      if (timer) return true;
      if (!setup()) return false;
      ctx.resume();
      fadeTo(0.9, 1.5);
      nextTime = ctx.currentTime + 0.08; step = 0; loop = 0;
      timer = setInterval(tick, 30); tick();
      return true;
    },
    stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      fadeTo(0, 0.5);
      setTimeout(() => { if (!timer) ctx.suspend(); }, 600);
    }
  };
}
