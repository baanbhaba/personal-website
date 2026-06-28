/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Outer hand-painted frame container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cream border-2 border-turmeric rounded-2xl p-6 md:p-12 shadow-solid-indigo flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden transform -rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
      >
        {/* Background Geometric Kolam Watermark */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 flex items-center justify-center">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-terracotta">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" strokeWidth="0.5" />
            <path d="M50 20 L80 50 L50 80 L20 50 Z" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="10" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
            <path d="M10 10 L90 90 M90 10 L10 90" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Top-Right Diamond Embellishment */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <motion.div
            animate={{ rotate: [45, 90, 45] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-6 h-6 md:w-8 md:h-8 bg-saffron border border-terracotta transform rotate-45 flex items-center justify-center shadow-sm"
          >
            <div className="w-2 h-2 bg-cream transform rotate-45" />
          </motion.div>
        </div>

        {/* Left Side: Impactful Street Sign Typography */}
        <div className="flex-1 text-left z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-display leading-none tracking-tighter flex flex-col uppercase text-left select-none pb-4">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-saffron bg-black px-5 py-3 rounded-xl inline-block shadow-solid-terracotta border-3 border-black transform -rotate-1 w-max">
                ANIRBAAN
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white bg-terracotta px-5 py-3 rounded-xl inline-block shadow-solid-dark border-3 border-black transform rotate-1 w-max mt-2">
                HALDAR
              </span>
            </h1>
            
            <p className="font-serif italic text-2xl md:text-3xl text-deep-rose tracking-wide">
              Linux tinkerer. Photographer. Hyderabad in my veins.
            </p>
            
            <div className="flex items-center gap-3 pt-2 text-on-surface">
              <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
              <p className="font-sans text-lg md:text-xl font-medium">
                Pull up a charpai. Stay a while.
              </p>
            </div>

            {/* Quick interactive stats bar */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-dashed border-indigo-blue/30 rounded-lg text-xs font-mono text-indigo-blue">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Hyderabad, TS, India</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-dashed border-indigo-blue/30 rounded-lg text-xs font-mono text-indigo-blue">
                <Compass className="w-3.5 h-3.5 text-terracotta" />
                <span>UTC+5:30</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tactile, tilted photograph/artwork block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.3 } }}
          className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 cursor-pointer bg-[#31161C] p-6 rounded-2xl shadow-solid-rose border-4 border-terracotta overflow-hidden"
        >
          {/* Inner illustration: Silhouette under Jaipur Archway */}
          <div className="relative w-full h-full bg-[#E65C00] rounded-xl flex items-center justify-center overflow-hidden border border-terracotta/40">
            {/* Sun Rays/Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#B33600] via-[#E65C00] to-[#FF9933] opacity-90" />
            
            {/* Geometric Arch Design (SVG) */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-[#4D0012] fill-current">
              {/* Outer arch shape */}
              <path d="M 20 200 
                       L 20 80 
                       A 80 80 0 0 1 180 80 
                       L 180 200 Z" 
                    className="opacity-20" />
              
              {/* Palace windows/arches details */}
              <path d="M 40 200 L 40 100 Q 100 20 160 100 L 160 200 Z" fill="none" stroke="#E65C00" strokeWidth="2" className="opacity-40" />
              <path d="M 60 200 L 60 120 Q 100 40 140 120 L 140 200 Z" fill="none" stroke="#FF9933" strokeWidth="1.5" className="opacity-50" />
              
              {/* Traditional Jaipur arches pattern (Multiple decorative scalloped archways) */}
              <path d="M 30 200 L 30 110 
                       Q 45 90 60 110 
                       Q 75 90 90 110 
                       Q 105 90 120 110 
                       Q 135 90 150 110 
                       Q 165 90 170 110 
                       L 170 200 Z" 
                    fill="#1A000A" />

              {/* Central high-scalloped arch silhouette */}
              <path d="M 70 200 
                       L 70 130 
                       C 70 120, 80 110, 85 110
                       C 90 110, 95 100, 100 100
                       C 105 100, 110 110, 115 110
                       C 120 110, 130 120, 130 130
                       L 130 200 Z" 
                    fill="#F2913D" />

              {/* Scalloped decorative border detail inside the inner arch */}
              <path d="M 72 200 
                       L 72 132 
                       C 72 122, 81 113, 85 113
                       C 89 113, 94 103, 100 103
                       C 106 103, 111 113, 115 113
                       C 119 113, 128 122, 128 132
                       L 128 200 Z" 
                    fill="#1A000A" />

              {/* Silhouette of Anirbaan Haldar standing in traditional kurta */}
              <g transform="translate(100, 140) scale(0.35)">
                {/* Head / Turban */}
                <ellipse cx="0" cy="-90" rx="14" ry="12" fill="#FFA347" />
                {/* Turban folds */}
                <path d="M -16 -92 C -10 -105, 10 -105, 16 -92 Z" fill="#FFA347" />
                {/* Face silhouette */}
                <ellipse cx="0" cy="-78" rx="11" ry="12" fill="#FFA347" />
                <path d="M -11 -76 L -16 -76 L -11 -72 Z" fill="#FFA347" /> {/* Beard profile */}
                
                {/* Neck */}
                <rect x="-4" y="-68" width="8" height="10" fill="#FFA347" />
                
                {/* Kurta Body / Torso */}
                <path d="M -22 -58 
                         L 22 -58 
                         L 28 60 
                         L -28 60 Z" 
                      fill="#FFA347" />
                
                {/* Kurta Flaps / Long shirt bottom */}
                <path d="M -28 60 
                         L 28 60 
                         L 32 160 
                         L -32 160 Z" 
                      fill="#FFA347" />
                
                {/* Sleeves / Arms */}
                <path d="M -22 -58 L -38 -15 L -34 -10 L -22 -44" fill="#FFA347" />
                <path d="M 22 -58 L 38 -15 L 34 -10 L 22 -44" fill="#FFA347" />
                
                {/* Legs / Pajama */}
                <rect x="-14" y="160" width="10" height="40" fill="#FFA347" />
                <rect x="4" y="160" width="10" height="40" fill="#FFA347" />
                
                {/* Shoes */}
                <path d="M -14 200 L -22 204 L -10 204 Z" fill="#FFA347" />
                <path d="M 14 200 L 22 204 L 10 204 Z" fill="#FFA347" />
              </g>
            </svg>

            {/* Glowing sun in background */}
            <div className="absolute top-[28%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#FFE5B4] opacity-55 blur-sm" />
          </div>

          {/* Bottom text representing custom frame caption */}
          <div className="absolute bottom-1 right-3 text-[10px] font-mono text-[#DCC0BA] opacity-60">
            HYDERABAD, TS // FRAME #17
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
