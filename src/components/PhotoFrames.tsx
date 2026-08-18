/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, Download, MapPin, X, ArrowLeft, ArrowRight, Heart, Share2, ZoomIn } from 'lucide-react';
import { PhotoFrame } from '../types';
import { playShutterSound, playPopSound, playKeyClickSound } from '../utils/soundEffects';


const CURATED_FRAMES: PhotoFrame[] = [
  {
    id: 'frame-1',
    title: 'Arachnid Alert',
    subtitle: 'Wall Crawler',
    url: 'https://images.unsplash.com/photo-1714631062530-4125f1015137?q=80&w=800&auto=format&fit=crop',
    views: '845',
    downloads: '41',
    location: 'Inside Your Nightmares, India',
    camera: 'Spooky Snaps',
    settings: 'Available on Unsplash',
    description: 'Spotted a leggy little wall-dweller chilling by the door. Just your casual, multi-legged roommate doing its thing',
    unsplashUrl: 'https://unsplash.com/photos/9M-Y580a7wE',
    weirdLore: { vibe: '🕸️ 3:00 AM Jumpscare', weirdFact: 'Taught it how to quit Vim' }
  },
  {
    id: 'frame-2',
    title: 'SUNSET ON A STEM',
    subtitle: 'Neon Nature',
    url: 'https://images.unsplash.com/photo-1694444778778-65f5d412899f?q=80&w=800&auto=format&fit=crop',
    views: '779',
    downloads: '39',
    location: 'Secret gadern',
    camera: 'Moody Botanicals',
    settings: 'Available on Unsplash',
    description: 'This tiny flower is flexing some serious orange and red gradients to outshine the absolute darkness around it.',
    unsplashUrl: 'https://unsplash.com/photos/Ti7Fyz5kxf8',
    weirdLore: { vibe: '🌺 Cyberpunk Botanics', weirdFact: 'Photosynthesizes RGB lights' }
  },
  {
    id: 'frame-3',
    title: 'THE POCKET SHIP',
    subtitle: 'The Micro Voyager',
    url: 'https://images.unsplash.com/photo-1706900961630-33ca9d775443?q=80&w=800&auto=format&fit=crop',
    views: '33,444',
    downloads: '216',
    location: 'Sector 7, Kitchen Table',
    camera: 'The box of treasure',
    settings: 'Available on Unsplash',
    description: 'A sleek teal and black mini cruiser ready to warp through your living room at the speed of imagination.',
    unsplashUrl: 'https://unsplash.com/photos/a-toy-car-sitting-on-top-of-a-wooden-table-tgz8Eo9qU0w',
    weirdLore: { vibe: '🏎️ Hot Wheels Warp Drive', weirdFact: 'Zero emissions, runs on nostalgia' }
  },
  {
    id: 'frame-4',
    title: 'THE LONELY GLOW-UP',
    subtitle: 'Solo spark',
    url: 'https://images.unsplash.com/photo-1721498033318-0701c5c00bcf?q=80&w=800&auto=format&fit=crop',
    views: '578',
    downloads: '52',
    location: 'The Void, Universe',
    camera: 'The flamey flame',
    settings: 'Available on Unsplash',
    description: 'One tiny candle absolutely carrying the team against an entire room full of pure, unadulterated darkness.',
    unsplashUrl: 'https://unsplash.com/photos/6VQLWVs9qY8',
    weirdLore: { vibe: '🕯️ Dark Souls Bonfire', weirdFact: 'Keeps the void bugs away' }

  },
  {
    id: 'frame-5',
    title: 'THE LONELY PLANT',
    subtitle: 'Spark of joy',
    url: 'https://images.unsplash.com/photo-1745362803735-a32f4998c112?q=80&w=800&auto=format&fit=crop',
    views: '296',
    downloads: '20',
    location: 'Procrastination Station, Bedroom',
    camera: 'The white in black',
    settings: 'Available on Unsplash',
    description: 'A single lamp fighting for its life to illuminate a desk, a plant, and someone\'s unfinished homework assignments.',
    unsplashUrl: 'https://unsplash.com/photos/z2Qs7ipL6pc',
    weirdLore: { vibe: '💡 Late Night Coding', weirdFact: 'Listens to lo-fi on repeat' }

  }
];

