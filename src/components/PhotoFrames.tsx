/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, Download, MapPin, X, ArrowLeft, ArrowRight, Heart, Share2, ZoomIn } from 'lucide-react';
import { PhotoFrame } from '../types';
import AnalogSynth from './AnalogSynth';

const CURATED_FRAMES: PhotoFrame[] = [
  {
    id: 'frame-1',
    title: 'A man sitting on a wooden bench',
    subtitle: 'Kolkata, West Bengal, India',
    url: 'https://images.unsplash.com/photo-1714631062530-4125f1015137?q=80&w=800&auto=format&fit=crop',
    views: '112,400+',
    downloads: '1,120+',
    location: 'Kolkata, India',
    camera: 'Street Photography',
    settings: 'Available on Unsplash',
    description: 'A nostalgic black and white street capture of an elderly man resting on a roadside bench under the historic streetscapes of Kolkata.',
    unsplashUrl: 'https://unsplash.com/photos/pk2EQOo1pys'
  },
  {
    id: 'frame-2',
    title: 'Street silhouette in motion',
    subtitle: 'Kolkata, West Bengal, India',
    url: 'https://images.unsplash.com/photo-1694444778778-65f5d412899f?q=80&w=800&auto=format&fit=crop',
    views: '45,800+',
    downloads: '410+',
    location: 'Kolkata, India',
    camera: 'Street Photography',
    settings: 'Available on Unsplash',
    description: 'A candid motion-blur street photo capturing a hurried pedestrian crossing the busy roads of Kolkata.',
    unsplashUrl: 'https://unsplash.com/photos/6VQLWVs9qY8'
  },
  {
    id: 'frame-3',
    title: 'Companionship on the streets',
    subtitle: 'Old City, Hyderabad, India',
    url: 'https://images.unsplash.com/photo-1706900961630-33ca9d775443?q=80&w=800&auto=format&fit=crop',
    views: '38,900+',
    downloads: '290+',
    location: 'Hyderabad, India',
    camera: 'Street Photography',
    settings: 'Available on Unsplash',
    description: 'A gentle morning shot of a man and a friendly street dog resting beside each other on a public bench in Hyderabad.',
    unsplashUrl: 'https://unsplash.com/photos/9M-Y580a7wE'
  },
  {
    id: 'frame-4',
    title: 'Monsoon night bokeh',
    subtitle: 'Rainy city streets of Hyderabad',
    url: 'https://images.unsplash.com/photo-1721498033318-0701c5c00bcf?q=80&w=800&auto=format&fit=crop',
    views: '45,836+',
    downloads: '430+',
    location: 'Hyderabad, India',
    camera: 'Street Photography',
    settings: 'Available on Unsplash',
    description: 'A beautiful atmospheric capture of glowing street lights and wet city reflections during a rainy evening in Hyderabad.'
  },
  {
    id: 'frame-5',
    title: 'Daily life near Charminar',
    subtitle: 'Bustling bazaar, Hyderabad',
    url: 'https://images.unsplash.com/photo-1745362803735-a32f4998c112?q=80&w=800&auto=format&fit=crop',
    views: '95,430+',
    downloads: '880+',
    location: 'Hyderabad, India',
    camera: 'Street Photography',
    settings: 'Available on Unsplash',
    description: 'A beautiful candid frame of street vendors, passing auto-rickshaws, and daily choreography near Hyderabad\'s historic Charminar.'
  }
];

