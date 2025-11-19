// components/CircleTrailFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const CircleTrailFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => [
        ...prev.slice(-8), // Keep last 8 positions
        { id: Date.now(), x: e.clientX, y: e.clientY }
      ]);
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.15;
      followerRef.current.y += dy * 0.15;
      
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
      {/* Trail Circles */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-[9997] transition-all duration-200"
          style={{
            left: pos.x - (10 - index),
            top: pos.y - (10 - index),
            width: (20 - index * 2),
            height: (20 - index * 2),
            opacity: 0.7 - (index * 0.1),
            border: `2px solid rgba(139, 92, 246, ${0.8 - index * 0.1})`,
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Main Follower */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-100"
        style={{
          left: followerRef.current.x - 15,
          top: followerRef.current.y - 15,
        }}
      >
        <div className="w-8 h-8 border-2 border-purple-500 rounded-full animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    </>
  );
};

export default CircleTrailFollower;