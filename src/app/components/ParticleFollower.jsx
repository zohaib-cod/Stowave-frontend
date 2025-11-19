// components/ParticleFollower.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const ParticleFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add new particles
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.5) * 10,
        life: 100,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }));
      
      setParticles(prev => [...prev, ...newParticles].slice(-50));
    };

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          life: particle.life - 2,
          size: particle.size * 0.98
        })).filter(particle => particle.life > 0)
      );
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    document.addEventListener('mousemove', updateCursor);
    animationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / 100,
            transform: `scale(${particle.life / 100})`
          }}
        />
      ))}
    </>
  );
};

export default ParticleFollower;