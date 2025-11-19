// components/TextFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const TextFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [texts, setTexts] = useState([]);
  const animationRef = useRef(null);
  const followerRef = useRef({ x: 0, y: 0 });

  const words = ['Hello', 'Awesome', 'Cool', 'Wow', 'Nice', 'Amazing', 'Great'];

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Occasionally add floating text
      if (Math.random() > 0.7) {
        setTexts(prev => [
          ...prev.slice(-3),
          {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            text: words[Math.floor(Math.random() * words.length)],
            life: 100
          }
        ]);
      }
    };

    const animateFollower = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.1;
      followerRef.current.y += dy * 0.1;
      
      // Update texts
      setTexts(prev => 
        prev.map(text => ({
          ...text,
          y: text.y - 1,
          life: text.life - 2
        })).filter(text => text.life > 0)
      );
      
      animationRef.current = requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', updateCursor);
    animationRef.current = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationRef.current);
    };
  }, [position]);

  return (
    <>
      {/* Floating Texts */}
      {texts.map(text => (
        <div
          key={text.id}
          className="fixed pointer-events-none z-[9999] text-sm font-bold whitespace-nowrap"
          style={{
            left: text.x,
            top: text.y,
            opacity: text.life / 100,
            color: `hsl(${text.life * 3.6}, 70%, 60%)`,
            textShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}
        >
          {text.text}
        </div>
      ))}

      {/* Main Follower */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-100"
        style={{
          left: followerRef.current.x - 15,
          top: followerRef.current.y - 15,
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg animate-bounce" />
      </div>
    </>
  );
};

export default TextFollower;