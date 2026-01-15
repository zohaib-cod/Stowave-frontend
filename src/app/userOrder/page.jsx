// components/WorkingPage.jsx
"use client";

import React from 'react';

const WorkingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-auto border border-white/20">
        
        {/* Animated Logo/Icon */}
        <div className="relative h-32 mb-8 flex items-center justify-center">
          {/* Main Center Gear */}
          <div className="absolute w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin">
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
          
          {/* Smaller Gears */}
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-spin-reverse">
            <div className="w-6 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-spin-slow">
            <div className="w-7 h-7 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            We're Cooking Something{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing!
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our team is working hard to bring you an incredible experience. 
            Stay tuned for something special coming your way soon!
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-500 text-sm">Loading awesome features...</p>
          </div>
        </div>

        {/* Stats/Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">99%</div>
            <div className="text-xs text-blue-500 font-medium">Complete</div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">Soon</div>
            <div className="text-xs text-purple-500 font-medium">Launch</div>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Status:</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              In Development
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Team:</span>
            <span className="text-gray-800 font-semibold">Working Hard</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Follow us for updates</p>
          {/* <div className="flex justify-center space-x-4">
            {['Tiktok', 'Facebook', 'Insta', 'whatsapp'].map((platform) => (
              <button
                key={platform}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {platform}
              </button>
            ))}
          </div> */}
        </div>

        {/* Floating Elements for Decoration */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-pink-400 rounded-full opacity-20 animate-ping"></div>
      </div>
    </div>
  );
};

export default WorkingPage;