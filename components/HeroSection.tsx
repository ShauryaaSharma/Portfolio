// src/components/HeroSection.tsx
"use client";
import { Six_Caps } from 'next/font/google'

import React, { useEffect, useRef, useState } from 'react';

const sixCaps = Six_Caps({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);


  // Trigger opening animation on mount
  useEffect(() => {
    // Small delay to ensure smooth animation start
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const heroBottom = rect.bottom;
        
        // Only calculate scroll if hero is still visible
        if (heroBottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transforms
  // Text moves faster than image creating parallax effect
  const textTransform = scrollY * 0.8; // Text moves at 80% of scroll speed
  const imageTransform = scrollY * 0.4; // Image moves at 40% of scroll speed (slower)
  
  // Calculate opacity based on scroll
  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gray-100"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 flex justify-center">
        <nav className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full shadow-lg">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Home
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              About
            </a>
            
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Work Experience
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Projects
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Research
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Articles
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Resume & LoR
            </a>
            <a href="#" className="text-white text-sm font-medium hover:text-white/70 transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${imageTransform}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          src="/images/Shaurya.jpg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content with Parallax - Positioned at center */}
      <div 
        className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
        style={{
          transform: `translateY(-${textTransform}px)`,
          opacity: opacity,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="w-full max-w-7xl">
          {/* Large Title with Opening Animation - Centered */}
          <div className="mb-0 overflow-hidden text-center w-full">
            <h1 
              className={`text-[28vw] md:text-[24vw] lg:text-[20vw] leading-[0.85] tracking-normal transition-all duration-1500 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{
                fontFamily: '"BBH Sans Bartle"',
                fontWeight: 400,
                fontStyle: 'normal',
                background: 'linear-gradient(to right, #ff9d00ff 0%, #f4aa22ff 20%, #f5bb51ff 40%, #8ba9b5 60%, #7a98a6 80%, #ccbca8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.3))',
                width: '100%',
                height: '100%',
                margin: '0 auto',
                paddingTop: '25px',
                paddingBottom: '25px'
              }}
            >
              SHAURYA SHARMA
            </h1>
          </div>

          {/* Location and Description with Staggered Animation - Positioned at bottom left */}
          <div 
            className={`absolute bottom-16 left-6 md:left-12 max-w-2xl space-y-3 transition-all duration-1500 delay-300 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-white text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
              {/* BRIGHTON, UNITED KINGDOM */}
            </p>
            <p className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
              {/* Production, design, and the<br />
              art of the possible. */}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ opacity: opacity }}
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;