/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Terminal, Layout, GitBranch, HeartHandshake } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Languages & Core',
    icon: Code2,
    color: 'bg-saffron text-black border-black',
    skills: ['TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Python', 'Bash / Shell']
  },
  {
    title: 'Frameworks & Frontend',
    icon: Layout,
    color: 'bg-deep-rose text-white border-black',
    skills: ['React 18', 'Tailwind CSS', 'Vite', 'Framer Motion', 'REST APIs']
  },
  {
    title: 'Linux & Custom Ricing',
    icon: Terminal,
    color: 'bg-indigo-blue text-white border-black',
    skills: ['Fedora Linux', 'Hyprland WM', 'Waybar', 'Kitty Terminal', 'Rofi', 'Dotfiles']
  },
  {
    title: 'Tools & Ecosystem',
    icon: GitBranch,
    color: 'bg-terracotta text-white border-black',
    skills: ['Git & GitHub', 'VS Code', 'npm / Node.js', 'Linux CLI']
  },
  {
    title: 'Soft Skills & Mindset',
    icon: HeartHandshake,
    color: 'bg-turmeric text-black border-black',
    skills: ['Problem Solving', 'Adaptability', 'Creative Thinking', 'Attention to Detail', 'Unsplash Photography']
  }
];

export default function SkillsShowcase() {
  return (
    <section id="skills" className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-card-about border-2 border-black rounded-2xl p-6 md:p-8 shadow-solid-dark">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-3xl sm:text-4xl text-black bg-turmeric px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform -rotate-1">
              / TECH_ARSENAL & SKILLS
            </h2>
          </div>
          <span className="font-mono text-xs font-bold tracking-widest text-deep-rose uppercase">
            TOOLSTACK & SKILL MATRIX
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-surface border-2 border-black rounded-xl p-4 shadow-solid-dark flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`p-1.5 rounded-lg border ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-on-surface">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-black/5 hover:bg-black/10 text-on-surface font-mono font-bold text-xs rounded border border-black/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
