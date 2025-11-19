// components/RippleFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const RippleFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create new ripple
      setRipples(prev => [
        ...prev,
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 1
        }
      ]);
    };

    const animateRipples = () => {
      setRipples(prev => 
        prev.map(ripple => ({
          ...ripple,
          size: ripple.size + 8,
          opacity: ripple.opacity - 0.02
        })).filter(ripple => ripple.opacity > 0)
      );
      
      animationRef.current = requestAnimationFrame(animateRipples);
    };

    document.addEventListener('mousemove', updateCursor);
    animationRef.current = requestAnimationFrame(animateRipples);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] border-2 rounded-full"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderColor: `rgba(147, 51, 234, ${ripple.opacity})`,
            opacity: ripple.opacity,
            transform: `scale(${ripple.opacity})`
          }}
        />
      ))}
    </>
  );
};

export default RippleFollower;