/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Instagram, Rss, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-dashed border-terracotta/20 py-8 px-4 md:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="font-display text-xl text-terracotta tracking-wide">
          Anirbaan Haldar
        </div>

        {/* Center copyright */}
        <div className="font-sans text-xs text-on-surface/60 text-center font-medium">
          A Kid
        </div>

        {/* Right socials */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/baanbhaba"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-sans font-bold text-xs tracking-wider text-terracotta hover:text-deep-rose transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Github
          </a>
          <a
            href="https://instagram.com/baanbhaba"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-sans font-bold text-xs tracking-wider text-terracotta hover:text-deep-rose transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </a>
                    <a
            href="https://github.com/baanbhaba/personal-website"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-sans font-bold text-xs tracking-wider text-terracotta hover:text-deep-rose transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
