import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/soundEffects';

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
        const dist = Math.hypot(dx, dy);

        // Target offset (sit 35px next to cursor)
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
    playPopSound();
    const barks = ["meow! 🐾", "purrrr~ 😺", "feed rice! 🍚", "hyprland! ⚡", "miau! ✨", "following u 👀"];
    setMeowText(barks[Math.floor(Math.random() * barks.length)] || "meow! 🐾");
    setTimeout(() => setMeowText(null), 2000);
  };

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

        {/* Pure CSS 8-Bit Pixel Art Cat Sprite */}
        <div
          className={`relative transition-transform duration-75 ${facingLeft ? 'scale-x-[-1]' : ''}`}
          style={{ width: '40px', height: '40px' }}
          title="Click your pixel cat to meow! 🐾"
        >
          {/* Pixel Cat Body Shadow */}
          <div className="absolute bottom-0 left-2 right-2 h-1.5 bg-black/30 rounded-full blur-[1px]" />

          {/* Pixel Tail */}
          <div
            className="absolute bottom-3 left-0 w-2 h-4 bg-terracotta border border-black rounded-t-full transition-transform origin-bottom"
            style={{ transform: `rotate(${tailAngle - 20}deg)` }}
          />

          {/* Main Cat Body */}
          <div className="absolute bottom-1 left-2.5 w-7 h-6 bg-saffron border-2 border-black rounded-lg">
            {/* Orange Stripes */}
            <div className="absolute top-1 left-1.5 w-1 h-3 bg-terracotta rounded-full" />
            <div className="absolute top-1 right-1.5 w-1 h-3 bg-terracotta rounded-full" />
          </div>

          {/* Front & Back Paws with Walking Animation */}
          <div
            className="absolute bottom-0 left-3 w-1.5 h-2 bg-black rounded-b-sm transition-transform"
            style={{ transform: `translateY(${pawOffsetLeft}px)` }}
          />
          <div
            className="absolute bottom-0 left-5.5 w-1.5 h-2 bg-black rounded-b-sm transition-transform"
            style={{ transform: `translateY(${pawOffsetRight}px)` }}
          />

          {/* Cat Head */}
          <div className="absolute top-1 left-1.5 w-8 h-7 bg-saffron border-2 border-black rounded-xl">
            {/* Left Ear */}
            <div className="absolute -top-2.5 left-0.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-black">
              <div className="absolute top-[2px] -left-[3px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-deep-rose" />
            </div>
            {/* Right Ear */}
            <div className="absolute -top-2.5 right-0.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-black">
              <div className="absolute top-[2px] -left-[3px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-deep-rose" />
            </div>

            {/* Eyes */}
            <div className="absolute top-2 left-1.5 w-2 h-2 bg-black rounded-full flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-white rounded-full translate-x-[0.5px] -translate-y-[0.5px]" />
            </div>
            <div className="absolute top-2 right-1.5 w-2 h-2 bg-black rounded-full flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-white rounded-full translate-x-[0.5px] -translate-y-[0.5px]" />
            </div>

            {/* Pink Nose */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-deep-rose rounded-full" />
            {/* Whiskers */}
            <div className="absolute top-4 -left-1.5 w-2 h-[1px] bg-black" />
            <div className="absolute top-4.5 -left-1.5 w-2 h-[1px] bg-black transform rotate-12" />
            <div className="absolute top-4 -right-1.5 w-2 h-[1px] bg-black" />
            <div className="absolute top-4.5 -right-1.5 w-2 h-[1px] bg-black transform -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
