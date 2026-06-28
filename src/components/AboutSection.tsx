/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Github, FolderGit2, Play, Check, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import { Dotfile } from '../types';

// Mock Dotfiles database
const DOTFILES: Dotfile[] = [
  {
    name: '.config/i3/config',
    path: '~/.config/i3/config',
    language: 'bash',
    content: `# i3 window manager config
font pango:JetBrains Mono 10
floating_modifier Mod4

# Start terminal on Mod4+Return
bindsym Mod4+Return exec kitty

# Windows border configuration
default_border pixel 2
gaps inner 12
gaps outer 6

# Custom Colors (Jaipur Bazaar theme)
client.focused          #9b3f27 #9b3f27 #ffffff #f4a300 #9b3f27
client.focused_inactive #506072 #506072 #ffffff #dcc0ba #506072
client.unfocused        #fdf8f0 #fdf8f0 #231917 #dcc0ba #fdf8f0
`
  },
  {
    name: 'init.lua (Neovim)',
    path: '~/.config/nvim/init.lua',
    language: 'lua',
    content: `-- Neovim Custom Lua config
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.expandtab = true
vim.g.mapleader = " "

-- Lazy.nvim package manager bootstrap
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({ "git", "clone", "filter=blob:none", "https://github.com/folke/lazy.nvim.git", lazypath })
end

-- Handpicked Theme bindings
vim.cmd [[colorscheme bazaar-terracotta]]
`
  },
  {
    name: '.bashrc',
    path: '~/.bashrc',
    language: 'bash',
    content: `# My custom .bashrc
export PATH=$HOME/.local/bin:$PATH
alias l='ls -lah --color=auto'
alias pacman='sudo pacman --color=auto'
alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'

# Display beautiful Neofetch on startup
if [ -x "$(command -v neofetch)" ]; then
  neofetch --ascii_distro arch
fi

echo -e "\\n  \\e[33mPull up a charpai. The tea is brewing...\\e[0m\\n"
`
  }
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'editor'>('terminal');
  const [selectedDotfile, setSelectedDotfile] = useState<Dotfile>(DOTFILES[0]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'whoami', out: 'anirbaan' },
    { cmd: 'fastfetch', out: `                  /\\   OS    ➜  Arch Linux
                 /  \\  KER   ➜  Linux 7.0.13-arch1-2
                /\\   \\ UP    ➜  3 hours, 9 mins
               /  __  \\ PKG   ➜  16 (flatpak), 1205 (pacman)
              /  (  )  \\ WM    ➜  Hyprland 0.55.4 (Wayland)
             /  _    _  \\ MEM   ➜  3.57 GiB / 7.67 GiB (47%)
            /  (_______)  \\
           /              \\
          /________________\\` }
  ]);

  const [copiedText, setCopiedText] = useState(false);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let out = '';

    if (cmd === 'help') {
      out = 'Available commands: fastfetch, ls, cat [file], clear, theme, cowsay [msg], help';
    } else if (cmd === 'fastfetch' || cmd === 'neofetch') {
      out = `                  /\\   OS    ➜  Arch Linux
                 /  \\  KER   ➜  Linux 7.0.13-arch1-2
                /\\   \\ UP    ➜  3 hours, 9 mins
               /  __  \\ PKG   ➜  16 (flatpak), 1205 (pacman)
              /  (  )  \\ WM    ➜  Hyprland 0.55.4 (Wayland)
             /  _    _  \\ MEM   ➜  3.57 GiB / 7.67 GiB (47%)
            /  (_______)  \\
           /              \\
          /________________\\`;
    } else if (cmd === 'ls') {
      out = 'total 24K\n-rw-r--r-- 1 anirbaan users  452 Jun 28 04:09 .bashrc\ndrwxr-xr-x 3 anirbaan users 4.0K Jun 28 04:09 .config/\n-rwxr-xr-x 1 anirbaan users  1.2K Jun 28 04:09 compile-configs.sh';
    } else if (cmd.startsWith('cat ')) {
      const fileName = cmd.replace('cat ', '').trim();
      const matched = DOTFILES.find(d => d.name.toLowerCase().includes(fileName) || d.path.toLowerCase().includes(fileName));
      if (matched) {
        out = matched.content;
      } else {
        out = `cat: ${fileName}: No such file or directory. Try 'cat .bashrc' or 'cat init.lua'`;
      }
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'theme') {
      out = 'Active Theme: Organic Terracotta & Saffron. Contrast ratio optimized.';
    } else if (cmd.startsWith('cowsay ')) {
      const msg = cmd.replace('cowsay ', '').trim();
      out = ` _____________________
< ${msg} >
 ---------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    } else {
      out = `bash: command not found: ${cmd}. Type 'help' for options.`;
    }

    setTerminalHistory(prev => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput('');
  };

  const copyDotfiles = () => {
    navigator.clipboard.writeText(selectedDotfile.content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="about" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        
        {/* Card 1: /ABOUT (40% width on large screens) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-card-about border-2 border-deep-rose rounded-2xl p-6 md:p-8 shadow-solid-rose flex flex-col justify-between transform -rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-display text-4xl sm:text-5xl text-white bg-deep-rose px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase transform -rotate-2 select-none">
                /ABOUT
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-cream/70 rounded-full border-2 border-black text-xs font-bold text-deep-rose animate-bounce shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hyderabad, India 🇮🇳</span>
              </div>
            </div>

            {/* Description Copy */}
            <p className="font-sans text-base md:text-lg leading-relaxed text-on-surface mb-6 font-medium">
              I'm Anirbaan. I tinker with configs because it feels good. I shoot photos because the world is beautiful. This is my little corner of the internet—warm, messy, and mine.
            </p>
          </div>

          {/* Current Interests */}
          <div className="mt-4 pt-6 border-t border-dashed border-deep-rose/20">
            <h3 className="font-sans text-xs font-bold tracking-widest text-deep-rose/70 uppercase mb-3">
              WHAT I'M INTO RIGHT NOW:
            </h3>
            
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Arch Linux', color: 'bg-saffron text-on-surface hover:rotate-2' },
                { name: 'Hyprland', color: 'bg-terracotta text-white hover:-rotate-1' },
                { name: 'Music', color: 'bg-deep-rose text-white hover:rotate-1' },
                { name: 'Doing dumb stuff', color: 'bg-turmeric text-on-surface hover:-rotate-2' },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`inline-block px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-sm border border-black/10 transition-all duration-200 cursor-default ${item.color}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: /LINUX dotfiles & interactive setup (60% width on large screens) */}
        <motion.div
          id="linux"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 bg-indigo-blue border-2 border-black rounded-2xl p-6 md:p-8 shadow-solid-dark text-white flex flex-col justify-between overflow-hidden relative transform rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300"
        >
          {/* Saffron Diamond Corner Embellishment */}
          <div className="absolute bottom-[-15px] right-[-15px] opacity-90 z-0">
            <div className="w-12 h-12 bg-turmeric border border-black transform rotate-45 shadow-sm" />
          </div>

          <div className="z-10">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl text-black bg-saffron px-4 py-1.5 rounded-lg border-2 border-black shadow-solid-dark tracking-tighter uppercase inline-block transform rotate-1 select-none">
                  THE HOBBY
                </h2>
                <p className="font-serif italic text-lg text-dusty-rose mt-3">
                  I tinker with configs. It's fun.
                </p>
              </div>

              {/* View Selector */}
              <div className="flex bg-black/30 p-1 rounded-xl border border-white/10 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === 'terminal' ? 'bg-saffron text-black shadow' : 'text-dusty-rose hover:text-white'
                  }`}
                >
                  Terminal
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === 'editor' ? 'bg-saffron text-black shadow' : 'text-dusty-rose hover:text-white'
                  }`}
                >
                  Dotfiles
                </button>
              </div>
            </div>

            {/* Links section from mockup */}
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/baanbhaba"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-sans font-bold text-xs tracking-wider text-saffron hover:text-turmeric transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-terracotta" />
                → GitHub
              </a>
              <a
                href="https://github.com/baanbhaba/hyprland-config"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-sans font-bold text-xs tracking-wider text-saffron hover:text-turmeric transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-terracotta" />
                → Hyprland Config
              </a>
            </div>

            {/* Interactive Area Container */}
            <div className="bg-[#1b232e] border border-black rounded-xl p-4 font-mono text-xs shadow-inner h-64 overflow-y-auto relative">
              <AnimatePresence mode="wait">
                {activeTab === 'terminal' ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col space-y-2 h-full justify-between"
                  >
                    <div className="overflow-y-auto flex-1 space-y-2 pb-4">
                      <p className="text-gray-400 text-[10px]">
                        Last login: Sun Jun 28 04:09:56 on tty1
                      </p>
                      <p className="text-saffron">
                        Type 'help' to see fun commands!
                      </p>
                      
                      {terminalHistory.map((hist, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center text-turmeric font-bold">
                            <span className="text-terracotta mr-1.5">➜ ~</span> {hist.cmd}
                          </div>
                          <pre className="text-dusty-rose whitespace-pre-wrap leading-relaxed">
                            {hist.out}
                          </pre>
                        </div>
                      ))}
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleCommandSubmit} className="flex items-center bg-black/40 p-2 rounded-lg border border-white/5">
                      <span className="text-terracotta font-bold mr-2">➜ ~</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="ls, fastfetch, cowsay hello..."
                        className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-gray-600 font-mono"
                      />
                      <button type="submit" className="text-saffron hover:text-white p-1">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full"
                  >
                    {/* File Selector Tabs */}
                    <div className="flex overflow-x-auto border-b border-white/10 pb-2 mb-2 gap-1 scrollbar-none">
                      {DOTFILES.map((file) => (
                        <button
                          key={file.name}
                          onClick={() => setSelectedDotfile(file)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            selectedDotfile.name === file.name
                              ? 'bg-saffron text-black'
                              : 'bg-black/30 text-gray-400 hover:text-white'
                          }`}
                        >
                          {file.name}
                        </button>
                      ))}
                    </div>

                    {/* Code display */}
                    <div className="flex-1 overflow-y-auto bg-black/20 p-2 rounded border border-white/5 relative">
                      {/* Copy action */}
                      <button
                        onClick={copyDotfiles}
                        className="absolute top-2 right-2 p-1.5 rounded bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all cursor-pointer"
                        title="Copy code"
                      >
                        {copiedText ? <Check className="w-3.5 h-3.5 text-green-400" /> : <FolderGit2 className="w-3.5 h-3.5" />}
                      </button>
                      
                      <pre className="text-emerald-400 text-[11px] leading-relaxed select-text whitespace-pre overflow-x-auto">
                        {selectedDotfile.content}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[10px] text-dusty-rose/40 font-mono mt-4 pt-2 border-t border-white/5 flex justify-between">
            <span>WM: Hyprland // TERM: kitty</span>
            <span>Made in Hyderabad with Love</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
