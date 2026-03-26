'use client';

import { useState, useEffect } from 'react';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [hasLoaded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientX = 50 + (scrollY / 5) % 50;
  const gradientY = Math.sin(scrollY / 150) * 50;

  return (
    <section className="w-full bg-background h-[calc(100vh-90px)] max-h-[calc(100vh-80px)] pt-10 overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes colorChange {
          from { 
            background-position: 0% 0%;
          }
          to { 
            background-position: 100% 100%;
          }
        }
        @keyframes fadeToGray {
          from { color: white; }
          to { color: #6A6A6A; }
        }
        .gradient-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .lead-color-animate {
          background: linear-gradient(135deg, white 0%, white 50%, var(--highlight) 100%);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorChange 1s ease-in-out forwards;
        }
        .fade-to-gray {
          animation: fadeToGray 1s ease-in-out forwards;
          animation-delay: 2s;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="bg-foreground rounded-[10px] m-2 min-h-125 flex flex-col relative" style={{ boxShadow: '0 0 1px 1px rgba(212, 175, 37, 0.3)' }}>
          <div 
            className={`absolute inset-0 rounded-[10px] pointer-events-none ${hasLoaded ? 'gradient-fade-in' : ''}`} 
            style={{ 
              background: `radial-gradient(circle at ${gradientX}% ${50 + gradientY}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
              opacity: hasLoaded ? 1 : 0
            }}
          ></div>
          <div className="w-full h-auto grid grid-cols-3 gap-6 p-8 grow relative z-10">
          
            <div className="col-span-2">
              <h1 className="font-sans text-white font-bold text-4xl leading-snug">
                Structured brands don&apos;t blend in.
                <br />
                They&nbsp;
                <span className="text-primary lead-color-animate">lead.</span>

              </h1>
              <p className="font-mono mt-5 ml-1.5 text-white font-bold text-xl leading-snug">
                Most content looks the same. Same angles. Same trends.
                <br />
                <span className="fade-to-gray">Same output that disappears in a scroll.</span> 
              </p>
              <p className="font-sans mt-5 ml-1.5 text-primary font-extrabold text-3xl leading-snug">
                 Velris
                <span className="text-white font-normal"> builds the architecture that keeps your brand consistent across every platform and campaign.</span> 
              </p>
            </div>
            <div className="flex items-start justify-center">
              <img src="/images/logo.jpeg" alt="Logo" className="w-full h-auto rounded-lg" />
            </div>
          
          </div>
          <div className="w-full relative z-10">
            <p className="font-sans mb-7  text-lg font-bold text-white text-center">
              clear scope&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;defined standards&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;predictable timelines&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;executive-ready output
            </p>
          </div>
        </div>
        <div className="w-full mt-10 h-auto">
          <p className="font-mono text-center">
            <span className="text-highlight">Riyadh</span>
            <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="text-highlight">Jeddah</span>
            <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="text-highlight">GCC</span>
            <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="text-highlight">Remote</span>
          </p>
        </div>
      </div>
    </section>
  );
}
