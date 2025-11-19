// components/CustomShapeFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const CustomShapeFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.1;
      followerRef.current.y += dy * 0.1;
      
      // Rotate based on movement
      setRotation(prev => (prev + 2) % 360);
      
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
        left: followerRef.current.x - 20,
        top: followerRef.current.y - 20,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Custom Shape */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
        <div className="absolute inset-2 bg-white rounded-full"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default CustomShapeFollower;