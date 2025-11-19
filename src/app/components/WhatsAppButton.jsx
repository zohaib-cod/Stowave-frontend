
// components/WhatsAppButton.jsx
'use client';

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://wa.me/923290010909', '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        {/* Main Button */}
        <div className="relative">
          {/* Floating Notification */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-ping">
            !
          </div>
          
          {/* Button Container */}
          <div className="bg-green-500 text-white p-4 rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-green-600 relative overflow-hidden">
            <FaWhatsapp size={28} />
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
          
          {/* Tooltip Text */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us on WhatsApp!
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45" />
          </div>
        </div>
      </button>

      {/* Full Screen Hover Animation */}
      {isHovered && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Floating WhatsApp Icons */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl text-green-400/60 animate-whatsapp-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
              }}
            >
              <FaWhatsapp />
            </div>
          ))}
          
          Green Particles
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-green-400 animate-particle-float shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Message Bubbles */}
          {['Hello!', 'Hi 👋', 'Order?', 'Help?', 'Size?', 'Price?'].map((text, i) => (
            <div
              key={i}
              className="absolute bg-green-100 text-green-800 text-sm font-semibold px-3 py-2 rounded-2xl rounded-bl-none shadow-lg animate-message-float"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + Math.random() * 2}s`,
              }}
            >
              {text}
            </div>
          ))}
          
          {/* Connection Lines */}
          <div className="absolute inset-0 animate-connection">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-20 bg-green-300/40 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes whatsapp-float {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) rotate(360deg) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes particle-float {
          0% {
            transform: translateY(100vh) translateX(0px) scale(0);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-50px) translateX(${Math.random() * 100 - 50}px) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes message-float {
          0% {
            transform: translateY(100vh) scale(0.8);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateY(-150px) scale(1.1);
            opacity: 0;
          }
        }
        
        @keyframes connection {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-whatsapp-float {
          animation: whatsapp-float linear infinite;
        }
        
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
        
        .animate-message-float {
          animation: message-float linear infinite;
        }
        
        .animate-connection {
          animation: connection 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;




























// // components/WhatsAppButton.jsx
// 'use client';

// import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';

// const WhatsAppButton = () => {
//   const handleClick = () => {
//     window.open('https://wa.me/923290010909', '_blank');
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="fixed bottom-6 right-6 z-50 group"
//     >
//       <div className="bg-green-500 text-white p-4 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-12 hover:bg-green-600 relative overflow-hidden flex items-center gap-2">
//         <FaWhatsapp size={28} />
//         <span className="text-white font-semibold">WhatsApp</span>

//         {/* Button Shine Effect */}
//         <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//       </div>
//     </button>
//   );
// };

// export default WhatsAppButton;
