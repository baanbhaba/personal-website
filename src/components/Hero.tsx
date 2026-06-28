/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import me from './me.png';
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
              A guy who hobbies Arch and Hyprland.
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
          {/* Simple Image Frame loading the local me.jpg file */}
          <div className="relative w-full h-full bg-[#1e1013] rounded-xl overflow-hidden border border-terracotta/40">
            <img 
              src={me}
              alt="me" 
              className="w-full h-full object-cover rounded-lg"
            />
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
