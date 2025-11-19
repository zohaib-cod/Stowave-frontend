// components/GlowOrbFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const GlowOrbFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState(0);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.08;
      followerRef.current.y += dy * 0.08;
      
      // Pulsing glow effect
      setGlow(prev => (prev + 0.05) % (Math.PI * 2));
      
      animationRef.current = requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', updateCursor);
    animationRef.current = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationRef.current);
    };
  }, [position]);

  const glowSize = 20 + Math.sin(glow) * 10;

  return (
    <div
      className="fixed pointer-events-none z-[9998] transition-all duration-100"
      style={{
        left: followerRef.current.x - glowSize / 2,
        top: followerRef.current.y - glowSize / 2,
      }}
    >
      {/* Main Orb */}
      <div className="relative">
        <div 
          className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
          style={{
            width: glowSize,
            height: glowSize,
            boxShadow: `0 0 30px ${glowSize}px rgba(34, 211, 238, 0.3)`
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-white opacity-30 animate-pulse" />
      </div>
    </div>
  );
};

export default GlowOrbFollower;