export default function PhotoFrames() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lovedFrames, setLovedFrames] = useState<Record<string, boolean>>({});
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // State to track which frame is showing in the polaroid preview card
  const [previewIndex, setPreviewIndex] = useState(0);

  // Set a random preview index on mount
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CURATED_FRAMES.length);
    setPreviewIndex(randomIndex);
  }, []);

  const handleRollRandom = (e: React.MouseEvent) => {
    e.stopPropagation();
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * CURATED_FRAMES.length);
    } while (nextIndex === previewIndex && CURATED_FRAMES.length > 1);
    setPreviewIndex(nextIndex);
  };

  const activeFrame = CURATED_FRAMES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CURATED_FRAMES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CURATED_FRAMES.length) % CURATED_FRAMES.length);
  };

  const toggleLove = (id: string) => {
    setLovedFrames(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerDownload = (id: string) => {
    setDownloadSuccess(id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <section id="photography" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Grid Container for Card Row (Left: Frames, Right: Music in Next Component) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        
        {/* Card 3: /FRAMES (60% width on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 bg-cream border-2 border-turmeric rounded-2xl p-5 md:p-6 shadow-solid-rose flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transform -rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
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
              <p className="font-mono text-xs font-bold tracking-widest text-deep-rose">
                242,936+ VIEWS | 2,250+ DOWNLOADS
              </p>
            </div>

            <blockquote className="font-serif italic text-base md:text-lg text-on-surface leading-relaxed">
              "Top 25% of contributors on Unsplash. Used in Notion, PicsArt, etc."
            </blockquote>

            {/* View Gallery Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
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
                setCurrentIndex(previewIndex);
                setLightboxOpen(true);
              }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="w-48 h-64 md:w-52 md:h-72 bg-white p-2.5 pb-6 rounded shadow-md border border-gray-200 transform rotate-2 cursor-pointer transition-all duration-300 flex-shrink-0 relative"
              title="Click to view full image"
            >
              <div className="w-full h-[85%] bg-gray-100 rounded overflow-hidden relative">
                <img
                  src={CURATED_FRAMES[previewIndex].url}
                  alt={CURATED_FRAMES[previewIndex].title}
                  className="w-full h-full object-cover grayscale-15 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white p-1 rounded-full border border-white/20">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-center font-serif italic text-[11px] text-gray-500 mt-2 truncate w-full px-1">
                {CURATED_FRAMES[previewIndex].title}
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

        <AnalogSynth />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120b0a]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Outer Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-cream border-4 border-black rounded-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-solid-dark relative"
            >
              {/* Image Banner Section (Image is top-level part of scroll) */}
              <div className="relative w-full bg-[#120b0a] flex items-center justify-center select-none overflow-hidden border-b-2 border-black">
                <img
                  src={activeFrame.url}
                  alt={activeFrame.title}
                  className="w-full h-auto max-h-[480px] object-contain block mx-auto"
                  referrerPolicy="no-referrer"
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/85 border border-white/20 rounded-full text-white cursor-pointer transition-colors z-20"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/85 border border-white/20 rounded-full text-white cursor-pointer transition-colors z-20"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="absolute top-3 left-3 bg-black/75 text-[10px] font-mono text-white px-2 py-1 rounded border border-white/15 z-20">
                  {currentIndex + 1} / {CURATED_FRAMES.length}
                </div>
              </div>

              {/* Hand-Painted Metadata Info Panel immediately below, scrolling together */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Title */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl text-terracotta leading-none uppercase">
                      {activeFrame.title}
                    </h3>
                    <p className="font-serif italic text-sm text-deep-rose mt-1">
                      {activeFrame.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLove(activeFrame.id)}
                    className="p-2 rounded-full hover:bg-black/5 border-2 border-black bg-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        lovedFrames[activeFrame.id] ? 'fill-red-500 text-red-500' : 'text-black'
                      }`}
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="font-sans text-sm md:text-base text-on-surface leading-relaxed font-semibold">
                  {activeFrame.description}
                </p>

                {/* Badges/Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-mono text-[9px] tracking-widest text-indigo-blue uppercase font-black block mb-1">
                      LOCATION
                    </span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-terracotta" />
                      <span className="font-sans font-bold text-sm text-on-surface">{activeFrame.location}</span>
                    </div>
                  </div>

                  <div className="bg-surface border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-mono text-[9px] tracking-widest text-indigo-blue uppercase font-black block mb-1">
                      PHOTOGRAPHY DETAILS
                    </span>
                    <div className="font-sans font-bold text-sm text-on-surface">
                      {activeFrame.camera} · {activeFrame.settings}
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between p-3.5 bg-black/[0.02] border-2 border-dashed border-black/15 rounded-xl font-mono text-xs text-gray-600">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Eye className="w-4 h-4 text-indigo-blue" />
                    {activeFrame.views} Views
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Download className="w-4 h-4 text-indigo-blue" />
                    {activeFrame.downloads} Downloads
                  </span>
                </div>

                {/* Footer Buttons / Downloads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => triggerDownload(activeFrame.id)}
                    className="w-full py-3 bg-saffron text-black font-sans font-black text-xs uppercase tracking-wider border-2 border-black rounded-xl hover:bg-turmeric transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Download className="w-4 h-4" />
                    {downloadSuccess === activeFrame.id ? 'Saved with Pride!' : 'Download Frame (High Res)'}
                  </button>

                  <a
                    href={activeFrame.unsplashUrl || "https://unsplash.com/@baanbhaba"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-white text-black font-sans font-black text-xs uppercase tracking-wider border-2 border-black rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-center"
                  >
                    <span>📸</span>
                    {activeFrame.unsplashUrl ? 'View Photo on Unsplash' : 'See @baanbhaba on Unsplash'}
                  </a>
                </div>

                {downloadSuccess === activeFrame.id && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-center text-emerald-600 font-black"
                  >
                    ✓ Download started. Saved to local gallery.
                  </motion.p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black hover:bg-red-700 border-2 border-black text-white rounded-full transition-all cursor-pointer shadow-md z-30"
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
