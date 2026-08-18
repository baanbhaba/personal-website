/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Instagram, Github, Linkedin, Camera, Sparkles, Terminal, Compass, GraduationCap } from 'lucide-react';

interface ContactLink {
  name: string;
  label: string;
  title: string;
  url: string;
  icon: React.ReactNode;
  bgClass: string;
  iconBgClass: string;
  tiltClass: string;
}

export default function Guestbook() {
  const contactLinks: ContactLink[] = [
    {
      name: 'Email',
      label: 'VANAKKAM',
      title: 'EMAIL ME',
      url: 'mailto:anirbaanhaldar@proton.me',
      icon: <Mail className="w-5 h-5" />,
      bgClass: 'bg-saffron text-black',
      iconBgClass: 'bg-black text-saffron',
      tiltClass: '-rotate-1',
    },
    {
      name: 'GitHub',
      label: 'CODEBASE',
      title: 'GITHUB',
      url: 'https://github.com/baanbhaba',
      icon: <Github className="w-5 h-5" />,
      bgClass: 'bg-indigo-blue text-white',
      iconBgClass: 'bg-black text-white',
      tiltClass: 'rotate-1',
    },
    {
      name: 'LinkedIn',
      label: 'NETWORK',
      title: 'LINKEDIN',
      url: 'https://www.linkedin.com/in/baanbhaba/',
      icon: <Linkedin className="w-5 h-5" />,
      bgClass: 'bg-cream text-black',
      iconBgClass: 'bg-black text-white',
      tiltClass: '-rotate-1',
    },
    {
      name: 'Instagram',
      label: 'PERSONAL LIFE',
      title: 'INSTAGRAM',
      url: 'https://instagram.com/baanbhaba',
      icon: <Instagram className="w-5 h-5" />,
      bgClass: 'bg-terracotta text-white',
      iconBgClass: 'bg-white text-terracotta',
      tiltClass: 'rotate-1',
    },
    {
      name: 'Unsplash',
      label: 'PHOTOGRAPHY',
      title: 'UNSPLASH',
      url: 'https://unsplash.com/@baanbhaba',
      icon: <Camera className="w-5 h-5" />,
      bgClass: 'bg-deep-rose text-white',
      iconBgClass: 'bg-black text-white flex items-center justify-center w-9 h-9',
      tiltClass: '-rotate-1',
    },
  ];

  return (
    <section id="contact" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#121212] border-4 border-black rounded-3xl p-6 md:p-10 lg:p-12 shadow-solid-rose text-center relative overflow-hidden transform rotate-1 hover:rotate-0 hover:scale-[1.005] transition-all duration-300"
      >
        {/* Background Decal Pattern Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#f4a300" />
                <path d="M0 20 H40 M20 0 V40" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2,4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Retro Decal Corner Brackets */}
        <div className="absolute top-4 left-4 pointer-events-none hidden sm:block">
          <div className="w-6 h-6 border-t-2 border-l-2 border-saffron" />
        </div>
        <div className="absolute top-4 right-4 pointer-events-none hidden sm:block">
          <div className="w-6 h-6 border-t-2 border-r-2 border-saffron" />
        </div>
        <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:block">
          <div className="w-6 h-6 border-b-2 border-l-2 border-terracotta" />
        </div>
        <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:block">
          <div className="w-6 h-6 border-b-2 border-r-2 border-terracotta" />
        </div>

        {/* Top Floating Graphic Decal Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-[10px]">
          <span className="bg-black/80 border border-saffron/40 text-saffron px-3 py-1 rounded-lg font-black tracking-widest uppercase shadow-xs">
            ✦ EST. 2024
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-black/80 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-lg font-black tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>STATUS: B.TECH II YEAR</span>
            </span>
            <span className="bg-black/80 border border-white/20 text-dusty-rose px-3 py-1 rounded-lg font-black tracking-widest uppercase">
              HYDERABAD, IN 🇮🇳
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto text-center">
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter leading-none uppercase select-none">
            SAY <span className="text-saffron">NAMASTE</span>
          </h2>
          
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-dusty-rose max-w-2xl mx-auto leading-relaxed pt-2">
            "A personal corner of the internet for software, photography, and music."
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-10 max-w-5xl mx-auto">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`group ${link.bgClass} p-5 rounded-2xl border-2 border-black flex flex-col justify-between items-start text-left shadow-solid-dark transform ${link.tiltClass} hover:rotate-0 hover:scale-[1.03] transition-all duration-300 min-h-[160px]`}
            >
              <div className="flex justify-between w-full items-start">
                <span className={`p-2 rounded-lg flex items-center justify-center ${link.iconBgClass}`}>
                  {link.icon}
                </span>
                <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="mt-6 w-full text-right sm:text-left">
                <span className="font-mono text-[9px] tracking-wider font-bold block opacity-60 uppercase">
                  {link.label}
                </span>
                <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-none uppercase mt-1 truncate">
                  {link.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Tech Decal Strip */}
        <div className="relative z-10 pt-8 mt-6 border-t border-dashed border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>// CONNECT_PORT_v2.4</span>
          <span>✦ ALL CHANNELS OPEN ✦</span>
        </div>
      </motion.div>
    </section>
  );
}
