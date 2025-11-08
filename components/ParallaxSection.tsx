// src/components/ParallaxSection.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

// Custom hook for parallax scrolling relative to section
const useScrollParallax = (ref: React.RefObject<HTMLElement>) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = ref.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section has been scrolled through
        // 0 = section just entered viewport, 1 = section completely passed
        const scrolled = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        const progress = Math.max(0, Math.min(1, scrolled));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return scrollProgress;
};

// Parallax Section Component (Second section after hero)
const ParallaxSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollParallax(sectionRef);
  
  // Text stays visible longer - only fades in the last 40% of scroll
  // 0-0.6 = fully visible, 0.6-1.0 = fading out
  const textOpacity = scrollProgress < 0.6 ? 1 : Math.max(0, 1 - (scrollProgress - 0.6) / 0.4);
  
  // Calculate parallax offset for images based on scroll progress
  // Convert progress (0-1) to pixel movement
  const maxParallaxDistance = 400; // Maximum pixels images will move
  
  const parallaxOffset1 = scrollProgress * maxParallaxDistance * 0.5;
  const parallaxOffset2 = scrollProgress * maxParallaxDistance * 0.3;
  const parallaxOffset3 = scrollProgress * maxParallaxDistance * 0.45;
  const parallaxOffset4 = scrollProgress * maxParallaxDistance * 0.35;

  return (
    <section 
      ref={sectionRef}
      className="relative h-[200vh] bg-black overflow-hidden"
    >
      {/* Fixed container for parallax effect */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          
          {/* Top Left Image - Dog/Pet */}
          <div 
            className="absolute top-0 left-0 w-64 h-96 overflow-hidden rounded-lg shadow-2xl"
            style={{
              transform: `translateY(${parallaxOffset1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/images/Shaurya1.jpg"
              alt="Creative work 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image - Car/Vehicle */}
          <div 
            className="absolute top-0 right-0 w-96 h-48 overflow-hidden rounded-lg shadow-2xl"
            style={{
              transform: `translateY(${parallaxOffset2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/images/Shaurya3.jpg"
              alt="Creative work 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Colorful Image - Abstract/Colorful */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-40 overflow-hidden rounded-lg shadow-2xl"
            style={{
              transform: `translate(-50%, ${parallaxOffset3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/images/Shaurya2.jpg"
              alt="Creative work 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Middle Portrait - Person */}
          <div 
            className="absolute top-1/3 right-12 w-64 h-72 overflow-hidden rounded-lg shadow-2xl"
            style={{
              transform: `translateY(${parallaxOffset4}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/images/Shaurya4.jpg"
              alt="Creative work 4"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Image - Tech/Product */}
          <div 
            className="absolute bottom-20 left-1/3 w-80 h-52 overflow-hidden rounded-lg shadow-2xl"
            style={{
              transform: `translateY(${parallaxOffset2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="/images/Shaurya5.jpg"
              alt="Creative work 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Fixed Text Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: textOpacity
          }}
        >
          <div className="text-center px-4">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
              Hey, I'm Shaurya
            </p>
            <h1 className="text-white text-6xl md:text-8xl font-light leading-tight">
              Let's make<br />
              things happen.
            </h1>
          </div>
        </div>

        {/* Menu Button */}
        
      </div>
    </section>
  );
};

export default ParallaxSection;