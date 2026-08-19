import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playMeowSound } from '../utils/soundEffects';

interface PixelCatSpriteProps {
  mouseX: number;
  mouseY: number;
}

export default function PixelCatSprite({ mouseX, mouseY }: PixelCatSpriteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const catPosRef = useRef({ x: 100, y: 100 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [meowText, setMeowText] = useState<string | null>(null);

  // Smooth 60fps direct DOM animation loop with requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const updatePosition = () => {
      const current = catPosRef.current;
      const dx = mouseX - current.x;
      const dy = mouseY - current.y;

      // Target offset: 30px to the side of the cursor
      const targetX = mouseX + (dx < 0 ? 35 : -35);
      const targetY = mouseY + 15;

      const moveDx = targetX - current.x;
      const moveDy = targetY - current.y;
      const moveDist = Math.hypot(moveDx, moveDy);

      if (moveDist > 4) {
        current.x += moveDx * 0.12;
        current.y += moveDy * 0.12;

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
        }

        setIsMoving(true);

        // Hysteresis threshold to prevent direction jitter
        if (moveDx < -8 && !facingLeft) setFacingLeft(true);
        if (moveDx > 8 && facingLeft) setFacingLeft(false);
      } else {
        setIsMoving(false);
      }

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animId);
  }, [mouseX, mouseY, facingLeft]);

  const handleMeow = () => {
    playMeowSound();
    const barks = ["meow! 🐾", "purrrr~ 😺", "feed rice! 🍚", "linux! ⚡", "miau! ✨", "following u 👀"];
    setMeowText(barks[Math.floor(Math.random() * barks.length)] || "meow! 🐾");
    setTimeout(() => setMeowText(null), 2200);
  };

  // Periodic random meow sound & speech bubble trigger (15s to 35s interval, desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    let timer: any = null;
    const scheduleNextRandomMeow = () => {
      const randomDelay = Math.floor(Math.random() * 20000) + 15000;
      timer = setTimeout(() => {
        if (window.innerWidth >= 768) {
          handleMeow();
        }
        scheduleNextRandomMeow();
      }, randomDelay);
    };

    scheduleNextRandomMeow();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: 'translate3d(100px, 100px, 0) translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform'
      }}
      className="hidden md:block select-none"
    >
      <div className="relative pointer-events-auto cursor-pointer" onClick={handleMeow}>
        {/* Meow Speech Bubble */}
        <AnimatePresence>
          {meowText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: -12 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white border-2 border-black rounded-xl px-2.5 py-0.5 shadow-solid-dark font-mono text-[10px] font-black text-black whitespace-nowrap z-50 pointer-events-none"
            >
              <span>{meowText}</span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-black transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Authentic SVG 8-Bit Pixel Cat Sprite */}
        <div
          className={`relative transition-transform duration-150 ${facingLeft ? 'scale-x-[-1]' : ''}`}
          style={{ width: '48px', height: '48px' }}
          title="Click your pixel cat to meow! 🐾"
        >
          {/* Shadow */}
          <div className="absolute bottom-0 left-2 right-2 h-1.5 bg-black/40 rounded-full blur-[1px]" />

          {/* Bobbing Animated Pixel Cat Image */}
          <motion.img
            animate={{
              y: isMoving ? [0, -3, 0] : [0, -1, 0],
              rotate: isMoving ? [0, 3, -3, 0] : 0
            }}
            transition={{
              repeat: Infinity,
              duration: isMoving ? 0.3 : 2,
              ease: 'easeInOut'
            }}
            src="/pixel_cat.svg"
            alt="8-Bit Pixel Cat Companion"
            className="w-full h-full object-contain image-rendering-pixelated drop-shadow-[2px_3px_0px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}
