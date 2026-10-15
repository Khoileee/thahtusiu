// Nhạc nền tự soạn, phát bằng Web Audio (không dùng file nhạc nào).
// Lofi "music box" 78 BPM, vòng Cmaj7 – Am7 – Dm7 – G7 | Cmaj7 – Am7 – Fmaj7 – G6.
const BPM = 78, STEP = 60 / BPM / 2, BARS = 8, STEPS = BARS * 8, SWING = 0.06;
const hz = m => 440 * 2 ** ((m - 69) / 12);

const CHORDS = [
  {bass:48, pad:[60, 64, 67, 71]}, // Cmaj7
  {bass:45, pad:[57, 60, 64, 67]}, // Am7
  {bass:50, pad:[57, 60, 62, 65]}, // Dm7
  {bass:43, pad:[55, 59, 62, 65]}, // G7
  {bass:48, pad:[60, 64, 67, 71]}, // Cmaj7
  {bass:45, pad:[57, 60, 64, 67]}, // Am7
  {bass:41, pad:[53, 57, 60, 64]}, // Fmaj7
  {bass:43, pad:[55, 59, 62, 64]}  // G6
];
// [bar, bước trong ô nhịp (móc đơn), nốt MIDI]
const MELODY_A = [
  [0,0,76],[0,2,79],[0,4,83],[0,6,81],[0,7,79],
  [1,0,76],[1,3,72],[1,4,74],[1,6,76],
  [2,0,77],[2,2,81],[2,4,84],[2,6,81],
  [3,0,79],[3,4,74],
  [4,0,76],[4,2,79],[4,4,84],[4,6,83],[4,7,79],
  [5,0,81],[5,2,79],[5,3,76],[5,6,74],
  [6,0,72],[6,2,76],[6,4,81],[6,6,79],
  [7,0,79],[7,3,76],[7,4,74]
];
// Vòng thứ hai thưa hơn để nghe lâu không mệt.
const MELODY_B = [[0,0,79],[0,4,76],[2,0,81],[2,4,77],[4,0,84],[4,4,79],[6,0,81],[6,4,76],[7,4,74]];

export function createMusic(offline) {
  let ctx = null, master, dry, wet, timer = null, nextTime = 0, step = 0, loop = 0, noise;

  function setup() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!offline && !AC) return false;
    ctx = offline || new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3;
    master = ctx.createGain(); master.gain.value = 0;
    master.connect(comp); comp.connect(ctx.destination);
    dry = ctx.createGain(); dry.gain.value = 0.8; dry.connect(master);
    // Vang nhẹ: impulse response tự tạo từ nhiễu tắt dần.
    const len = ctx.sampleRate * 2.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6; }
    const verb = ctx.createConvolver(); verb.buffer = ir;
    wet = ctx.createGain(); wet.gain.value = 0.32; wet.connect(verb); verb.connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    return true;
  }

  const out = (node, send = 0.3) => { node.connect(dry); const s = ctx.createGain(); s.gain.value = send; node.connect(s); s.connect(wet); };

  function pad(t, notes, dur) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1300; lp.Q.value = 0.3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.045, t + 0.5);
    g.gain.setValueAtTime(0.045, t + dur - 0.3); g.gain.linearRampToValueAtTime(0, t + dur + 0.6);
    lp.connect(g); out(g, 0.5);
    for (const n of notes) for (const [type, det] of [['triangle', -5], ['sine', 6]]) {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = hz(n); o.detune.value = det;
      o.connect(lp); o.start(t); o.stop(t + dur + 0.7);
    }
  }

  function bass(t, n, dur) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = hz(n);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.16, t + 0.03); g.gain.exponentialRampToValueAtTime(0.03, t + dur);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.1);
    o.connect(g); out(g, 0.05); o.start(t); o.stop(t + dur + 0.15);
  }

  function bell(t, n, vel = 1) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.09 * vel, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0008, t + 1.6);
    out(g, 0.45);
    for (const [mult, amp] of [[1, 1], [2, 0.28], [3.01, 0.1], [4.2, 0.04]]) {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = hz(n) * mult;
      const a = ctx.createGain(); a.gain.value = amp; o.connect(a); a.connect(g); o.start(t); o.stop(t + 1.7);
    }
  }

  function shaker(t, vel) {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.018 * vel, t); g.gain.exponentialRampToValueAtTime(0.0005, t + 0.06);
    s.connect(hp); hp.connect(g); out(g, 0.1); s.start(t); s.stop(t + 0.08);
  }

  function thump(t) {
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.14);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.13, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(g); out(g, 0); o.start(t); o.stop(t + 0.25);
  }

  function schedule(s, t) {
    const bar = Math.floor(s / 8), inBar = s % 8, chord = CHORDS[bar];
    if (inBar === 0) { pad(t, chord.pad, STEP * 8); bass(t, chord.bass, STEP * 3); }
    if (inBar === 5) bass(t, chord.bass + (bar % 2 ? 7 : 12), STEP * 2.5);
    if (inBar === 0 || inBar === 4) thump(t);
    if (inBar % 2) shaker(t, inBar === 3 || inBar === 7 ? 1 : 0.6);
    for (const [b, st, n] of loop % 2 ? MELODY_B : MELODY_A) if (b === bar && st === inBar) bell(t, n, loop % 2 ? 0.8 : 1);
  }

  function tick() {
    while (nextTime < ctx.currentTime + 0.15) {
      schedule(step, nextTime + (step % 2 ? STEP * SWING * 2 : 0));
      nextTime += STEP;
      step = (step + 1) % STEPS;
      if (step === 0) loop++;
    }
  }

  return {
    // Dựng sẵn toàn bộ nhạc vào một OfflineAudioContext (dùng để kiểm tra mức âm lượng).
    renderAll(seconds) {
      setup(); master.gain.value = 0.8;
      for (let t = 0.05; t < seconds - 1; ) { schedule(step, t + (step % 2 ? STEP * SWING * 2 : 0)); t += STEP; step = (step + 1) % STEPS; if (step === 0) loop++; }
      return ctx.startRendering();
    },
    get playing() { return !!timer; },
    // Gọi trong sự kiện bấm/chạm để trình duyệt cho phép phát âm thanh.
    start() {
      if (timer) return true;
      if (!ctx && !setup()) return false;
      ctx.resume();
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now); master.gain.setValueAtTime(master.gain.value, now); master.gain.linearRampToValueAtTime(0.8, now + 2.5);
      nextTime = now + 0.1; step = 0;
      timer = setInterval(tick, 30); tick();
      return true;
    },
    stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now); master.gain.setValueAtTime(master.gain.value, now); master.gain.linearRampToValueAtTime(0, now + 0.6);
      setTimeout(() => { if (!timer) ctx.suspend(); }, 700);
    }
  };
}
