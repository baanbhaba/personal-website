/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Github, FolderGit2, Play, Check, ChevronRight, Sparkles, MapPin, Gamepad2, X, RefreshCw } from 'lucide-react';
import { Dotfile } from '../types';
import { playKeyClickSound } from '../utils/soundEffects';

// Dotfiles & Projects Config Database
const DOTFILES: Dotfile[] = [
  {
    name: 'hyprland.conf',
    path: '~/.config/hypr/hyprland.conf',
    language: 'bash',
    content: `# Hyprland Main Configuration - baanbhaba
autostart = waybar & mako & hyprpaper
monitor=,preferred,auto,1

input {
    kb_layout = us
    follow_mouse = 1
    touchpad { natural_scroll = yes }
}

general {
    gaps_in = 5
    gaps_out = 10
    border_size = 2
    col.active_border = rgba(f4a300ee) rgba(a43152ee) 45deg
    col.inactive_border = rgba(506072aa)
    layout = dwindle
}

decoration {
    rounding = 10
    blur { enabled = true, size = 3 }
}`
  },
  {
    name: 'personal_projects.json',
    path: '~/projects/personal.json',
    language: 'json',
    content: `[
  {
    "name": "personal-website",
    "stack": ["React 18", "Tailwind CSS", "Vite", "Framer Motion"],
    "status": "Active Development"
  },
  {
    "name": "hyprland-config",
    "stack": ["Bash", "Hyprland", "Waybar"],
    "status": "Maintained"
  }
]`
  },
  {
    name: 'future_plans.md',
    path: '~/docs/future_plans.md',
    language: 'markdown',
    content: `# Future Roadmap 🚀
- [x] Build personal retro portfolio website
- [x] Unsplash stats API integration
- [ ] Build CLI games 🎮
- [ ] Build something related to Palantir 🔮
- [ ] Add more Linux dotfiles & Hyprland themes`
  }
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'editor'>('terminal');
  const [selectedDotfile, setSelectedDotfile] = useState<Dotfile>(DOTFILES[0]!);
  const [terminalInput, setTerminalInput] = useState('');
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeRef = useRef<Array<{ x: number; y: number }>>([{ x: 10, y: 10 }]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 15, y: 15 });
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const gameLoopRef = useRef<any>(null);

  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'whoami', out: 'anirbaan haldar' },
    { cmd: 'fastfetch', out: `        ,\`''''.    OS ➜ Fedora EVERYTHING 
       |   ,.  |   KER ➜  Linux - stable one
       |  |  '_'   UP  ➜ No Idea 
 ,....|  |..       MEM ➜ 20$ worth
.'  _,|    ..'     WM  ➜  Hyprland 
|  |   |  |        
|  ',_,'  |        
 '.     ,'         
   '''''             ` }
  ]);

  const [copiedText, setCopiedText] = useState(false);

  // Snake Game Engine Initialization
  const startSnakeGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    foodRef.current = { x: Math.floor(Math.random() * 19), y: Math.floor(Math.random() * 19) };
    dirRef.current = { x: 1, y: 0 };
    setSnakeScore(0);
    setSnakeGameOver(false);
  };

  useEffect(() => {
    if (!snakeOpen) return;
    startSnakeGame();

    // Lock page background scrolling while playing Snake
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }

      if (['ArrowUp', 'KeyW'].includes(e.code) && dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 };
      if (['ArrowDown', 'KeyS'].includes(e.code) && dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 };
      if (['ArrowLeft', 'KeyA'].includes(e.code) && dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 };
      if (['ArrowRight', 'KeyD'].includes(e.code) && dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 };
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    const interval = setInterval(() => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const snake = [...snakeRef.current];
      const head = { x: snake[0]!.x + dirRef.current.x, y: snake[0]!.y + dirRef.current.y };

      // Wall / Self Collision Check
      if (
        head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setSnakeGameOver(true);
        return;
      }

      snake.unshift(head);

      // Food Collision Check
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setSnakeScore(prev => {
          const next = prev + 10;
          if (next > snakeHighScore) setSnakeHighScore(next);
          return next;
        });
        foodRef.current = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        };
      } else {
        snake.pop();
      }

      snakeRef.current = snake;

      // Draw Grid Frame
      ctx.fillStyle = '#120b0a';
      ctx.fillRect(0, 0, 300, 300);

      // Draw Food
      ctx.fillStyle = '#f4a300';
      ctx.fillRect(foodRef.current.x * 15 + 1, foodRef.current.y * 15 + 1, 13, 13);

      // Draw Snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#4361ee' : '#a43152';
        ctx.fillRect(seg.x * 15 + 1, seg.y * 15 + 1, 13, 13);
      });
    }, 100);

    gameLoopRef.current = interval;

    return () => {
      document.body.style.overflow = '';
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [snakeOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let out = '';

    if (cmd === 'help') {
      out = 'Available commands: fastfetch, snake, keybinds, quote, ls, cat [file], theme, cowsay [msg], clear';
    } else if (cmd === 'snake' || cmd === 'game' || cmd === 'play') {
      setSnakeOpen(true);
      out = 'Launching Snake Game 🐍... (Use Arrow Keys or WASD to control)';
    } else if (cmd === 'fastfetch' || cmd === 'neofetch') {
      out = `        ,\`''''.    OS ➜ Fedora EVERYTHING 
       |   ,.  |   KER ➜  Linux - stable one
       |  |  '_'   UP  ➜ No Idea 
 ,....|  |..       MEM ➜ 20$ worth
.'  _,|    ..'     WM  ➜  Hyprland 
|  |   |  |        
|  ',_,'  |        
 '.     ,'         
   '''''           `;
    } else if (cmd === 'keybinds' || cmd === 'keys') {
      out = `HYPRLAND KEYBINDINGS SHEET ⚡
-----------------------------------------
SUPER + Return       -> Launch Kitty Terminal
SUPER + Q            -> Kill Active Window
SUPER + Space        -> Rofi App Launcher
SUPER + Shift + E    -> Exit Hyprland Session
SUPER + F            -> Toggle Fullscreen Window
SUPER + 1..9         -> Switch Workspaces
SUPER + Drag Mouse   -> Move/Resize Window`;
    } else if (cmd === 'quote' || cmd === 'status') {
      const quotes = [
        '"Hyprland gaps > 0 or I riot."',
        '"Configured in Vim, written in VS Code."',
        '"Linux is user-friendly. It\'s just picky about who its friends are."',
        '"It\'s not a bug, it\'s an undocumented ricer feature."',
        '"Less GUI, more terminal. Stay fast."'
      ];
      out = quotes[Math.floor(Math.random() * quotes.length)] || quotes[0]!;
    } else if (cmd === 'ls') {
      out = 'total 12K\n-rw-r--r-- 1 baanbhaba 452B hyprland.conf\n-rw-r--r-- 1 baanbhaba 320B personal_projects.json\n-rw-r--r-- 1 baanbhaba 210B future_plans.md';
    } else if (cmd.startsWith('cat ')) {
      const fileName = cmd.replace('cat ', '').trim();
      const matched = DOTFILES.find(d => d.name.toLowerCase().includes(fileName) || d.path.toLowerCase().includes(fileName));
      if (matched) {
        out = matched.content;
      } else {
        out = `cat: ${fileName}: No such file. Try 'cat hyprland.conf' or 'cat personal_projects.json'`;
      }
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'theme') {
      out = 'Active Theme: Smth that isnt too boring i hope';
    } else if (cmd.startsWith('cowsay ')) {
      const msg = cmd.replace('cowsay ', '').trim();
      out = ` _____________________
< ${msg} >
 ---------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\  meow  )\\/\\
                ||----w |
                ||     ||`;
    } else {
      out = `bash: command not found: ${cmd}. Type 'help' for pre-defined commands.`;
    }

    setTerminalHistory((prev: Array<{ cmd: string; out: string }>) => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput('');
    playKeyClickSound();
  };

  const copyDotfiles = () => {
    playKeyClickSound();
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
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-card-about border-2 border-deep-rose rounded-2xl p-6 md:p-8 shadow-solid-rose flex flex-col justify-between transform -rotate-1 hover:rotate-0 hover:scale-[1.005] transition-transform duration-200 will-change-transform"
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
            I'm Anirbaan. I tinker with configs because it scratches my brain right. I shoot photos because details are worth remembering. Welcome to my corner of the internet — chaotic & messy yet comfy.
            </p>
          </div>

          {/* Current Interests */}
          <div className="mt-4 pt-6 border-t border-dashed border-deep-rose/20">
            <h3 className="font-sans text-xs font-bold tracking-widest text-deep-rose/70 uppercase mb-3">
              WHAT I'M INTO RIGHT NOW:
            </h3>
            
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Fedora Linux', color: 'bg-saffron text-on-surface hover:rotate-2' },
                { name: 'Hyprland', color: 'bg-terracotta text-white hover:-rotate-1' },
                { name: 'Apple Music', color: 'bg-red-500 text-white hover:rotate-1' },
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
                  / THE HOBBY
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
                  TERMINAL
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === 'editor' ? 'bg-saffron text-black shadow' : 'text-dusty-rose hover:text-white'
                  }`}
                >
                  PROJECTS
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerminalInput(e.target.value)}
                        placeholder="TYPE THISSSS ➜ help"
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

      {/* Retro Snake Game Modal Overlay */}
      <AnimatePresence>
        {snakeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSnakeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-card-about border-4 border-black rounded-2xl p-5 max-w-sm w-full shadow-solid-dark text-center relative font-mono text-on-surface"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-black/20">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-saffron" />
                  <h3 className="font-display text-xl uppercase tracking-tighter text-white bg-terracotta px-2 py-0.5 rounded border border-black">
                    RETRO SNAKE 🐍
                  </h3>
                </div>
                <button
                  onClick={() => setSnakeOpen(false)}
                  className="p-1 bg-black text-white hover:bg-red-600 border-2 border-black rounded-full cursor-pointer transition-all"
                  title="Close Snake Game"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Score Bar */}
              <div className="flex justify-between items-center text-xs font-bold bg-black/40 p-2 rounded-lg border border-white/10 mb-3 text-cream">
                <span>SCORE: <span className="text-saffron font-black">{snakeScore}</span></span>
                <span>HIGH: <span className="text-emerald-400 font-black">{snakeHighScore}</span></span>
              </div>

              {/* Game Canvas Container */}
              <div className="relative mx-auto w-[300px] h-[300px] border-2 border-black rounded-xl overflow-hidden shadow-inner bg-[#120b0a]">
                <canvas ref={canvasRef} width={300} height={300} className="block" />

                {/* Game Over Screen Overlay */}
                {snakeGameOver && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 space-y-3">
                    <div className="text-red-500 font-black text-xl tracking-widest animate-pulse">
                      GAME OVER 💀
                    </div>
                    <p className="text-xs text-gray-300">Final Score: {snakeScore}</p>
                    <button
                      onClick={startSnakeGame}
                      className="px-4 py-2 bg-saffron text-black font-extrabold text-xs uppercase tracking-wider border-2 border-black rounded-xl hover:bg-turmeric transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                    >
                      <RefreshCw className="w-4 h-4" /> Play Again
                    </button>
                  </div>
                )}
              </div>

              {/* On-screen Controls for Mobile */}
              <div className="mt-4 pt-3 border-t border-black/10">
                <p className="text-[10px] text-dusty-rose mb-2 font-bold uppercase">
                  CONTROLS: ARROW KEYS OR WASD
                </p>
                <div className="grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto sm:hidden">
                  <div />
                  <button onClick={() => { if (dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 }; }} className="p-2 bg-black text-white rounded font-bold border border-white/20 active:bg-saffron active:text-black">▲</button>
                  <div />
                  <button onClick={() => { if (dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 }; }} className="p-2 bg-black text-white rounded font-bold border border-white/20 active:bg-saffron active:text-black">◀</button>
                  <button onClick={() => { if (dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 }; }} className="p-2 bg-black text-white rounded font-bold border border-white/20 active:bg-saffron active:text-black">▼</button>
                  <button onClick={() => { if (dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 }; }} className="p-2 bg-black text-white rounded font-bold border border-white/20 active:bg-saffron active:text-black">▶</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