export default function PhotoFrames() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lovedFrames, setLovedFrames] = useState<Record<string, boolean>>({});
  const [previewIndex, setPreviewIndex] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Unsplash stats state (auto-updates live from Unsplash API)
  const [unsplashStats, setUnsplashStats] = useState({
    views: '249,477+',
    downloads: '2,293+',
    photosCount: '40+',
    ranking: 'Top 25%'
  });

  // Per-photo live stats cache (photoId -> { views, downloads })
  const [photoStatsMap, setPhotoStatsMap] = useState<Record<string, { views: string; downloads: string }>>({});

  useEffect(() => {
    const fetchLiveUnsplashStats = async () => {
      try {
        const res = await fetch('https://unsplash.com/napi/users/baanbhaba/statistics');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.views && data.downloads) {
          const viewsNum = Number(data.views.total).toLocaleString('en-US');
          const downloadsNum = Number(data.downloads.total).toLocaleString('en-US');
          setUnsplashStats({
            views: `${viewsNum}`,
            downloads: `${downloadsNum}`,
            photosCount: '40+',
            ranking: 'Top 25%'
          });
        }
      } catch {
        // Keeps fallback stats if network is offline
      }
    };

    fetchLiveUnsplashStats();
  }, []);

  // Fetch per-photo live statistics when lightbox is opened / photo changed
  useEffect(() => {
    const activePhoto = CURATED_FRAMES[currentIndex];
    if (!activePhoto || !activePhoto.unsplashUrl) return;

    // Extract photo slug from unsplashUrl (e.g. "https://unsplash.com/photos/9M-Y580a7wE" -> "9M-Y580a7wE")
    const parts = activePhoto.unsplashUrl.split('/photos/');
    const slug = parts[1]?.trim();
    if (!slug || photoStatsMap[slug]) return;

    const fetchSinglePhotoStats = async () => {
      try {
        const res = await fetch(`https://unsplash.com/napi/photos/${slug}/statistics`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.views && data.downloads) {
          const v = Number(data.views.total).toLocaleString('en-US');
          const d = Number(data.downloads.total).toLocaleString('en-US');
          setPhotoStatsMap((prev) => ({
            ...prev,
            [slug]: { views: v, downloads: d }
          }));
        }
      } catch {
        // Keeps frame default fallback
      }
    };

    fetchSinglePhotoStats();
  }, [currentIndex]);

  const handleRollRandom = () => {
    playKeyClickSound();
    let nextIdx = Math.floor(Math.random() * CURATED_FRAMES.length);
    if (nextIdx === previewIndex) {
      nextIdx = (previewIndex + 1) % CURATED_FRAMES.length;
    }
    setPreviewIndex(nextIdx);
  };

  const handlePrev = () => {
    playShutterSound();
    setCurrentIndex((prev) => (prev === 0 ? CURATED_FRAMES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playShutterSound();
    setCurrentIndex((prev) => (prev === CURATED_FRAMES.length - 1 ? 0 : prev + 1));
  };

  const toggleLove = (id: string) => {
    playPopSound();
    setLovedFrames((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeFrame = CURATED_FRAMES[currentIndex]!;
  const previewFrame = CURATED_FRAMES[previewIndex]!;

  return (
    <section id="photography" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Card 3: /FRAMES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-cream border-2 border-turmeric rounded-2xl p-5 md:p-8 shadow-solid-rose flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transform -rotate-1 hover:rotate-0 hover:scale-[1.005] transition-transform duration-200 will-change-transform"
        >
          {/* Saffron design diamond background decoration */}
          <div className="absolute top-[-25px] left-[-25px] opacity-10">
            <div className="w-16 h-16 bg-saffron border border-black transform rotate-45" />
          </div>

          {/* Left Textual Details */}
          <div className="flex-1 space-y-3 text-left z-10">
            <div className="space-y-3">
              <div className="pb-1">
                <h2 className="font-display text-4xl sm:text-5xl text-white bg-[#c2513a] px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform -rotate-2 select-none">
                  /FRAMES
                </h2>
              </div>

              {/* Rich Unsplash Metrics Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1 rounded-lg border border-black/10 font-mono text-xs text-on-surface font-bold">
                  <Eye className="w-3.5 h-3.5 text-terracotta" />
                  <span>{unsplashStats.views} Views</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1 rounded-lg border border-black/10 font-mono text-xs text-on-surface font-bold">
                  <Download className="w-3.5 h-3.5 text-deep-rose" />
                  <span>{unsplashStats.downloads} Downloads</span>
                </div>
                <div className="flex items-center gap-1.5 bg-saffron/20 text-black px-2.5 py-1 rounded-lg border border-saffron/40 font-mono text-[11px] font-black">
                  <span>🏆 {unsplashStats.ranking} Contributor</span>
                </div>
              </div>
            </div>

            <blockquote className="font-serif italic text-base md:text-lg text-on-surface leading-relaxed pt-1">
              "Top 25% of contributors on Unsplash. Used in Notion, PicsArt, & blogs worldwide."
            </blockquote>

            {/* View Gallery Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  playShutterSound();
                  setCurrentIndex(previewIndex);
                  setLightboxOpen(true);
                }}
                className="bg-[#c2513a] text-white font-sans font-extrabold text-xs tracking-wider px-5 py-3 rounded-lg border-2 border-black hover:bg-terracotta hover:shadow-solid-dark transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Camera className="w-4 h-4" />
                View Gallery
              </button>

              <a
                href="https://unsplash.com/@baanbhaba"
                target="_blank"
                rel="noreferrer"
                onClick={() => playKeyClickSound()}
                className="bg-white text-black font-sans font-extrabold text-xs tracking-wider px-5 py-3 rounded-lg border-2 border-black hover:bg-gray-100 hover:shadow-solid-dark transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>📸</span>
                @baanbhaba
              </a>
            </div>
          </div>

          {/* Right Polaroid Photo Preview with Shuffler */}
          <div className="flex flex-col items-center gap-3 z-10">
            <motion.div
              onClick={() => {
                playShutterSound();
                setCurrentIndex(previewIndex);
                setLightboxOpen(true);
              }}
              whileHover={{ scale: 1.03 }}
              className="w-48 h-64 md:w-52 md:h-72 bg-white p-2.5 pb-6 rounded shadow-md border border-gray-200 transform rotate-2 cursor-pointer transition-transform duration-200 flex-shrink-0 relative will-change-transform"
              title="click to inspect photo in high res 📸"
            >
              <div className="w-full h-[85%] bg-gray-100 rounded overflow-hidden relative">
                <img
                  src={previewFrame.url}
                  alt={previewFrame.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-15 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white p-1 rounded-full border border-white/20">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-center font-serif italic text-[11px] text-gray-500 mt-2 truncate w-full px-1">
                {previewFrame.title}
              </div>
            </motion.div>

            {/* Interactive Shuffle Trigger */}
            <button
              onClick={handleRollRandom}
              className="font-mono text-[10px] text-terracotta hover:text-deep-rose font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-white/50 hover:bg-white/80 px-2.5 py-1 rounded-full border border-black/10 shadow-sm transition-all duration-200"
            >
              <span>🎲</span> Shuffle Preview
            </button>
          </div>
        </motion.div>

      {/* Enlarged Gallery Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120b0a]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Outer Widescreen Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-cream border-4 border-black rounded-2xl w-full max-w-5xl max-h-[92vh] shadow-solid-dark relative overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Left Column: Image Viewer */}
              <div className="lg:w-7/12 bg-[#120b0a] relative flex items-center justify-center min-h-[300px] sm:min-h-[420px] select-none border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                <img
                  src={activeFrame.url}
                  alt={activeFrame.title}
                  className="w-full h-full max-h-[60vh] lg:max-h-[85vh] object-contain block mx-auto p-4"
                  referrerPolicy="no-referrer"
                />

                {/* Left Navigation Arrow */}
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/75 hover:bg-saffron hover:text-black border-2 border-black rounded-full text-white cursor-pointer transition-all z-20 shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/75 hover:bg-saffron hover:text-black border-2 border-black rounded-full text-white cursor-pointer transition-all z-20 shadow-md active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Column: Metadata & Thumbnail Reel */}
              <div className="lg:w-5/12 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[92vh] space-y-4">
                <div className="space-y-4">
                  {/* Title & Favorite Header */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10 pr-10">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-terracotta leading-tight uppercase">
                        {activeFrame.title}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-deep-rose mt-0.5">
                        {activeFrame.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleLove(activeFrame.id)}
                      className="p-2 rounded-xl hover:bg-black/5 border-2 border-black bg-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5"
                      title={lovedFrames[activeFrame.id] ? "unlove photo 💔" : "drop a heart 💖"}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          lovedFrames[activeFrame.id] ? 'fill-red-500 text-red-500' : 'text-black'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-on-surface leading-relaxed font-medium">
                    {activeFrame.description}
                  </p>

                  {/* Badges/Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-surface border-2 border-black rounded-xl p-3 shadow-solid-dark">
                      <span className="font-mono text-[9px] tracking-widest text-indigo-blue uppercase font-black block mb-1">
                        LOCATION
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-on-surface truncate">
                        <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                        <span className="truncate">{activeFrame.location}</span>
                      </div>
                    </div>

                    <div className="bg-surface border-2 border-black rounded-xl p-3 shadow-solid-dark">
                      <span className="font-mono text-[9px] tracking-widest text-indigo-blue uppercase font-black block mb-1">
                        PHOTO LORE & VIBE
                      </span>
                      {activeFrame.weirdLore && (
                        <div className="space-y-1.5 mt-1 font-mono text-[10px] font-black">
                          <span className="inline-block bg-saffron/30 text-black px-2.5 py-1 rounded border border-black/20 font-bold">
                            {activeFrame.weirdLore.vibe}
                          </span>
                          <p className="bg-black/5 text-gray-800 italic px-2.5 py-1.5 rounded border border-black/10 font-sans text-xs leading-snug">
                            💡 <span className="font-bold">Lore:</span> {activeFrame.weirdLore.weirdFact}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Photo Stats Bar */}
                  {(() => {
                    const slug = activeFrame.unsplashUrl?.split('/photos/')[1]?.trim() || '';
                    const liveStats = photoStatsMap[slug];
                    const displayViews = liveStats ? `${liveStats.views}` : activeFrame.views;
                    const displayDownloads = liveStats ? `${liveStats.downloads}` : activeFrame.downloads;
                    return (
                      <div className="flex items-center justify-between p-3 bg-black/5 border border-black/10 rounded-xl font-mono text-xs text-gray-700 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-indigo-blue" />
                          {displayViews} Views {liveStats && <span className="text-[9px] text-emerald-600 font-black">LIVE</span>}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5 text-indigo-blue" />
                          {displayDownloads} Downloads {liveStats && <span className="text-[9px] text-emerald-600 font-black">LIVE</span>}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Thumbnail Quick Selector Reel */}
                  <div>
                    <span className="font-mono text-[10px] font-bold text-dusty-rose uppercase tracking-wider block mb-2">
                      GALLERY THUMBNAILS:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {CURATED_FRAMES.map((frame, index) => (
                        <button
                          key={frame.id}
                          onClick={() => {
                            playShutterSound();
                            setCurrentIndex(index);
                          }}
                          className={`w-12 h-12 rounded-lg border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                            currentIndex === index
                              ? 'border-saffron scale-105 shadow-md'
                              : 'border-black/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={frame.url} alt={frame.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Action */}
                <div className="pt-2">
                  <a
                    href={activeFrame.unsplashUrl || "https://unsplash.com/@baanbhaba"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-saffron text-black font-sans font-black text-xs uppercase tracking-wider border-2 border-black rounded-xl hover:bg-turmeric transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 text-center"
                  >
                    <span>📸</span>
                    {activeFrame.unsplashUrl ? 'Open Original on Unsplash' : 'See @baanbhaba on Unsplash'}
                  </a>
                </div>
              </div>

              {/* Floating Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-3 right-3 p-2 bg-black hover:bg-red-600 border-2 border-black text-white rounded-full transition-all cursor-pointer shadow-md z-30"
                title="Close enlarge window"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
