import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playMeowSound } from '../utils/soundEffects';

interface PixelCatSpriteProps {
  mouseX: number;
  mouseY: number;
}

export default function PixelCatSprite({ mouseX, mouseY }: PixelCatSpriteProps) {
  const [catPos, setCatPos] = useState({ x: 100, y: 100 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const [meowText, setMeowText] = useState<string | null>(null);

  // Smooth lerp follower logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCatPos((prev) => {
        const dx = mouseX - prev.x;
        const dy = mouseY - prev.y;

        // Target offset (sit 30px next to cursor)
        const targetX = mouseX + (dx < 0 ? 30 : -30);
        const targetY = mouseY + 15;

        const moveDx = targetX - prev.x;
        const moveDy = targetY - prev.y;
        const moveDist = Math.hypot(moveDx, moveDy);

        if (moveDist > 5) {
          setIsMoving(true);
          if (moveDx < -2) setFacingLeft(true);
          if (moveDx > 2) setFacingLeft(false);

          return {
            x: prev.x + moveDx * 0.12,
            y: prev.y + moveDy * 0.12
          };
        } else {
          setIsMoving(false);
          return prev;
        }
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  // Walk animation cycle
  useEffect(() => {
    if (!isMoving) {
      setWalkFrame(0);
      return;
    }
    const timer = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
    }, 120);

    return () => clearInterval(timer);
  }, [isMoving]);

  const handleMeow = () => {
    playMeowSound();
    const barks = ["meow! 🐾", "purrrr~ 😺", "feed rice! 🍚", "linux! ⚡", "miau! ✨", "following u 👀"];
    setMeowText(barks[Math.floor(Math.random() * barks.length)] || "meow! 🐾");
    setTimeout(() => setMeowText(null), 2200);
  };

  // Periodic random meow sound & speech bubble trigger (12s to 24s interval)
  useEffect(() => {
    let timer: any = null;
    const scheduleNextRandomMeow = () => {
      const randomDelay = Math.floor(Math.random() * 12000) + 12000;
      timer = setTimeout(() => {
        handleMeow();
        scheduleNextRandomMeow();
      }, randomDelay);
    };

    scheduleNextRandomMeow();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Paw animation offset based on walk frame
  const pawOffsetLeft = isMoving ? (walkFrame % 2 === 0 ? -2 : 2) : 0;
  const pawOffsetRight = isMoving ? (walkFrame % 2 === 1 ? -2 : 2) : 0;
  const tailAngle = isMoving ? (walkFrame % 2 === 0 ? 15 : -15) : 0;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${catPos.x}px`,
        top: `${catPos.y}px`,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)'
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
              className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white border-2 border-black rounded-xl px-2.5 py-0.5 shadow-solid-dark font-mono text-[10px] font-black text-black whitespace-nowrap z-50"
            >
              <span>{meowText}</span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-black transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Authentic SVG 8-Bit Pixel Cat Sprite */}
        <div
          className={`relative transition-transform duration-75 ${facingLeft ? 'scale-x-[-1]' : ''}`}
          style={{ width: '48px', height: '48px' }}
          title="Click your pixel cat to meow! 🐾"
        >
          {/* Shadow */}
          <div className="absolute bottom-0 left-2 right-2 h-1.5 bg-black/40 rounded-full blur-[1px]" />

          {/* Bobbing Animated Pixel Cat Image */}
          <motion.img
            animate={{
              y: isMoving ? [0, -3, 0] : [0, -1, 0],
              rotate: isMoving ? [0, 4, -4, 0] : 0
            }}
            transition={{
              repeat: Infinity,
              duration: isMoving ? 0.25 : 2,
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
