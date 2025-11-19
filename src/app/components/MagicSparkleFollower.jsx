// components/MagicSparkleFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const MagicSparkleFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add new sparkle
      setSparkles(prev => [
        ...prev.slice(-15), // Keep only last 15 sparkles
        { id: Date.now(), x: e.clientX, y: e.clientY }
      ]);
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.08;
      followerRef.current.y += dy * 0.08;
      
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
    <>
      {/* Sparkle Trail */}
      {sparkles.map((sparkle, index) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9997] transition-opacity duration-1000"
          style={{
            left: sparkle.x - 4,
            top: sparkle.y - 4,
            opacity: 1 - (index / sparkles.length),
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            index % 3 === 0 ? 'bg-yellow-400' : 
            index % 3 === 1 ? 'bg-blue-400' : 'bg-pink-400'
          } animate-ping`}></div>
        </div>
      ))}

      {/* Main Follower */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-75"
        style={{
          left: followerRef.current.x - 15,
          top: followerRef.current.y - 15,
        }}
      >
        {/* Magic Orb */}
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
          <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
    </>
  );
};

export default MagicSparkleFollower;