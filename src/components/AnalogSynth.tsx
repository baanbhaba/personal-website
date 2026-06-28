/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Disc,
  Sparkles,
  ExternalLink,
  Music,
  Volume2,
  Star,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ListMusic
} from 'lucide-react';

interface ArtistConfig {
  id: string;
  name: string;
  albumTitle: string;
  embedUrl: string;
  accentColor: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
  bgClass: string;
  badges: string[];
  description: string;
  whyILove: string;
  favTracks: string[];
  coverUrl: string;
}

const ARTISTS: ArtistConfig[] = [
  {
    id: 'kendrick',
    name: 'Kendrick Lamar',
    albumTitle: 'good kid, m.A.A.d city',
    embedUrl: 'https://music.apple.com/us/album/good-kid-m-a-a-d-city-deluxe-version/624828744',
    accentColor: 'bg-terracotta',
    borderColor: 'border-terracotta',
    textColor: 'text-terracotta',
    shadowColor: 'shadow-solid-dark',
    bgClass: 'bg-[#faf3e8]',
    badges: ['PULITZER PRIZE', "COMPTON'S OWN", 'NARRATIVE GENIUS'],
    description: 'The absolute pinnacle of narrative-driven storytelling in hip-hop. Every track operates as a scene in a short film.',
    whyILove: 'His structural complexity and lyrical rhythm are unmatched. He writes poetry disguised as high-octane rap anthems.',
    favTracks: ['Money Trees', 'm.A.A.d city', 'Alright', 'Wesley\'s Theory'],
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'frank',
    name: 'Frank Ocean',
    albumTitle: 'Blonde',
    embedUrl: 'https://music.apple.com/us/album/blonde/1144886430',
    accentColor: 'bg-deep-rose',
    borderColor: 'border-deep-rose',
    textColor: 'text-deep-rose',
    shadowColor: 'shadow-solid-rose',
    bgClass: 'bg-[#fff5f5]',
    badges: ["BOYS DON'T CRY", 'NOSTALGIA', 'SOUL VIBES'],
    description: 'Ethereal, boundary-pushing R&B that captures the exact feeling of mid-summer nostalgia, fleeting youth, and heartbreak.',
    whyILove: 'The vocal processing and fluid song structures of Blonde completely reinvented how I listen to alternative music.',
    favTracks: ['Nikes', 'Nights', 'Pink + White', 'Self Control'],
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'fred',
    name: 'Fred again..',
    albumTitle: 'Actual Life 3',
    embedUrl: 'https://music.apple.com/us/album/actual-life-3-january-1-september-9-2022/1641885669',
    accentColor: 'bg-saffron',
    borderColor: 'border-black',
    textColor: 'text-terracotta',
    shadowColor: 'shadow-solid-dark',
    bgClass: 'bg-[#fdf9f0]',
    badges: ['EMOTIONAL HOUSE', 'ACTUAL LIFE', 'USB SOUNDS'],
    description: 'Blending organic ambient field recordings, vocal voice notes from friends, and high-energy electronic club anthems.',
    whyILove: 'He makes club music feel incredibly intimate. It is euphoric dance energy layered with absolute cinematic vulnerability.',
    favTracks: ['Delilah (pull me out of this)', 'Marea (we\'ve lost dancing)', 'Rumble', 'Adore u'],
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'kanye',
    name: 'Kanye West',
    albumTitle: 'MBDTF',
    embedUrl: 'https://music.apple.com/us/album/my-beautiful-dark-twisted-fantasy/1440742903',
    accentColor: 'bg-[#930c10]',
    borderColor: 'border-[#930c10]',
    textColor: 'text-[#930c10]',
    shadowColor: 'shadow-solid-dark',
    bgClass: 'bg-[#fff1f1]',
    badges: ['MAXIMALIST ART', 'SONIC ARCHITECT', '808s HEARTBREAK'],
    description: 'A masterpiece in orchestral-scale hip-hop production. Bold, decadent, and structurally groundbreaking.',
    whyILove: 'The layers of live instruments, gospel choirs, synth pads, and raw vocal performances redefine grand sonic architecture.',
    favTracks: ['Runaway', 'Devil In A New Dress', 'Flashing Lights', 'Ghost Town'],
    coverUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&q=80&w=200',
  },
];

