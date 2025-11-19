// components/SimpleFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const SimpleFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      // Smooth follow effect
      followerRef.current.x += dx * 0.1;
      followerRef.current.y += dy * 0.1;
      
      animationRef.current = requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', updateCursor);
    animationRef.current = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position]);

  return (
    <div
      className="fixed pointer-events-none z-[9998] transition-all duration-100"
      style={{
        left: followerRef.current.x - 10,
        top: followerRef.current.y - 10,
      }}
    >
      {/* Animated Dot */}
      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg animate-pulse"></div>
    </div>
  );
};

export default SimpleFollower;