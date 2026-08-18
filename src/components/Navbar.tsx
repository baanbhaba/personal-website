/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, FileText, Volume2, VolumeX, Music, Disc, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playKeyClickSound, playPopSound, setSoundMuted } from '../utils/soundEffects';
import PixelCatSprite from './PixelCatSprite';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Mouse Tracking & Meow Speech State for Cursor Companion Cat
  const [mousePos, setMousePos] = useState({ x: 100, y: 100 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [meowText, setMeowText] = useState<string | null>(null);
  const meowTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (e.clientX < lastX - 5) {
        setFacingLeft(true);
      } else if (e.clientX > lastX + 5) {
        setFacingLeft(false);
      }
      lastX = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerCatMeow = () => {
    playPopSound();
    const meows = [
      "meow! 🐾",
      "purrrr~ 😺",
      "feeding your rice! 🍚",
      "hyprland gaps > 0 ⚡",
      "meow meow! ✨",
      "following u 👀"
    ];
    const chosen = meows[Math.floor(Math.random() * meows.length)] || "meow! 🐾";
    setMeowText(chosen);

    if (meowTimeoutRef.current) clearTimeout(meowTimeoutRef.current);
    meowTimeoutRef.current = setTimeout(() => {
      setMeowText(null);
    }, 2200);
  };

  // Initialize ambient music audio element
  useEffect(() => {
    const audio = new Audio('/lofi.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    
    // Explicit ended event fallback for browsers that ignore loop attribute
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    audio.addEventListener('ended', handleEnded);
    bgMusicRef.current = audio;

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      bgMusicRef.current = null;
    };
  }, []);

  const toggleBgMusic = () => {
    playKeyClickSound();
    if (!bgMusicRef.current) return;

    if (isPlayingMusic) {
      bgMusicRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      bgMusicRef.current.play().catch(() => {});
      setIsPlayingMusic(true);
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      playKeyClickSound();
    }
  };

  const scrollToSection = (id: string) => {
    playKeyClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const NAV_LINKS = [
    { label: 'ABOUT', target: 'about' },
    { label: 'HYPRLAND', target: 'https://github.com/baanbhaba/hyprland-config', external: true },
    { label: 'PHOTOGRAPHY', target: 'photography' },
    { label: 'SKILLS', target: 'skills' },
    { label: 'PROJECTS', target: 'projects' },
    { label: 'RÉSUMÉ', target: '/resume.pdf', external: true },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream py-3 shadow-md border-b-2 border-black'
            : 'bg-transparent py-5 border-b border-dashed border-terracotta/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              playKeyClickSound();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl sm:text-3xl tracking-tighter text-white bg-black px-3.5 py-1 rounded-lg border-2 border-black shadow-solid-terracotta hover:scale-105 transition-all duration-200 cursor-pointer uppercase"
          >
            BAAANN
          </button>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.target}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playKeyClickSound()}
                  className="font-sans text-sm font-bold tracking-widest text-terracotta hover:text-deep-rose transition-colors duration-200 cursor-pointer relative group"
                >
                  {link.label}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-deep-rose transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.target)}
                  className="font-sans text-sm font-bold tracking-widest text-terracotta hover:text-deep-rose transition-colors duration-200 cursor-pointer relative group"
                >
                  {link.label}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-deep-rose transition-all duration-300 group-hover:w-full"></span>
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio FX Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg border-2 border-black bg-white hover:bg-saffron text-black transition-all cursor-pointer shadow-xs active:scale-95"
              title={isMuted ? "unmute click sound FX" : "mute click sound FX"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="bg-terracotta text-white font-sans font-bold text-xs md:text-sm tracking-wider px-3.5 sm:px-5 py-2 rounded-lg border-2 border-transparent hover:bg-deep-rose hover:shadow-solid-indigo transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Namaste</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                playKeyClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 bg-black text-white border-2 border-black rounded-lg shadow-xs cursor-pointer active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t-2 border-dashed border-black/20 px-6 py-5 shadow-lg space-y-3 overflow-hidden"
            >
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.target}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      playKeyClickSound();
                      setMobileMenuOpen(false);
                    }}
                    className="block font-sans text-base font-extrabold tracking-wider text-terracotta hover:text-deep-rose py-2 border-b border-black/5"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.target)}
                    className="block w-full text-left font-sans text-base font-extrabold tracking-wider text-terracotta hover:text-deep-rose py-2 border-b border-black/5"
                  >
                    {link.label}
                  </button>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Smooth Cursor-Following Animated 8-Bit Pixel Cat Sprite */}
      <PixelCatSprite mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Floating Lo-Fi Audio Player Widget (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-5 right-5 z-40"
      >
        <button
          onClick={toggleBgMusic}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border-2 border-black shadow-solid-dark transition-all cursor-pointer select-none active:scale-95 ${
            isPlayingMusic
              ? 'bg-saffron text-black'
              : 'bg-cream hover:bg-white text-on-surface'
          }`}
          title={isPlayingMusic ? "pause chill lo-fi beats ⏸️" : "play chill lo-fi beats 🎵"}
        >
          {/* Rotating Vinyl Icon */}
          <Disc className={`w-5 h-5 ${isPlayingMusic ? 'animate-spin text-black' : 'text-terracotta'}`} style={{ animationDuration: '4s' }} />

          {/* Track Details & Animated Equalizer Waves */}
          <div className="text-left font-mono">
            <div className="text-[10px] font-black tracking-wider uppercase text-deep-rose">
              {isPlayingMusic ? 'NOW PLAYING 🎵' : 'LO-FI AMBIENT'}
            </div>
            <div className="text-xs font-black truncate max-w-[120px] sm:max-w-[150px]">
              {isPlayingMusic ? 'Chill Beats to Rice To' : 'Click to Play Track'}
            </div>
          </div>

          {/* Equalizer Visualizer Bars */}
          {isPlayingMusic && (
            <div className="flex items-end gap-0.5 h-4 ml-1">
              <span className="w-1 bg-black rounded-full animate-bounce h-full" style={{ animationDelay: '0.1s' }} />
              <span className="w-1 bg-black rounded-full animate-bounce h-2/3" style={{ animationDelay: '0.3s' }} />
              <span className="w-1 bg-black rounded-full animate-bounce h-4/5" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </button>
      </motion.div>
    </>
  );
}
