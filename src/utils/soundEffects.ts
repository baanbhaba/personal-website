/**
 * Pre-loaded Local Audio File Player
 * Loads static local audio files (/click.wav, /shutter.wav, /pop.wav) from the public/ folder for instant playback.
 */

let soundMuted = false;

export const setSoundMuted = (muted: boolean) => {
  soundMuted = muted;
};

export const getSoundMuted = () => soundMuted;

// Pre-create Audio Element pools for zero-delay instant playback
const createAudioPool = (src: string, count = 4) => {
  if (typeof window === 'undefined') return [];
  const pool: HTMLAudioElement[] = [];
  for (let i = 0; i < count; i++) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = 1.0;
    pool.push(audio);
  }
  return pool;
};

const clickPool = createAudioPool('/click.wav');
const shutterPool = createAudioPool('/shutter.wav');
const popPool = createAudioPool('/pop.wav');

let clickIdx = 0;
let shutterIdx = 0;
let popIdx = 0;

const playFromPool = (pool: HTMLAudioElement[], getIdx: () => number, setIdx: (n: number) => void) => {
  if (soundMuted || !pool.length) return;
  const idx = getIdx();
  const audio = pool[idx];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
  setIdx((idx + 1) % pool.length);
};

export const playKeyClickSound = () => {
  playFromPool(clickPool, () => clickIdx, (n) => { clickIdx = n; });
};

export const playShutterSound = () => {
  playFromPool(shutterPool, () => shutterIdx, (n) => { shutterIdx = n; });
};

export const playPopSound = () => {
  playFromPool(popPool, () => popIdx, (n) => { popIdx = n; });
};
