// Tiny WebAudio synth SFX — no audio assets needed.
const ctxRef = { current: null };

const getCtx = () => {
  if (!ctxRef.current) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    ctxRef.current = Ctor ? new Ctor() : null;
  }
  return ctxRef.current;
};

const blip = (freqStart, freqEnd, duration, type = "square", volume = 0.04) => {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
    // audio unavailable — stay silent
  }
};

export const sfx = {
  unlock() {
    try {
      getCtx()?.resume?.();
    } catch {
      /* noop */
    }
  },
  shoot: () => blip(700, 220, 0.08),
  thud: () => blip(200, 70, 0.1, "sawtooth", 0.03),
  ding: () => blip(880, 1320, 0.14, "triangle", 0.05),
  coin: () => blip(988, 1568, 0.12, "square", 0.035),
  open: () => blip(523, 784, 0.2, "triangle", 0.05),
  squish: () => blip(300, 60, 0.18, "sawtooth", 0.045),
};
