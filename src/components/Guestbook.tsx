/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Instagram, Globe } from 'lucide-react';

export default function Guestbook() {
  return (
    <section id="contact" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#121212] border-4 border-black rounded-3xl p-8 md:p-12 shadow-solid-rose text-center relative overflow-hidden transform rotate-1 hover:rotate-0 hover:scale-[1.005] transition-all duration-300"
      >
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto text-center">
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter leading-none uppercase select-none">
            SAY <span className="text-saffron">NAMASTE</span>
          </h2>
          
          <p className="font-serif italic text-xl md:text-2xl text-dusty-rose max-w-xl mx-auto leading-relaxed pt-2">
            "No studio lights. No fancy setups. Just the raw, breathing soul of Hyderabad streets and the quiet hum of an Arch Linux workspace."
          </p>
        </div>

        {/* Massive Bold Style Info Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 max-w-4xl mx-auto">
          
          {/* Box 1: Drop a Line (Email Action Card) */}
          <a
            href="mailto:anirbaanhaldar@proton.me"
            className="group bg-saffron text-black p-6 rounded-2xl border-2 border-black flex flex-col justify-between items-start text-left shadow-solid-dark transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between w-full items-start">
              <span className="p-2 bg-black rounded-lg text-saffron">
                <Mail className="w-5 h-5" />
              </span>
              <ArrowUpRight className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-8">
              <span className="font-mono text-[10px] tracking-wider font-bold block opacity-60 uppercase">// MAIL ME DIRECT</span>
              <h3 className="font-display text-2xl tracking-tight leading-none uppercase mt-1">
                anirbaanhaldar<br />@proton.me
              </h3>
            </div>
          </a>

          {/* Box 2: Instagram Handles */}
          <a
            href="https://instagram.com/baanbhaba"
            target="_blank"
            rel="noreferrer"
            className="group bg-terracotta text-white p-6 rounded-2xl border-2 border-black flex flex-col justify-between items-start text-left shadow-solid-dark transform rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between w-full items-start">
              <span className="p-2 bg-white rounded-lg text-terracotta">
                <Instagram className="w-5 h-5" />
              </span>
              <ArrowUpRight className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-8">
              <span className="font-mono text-[10px] tracking-wider font-bold block opacity-70 uppercase">// INSTAGRAM VIBES</span>
              <h3 className="font-display text-2xl tracking-tight leading-none uppercase mt-1">
                @baanbhaba
              </h3>
            </div>
          </a>

          {/* Box 3: Unsplash Profile */}
          <a
            href="https://unsplash.com/@baanbhaba"
            target="_blank"
            rel="noreferrer"
            className="group bg-white text-black p-6 rounded-2xl border-2 border-black flex flex-col justify-between items-start text-left shadow-solid-dark transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between w-full items-start">
              <span className="p-2 bg-black rounded-lg text-white font-sans text-xs font-black">
                UN
              </span>
              <ArrowUpRight className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-8">
              <span className="font-mono text-[10px] tracking-wider font-bold block opacity-60 uppercase">// UNSPLASH ACCOUNT</span>
              <h3 className="font-display text-2xl tracking-tight leading-none uppercase mt-1">
                @baanbhaba
              </h3>
            </div>
          </a>

        </div>
      </motion.div>
    </section>
  );
}
