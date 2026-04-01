'use client';

import { useState } from 'react';
import { useWindowScrollY } from '@/hooks/useWindowScrollY';
import { cambo } from '@/lib/fonts';
import styles from './Hero.module.css';

export function Hero() {
  const scrollY = useWindowScrollY();
  const [hasLoaded] = useState(true);

  const gradientX = 50 + (scrollY / 5) % 50;
  const gradientY = Math.sin(scrollY / 150) * 50;

  return (
    <section className="w-full bg-background h-[calc(100vh-90px)] max-h-[calc(100vh-80px)] pt-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full relative">
        <div
          aria-hidden="true"
          className={`${styles.heroGlow} ${styles.heroGlowWarm} pointer-events-none absolute left-0 top-12 h-80 w-80`}
          style={{ transform: `translate3d(${gradientX * 0.06}px, ${gradientY * 0.05}px, 0)` }}
        />
        <div
          aria-hidden="true"
          className={`${styles.heroGlow} ${styles.heroGlowCool} pointer-events-none absolute right-8 top-24 h-88 w-88`}
          style={{ transform: `translate3d(${gradientX * -0.04}px, ${gradientY * 0.03}px, 0)` }}
        />
        <div className={`${styles.heroBackground} relative z-10 m-2 min-h-125 flex flex-col rounded-[10px]`} style={{ boxShadow: '0 0 1px 1px rgba(212, 175, 37, 0.3)' }}>
          <div 
            className={`absolute inset-0 rounded-[10px] pointer-events-none ${hasLoaded ? styles.gradientFadeIn : ''}`} 
            style={{ 
              background: `radial-gradient(circle at ${gradientX}% ${50 + gradientY}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
              opacity: hasLoaded ? 1 : 0
            }}
          ></div>
          <div className="w-full h-auto grid grid-cols-3 gap-6 p-8 grow relative z-10">
          
            <div className="col-span-2">
              <h1 className={`${cambo.className} text-white font-bold text-5xl leading-snug`}>
                Structured brands don&apos;t blend in.
                <br />
                They&nbsp;
                <span className={`text-primary ${styles.leadColorAnimate}`}>lead.</span>

              </h1>
              <p className="font-mono mt-5 ml-1.5 text-white font-bold text-xl leading-snug">
                Most content looks the same. Same angles. Same trends.
                <br />
                <span className={styles.fadeToGray}>Same output that disappears in a scroll.</span> 
              </p>
              <p className="font-sans mt-5 ml-1.5 text-primary font-extrabold text-3xl leading-snug">
                 Velris
                <span className="text-white font-normal"> builds the architecture that keeps your brand consistent across every platform and campaign.</span> 
              </p>
            </div>
            <div className="flex items-start justify-center"></div>
          
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
