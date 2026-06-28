/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b border-dashed border-terracotta/20 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl sm:text-3xl tracking-tighter text-white bg-black px-3.5 py-1 rounded-lg border-2 border-black shadow-solid-terracotta hover:scale-105 transition-all duration-200 cursor-pointer uppercase"
        >
          BAAAANNN
        </button>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: 'ABOUT', target: 'about' },
            { label: 'LINUX', target: 'https://github.com/baanbhaba/hyprland-config', external: true },
            { label: 'PHOTOGRAPHY', target: 'photography' },
            { label: 'MUSIC', target: 'music' },
            { label: 'CONTACT', target: 'contact' },
          ].map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.target}
                target="_blank"
                rel="noreferrer"
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

        {/* Say Hello Button */}
        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-terracotta text-white font-sans font-bold text-xs md:text-sm tracking-wider px-5 py-2 rounded-lg border-2 border-transparent hover:bg-deep-rose hover:shadow-solid-indigo transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Say Hello
          </button>
        </div>
      </div>
    </nav>
  );
}