export default function AnalogSynth() {
  const [activeTab, setActiveTab] = useState<string>('kendrick');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(45); // starts at 45s
  const [volume, setVolume] = useState<number>(80);

  const activeArtist = ARTISTS.find((a) => a.id === activeTab) || ARTISTS[0];
  const trackCount = activeArtist.favTracks.length;

  // Reset track index if artist changes
  useEffect(() => {
    setTrackIndex(0);
    setCurrentTime(Math.floor(Math.random() * 30) + 15);
  }, [activeTab]);

  // Audio timer ticker emulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 234) { // Track duration set to 234 seconds (3:54)
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % trackCount);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + trackCount) % trackCount);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const currentTrackName = activeArtist.favTracks[trackIndex];
  const progressPercent = (currentTime / 234) * 100;

  return (
    <div className="lg:col-span-2 flex flex-col justify-between">
      {/* Card 4: /MUSIC with dynamic tilts and hover response */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="bg-indigo-blue border-2 border-black rounded-2xl p-6 md:p-8 shadow-solid-rose text-white flex flex-col justify-between h-full relative overflow-hidden transform rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
      >
        {/* Creative sticker overlay for pizzazz */}
        <div className="absolute top-3 right-3 opacity-90 z-10 pointer-events-none transform rotate-12 bg-saffron text-black border border-black font-sans font-bold text-[10px] tracking-widest px-2.5 py-1 rounded shadow-sm">
          ANIRBAAN'S HEAVY ROTATION ⚡
        </div>

        <div className="space-y-4 z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-4xl sm:text-5xl text-black bg-turmeric px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform -rotate-1 select-none">
                /MUSIC
              </h2>
              <Music className="w-6 h-6 text-saffron animate-bounce" />
            </div>
            <p className="font-serif italic text-lg text-saffron mt-1">
              The Soundscape of My Life
            </p>
          </div>

          <p className="font-sans text-sm leading-relaxed text-dusty-rose font-medium">
            I don't collect music for vanity. This section is reserved for the absolute legends and musical heavyweights whose sonic architecture moves me the most.
          </p>

          {/* Tab buttons for selecting artists */}
          <div className="flex flex-wrap gap-2 pt-2 pb-1">
            {ARTISTS.map((artist) => (
              <button
                key={artist.id}
                onClick={() => setActiveTab(artist.id)}
                className={`px-3 py-1.5 rounded-lg font-sans font-bold text-xs tracking-wider border transition-all cursor-pointer ${
                  activeTab === artist.id
                    ? 'bg-saffron text-black border-black shadow'
                    : 'bg-black/40 text-dusty-rose border-white/10 hover:text-white hover:bg-black/60'
                }`}
              >
                {artist.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Artist Vinyl Cardboard Sleeve Experience */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArtist.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 ${activeArtist.bgClass} text-black border-2 border-black rounded-xl p-4 md:p-5 relative overflow-hidden flex flex-col justify-between ${activeArtist.shadowColor} transform -rotate-1 hover:rotate-0 transition-all duration-300`}
          >
            {/* Dynamic Card Background Kolam Watermark */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={activeArtist.textColor}>
                <circle cx="50" cy="50" r="40" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" strokeWidth="1" />
                <path d="M 10 50 L 90 50 M 50 10 L 50 90" strokeWidth="1" />
              </svg>
            </div>

            {/* Artist Header Info */}
            <div className="flex items-start justify-between border-b border-black/10 pb-3 mb-3">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-black/50 block uppercase font-bold">RECOMMENDED ARTIST</span>
                <h3 className="font-display text-2xl tracking-wide text-black flex items-center gap-1.5 mt-0.5">
                  {activeArtist.name}
                  <Sparkles className="w-4 h-4 text-terracotta" />
                </h3>
              </div>
              <div className={`p-1.5 rounded-full ${activeArtist.accentColor} text-white shadow-sm`}>
                <Disc className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {activeArtist.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-black text-white font-sans font-extrabold text-[8px] tracking-widest px-2 py-0.5 rounded"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Mini review of the artist */}
            <div className="space-y-2 mb-4">
              <p className="font-sans text-xs font-semibold leading-relaxed text-black/75">
                "{activeArtist.description}"
              </p>
              <div className="bg-black/5 p-2 rounded border border-black/5 font-serif italic text-xs text-black/80 flex gap-1.5 items-start">
                <Star className="w-4 h-4 text-terracotta fill-current flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Why I vibe:</strong> {activeArtist.whyILove}
                </span>
              </div>
            </div>

            {/* Interactive Custom Cassette Deck Player UI (No Iframe needed) */}
            <div className="mb-4 bg-black border-2 border-black rounded-xl p-3 text-white shadow-lg relative overflow-hidden">
              {/* LED Lights */}
              <div className="absolute top-2 right-3 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold">STEREO FEED</span>
              </div>

              {/* Ticker screen */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-2.5 font-mono mb-3">
                <div className="flex justify-between items-center text-[10px] text-saffron/80 font-bold tracking-tight mb-1">
                  <span className="truncate max-w-[120px] uppercase">{activeArtist.albumTitle}</span>
                  <span className="text-gray-500">TRACK {trackIndex + 1}/{trackCount}</span>
                </div>
                <div className="text-xs text-white font-bold truncate tracking-wide flex items-center gap-1.5 py-0.5">
                  <Music className="w-3 h-3 text-terracotta" />
                  <span>{currentTrackName}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 pt-1 border-t border-gray-800/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>03:54</span>
                </div>
              </div>

              {/* Equalizer Frequency bars */}
              <div className="flex items-end justify-center gap-1 h-8 px-2 mb-3 bg-gray-950/60 rounded border border-gray-900 overflow-hidden">
                {[12, 24, 18, 30, 10, 15, 28, 22, 14, 25, 19, 8, 16, 26, 12, 20].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      height: [height / 2, height, height / 3, height * 0.9, height / 2]
                    } : { height: 4 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1 + (i % 3) * 0.25,
                      ease: 'easeInOut'
                    }}
                    className="flex-1 bg-gradient-to-t from-terracotta via-saffron to-deep-rose rounded-t-sm"
                    style={{ height: 4 }}
                  />
                ))}
              </div>

              {/* Scrubber timeline */}
              <div className="space-y-1.5 mb-3.5">
                <div
                  className="h-1.5 w-full bg-gray-800 rounded-full cursor-pointer overflow-hidden relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const widthPercent = clickX / rect.width;
                    setCurrentTime(Math.floor(widthPercent * 234));
                  }}
                >
                  <div
                    className="h-full bg-saffron transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Deck Buttons */}
              <div className="flex items-center justify-between">
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  className="p-1.5 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white cursor-pointer"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="px-4 py-1.5 bg-saffron hover:bg-saffron/90 text-black rounded-lg font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      PAUSE
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      PLAY
                    </>
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="p-1.5 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white cursor-pointer"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Volume slider control */}
                <div className="flex items-center gap-1.5 max-w-[80px]">
                  <Volume2 className="w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-saffron"
                  />
                </div>
              </div>
            </div>

            {/* List of other great tracks for this artist */}
            <div className="bg-white/50 border border-black/5 rounded-lg p-3">
              <span className="font-mono text-[9px] text-black/50 block uppercase font-bold mb-2 flex items-center gap-1">
                <ListMusic className="w-3.5 h-3.5 text-terracotta" />
                ALBUM TRACKLIST (CLICK TO SPIN):
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-sans font-bold">
                {activeArtist.favTracks.map((track, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTrackIndex(i);
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className={`flex items-center gap-1.5 p-1 rounded text-left transition-colors cursor-pointer ${
                      trackIndex === i
                        ? 'bg-black text-white'
                        : 'text-black/85 hover:bg-black/5'
                    }`}
                  >
                    <span className={trackIndex === i ? 'text-saffron' : 'text-terracotta'}>
                      {trackIndex === i && isPlaying ? '🎵' : '✦'}
                    </span>
                    <span className="truncate">{track}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleeve Footer stamp */}
            <div className="mt-4 pt-2 border-t border-black/5 flex items-center justify-between text-[9px] font-mono text-black/40">
              <span>LP ALBUM: {activeArtist.albumTitle}</span>
              <a
                href={activeArtist.embedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-0.5 hover:text-black font-bold"
              >
                Listen on Apple Music
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
