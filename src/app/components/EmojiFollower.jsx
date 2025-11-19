// components/EmojiFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const EmojiFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if element is clickable
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      );
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
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

  const getEmoji = () => {
    if (isPointer) return '👆'; // Pointing finger for clickable
    return '✨'; // Sparkle for normal
  };

  return (
    <div
      className={`fixed pointer-events-none z-[9998] transition-all duration-100 ${
        isPointer ? 'scale-125' : 'scale-100'
      }`}
      style={{
        left: followerRef.current.x - 20,
        top: followerRef.current.y - 20,
      }}
    >
      {/* Floating Emoji */}
      <div className="text-2xl animate-bounce">
        {getEmoji()}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 text-2xl opacity-50 animate-ping">
        {getEmoji()}
      </div>
    </div>
  );
};

export default EmojiFollower;