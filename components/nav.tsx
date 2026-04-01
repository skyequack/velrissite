'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './nav.module.css';
import { useWindowScrollY } from '@/hooks/useWindowScrollY';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useWindowScrollY();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openProjectModal = () => {
    const event = new CustomEvent('openProjectModal');
    window.dispatchEvent(event);
  };

  const gradientPos = Math.min(scrollY / 50, 100);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-neutral border-b border-white/5">
        {/* Gold accent line */}
        <div className={styles.navbarGoldLine}></div>

        {/* Radial gradient overlay */}
        <div 
          className={styles.navbarGradientOverlay}
          style={{
            background: `radial-gradient(
              circle at ${gradientPos}% 0%,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.04) 30%,
              rgba(255, 255, 255, 0) 70%
            )`
          }}
        ></div>

        {/* Main navbar content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="shrink-0 ml-5">
              <Link href="/" className={styles.logo}>
                V&nbsp;E&nbsp;L&nbsp;R&nbsp;I&nbsp;S
              </Link>
            </div>

            {/* Desktop Navigation + CTA */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${styles.navLink} px-4 py-2 text-sm font-medium`}
                >
                  <span className={styles.navLinkText}>{item.name}</span>
                </a>
              ))}

              {/* Desktop CTA Buttons */}
              <div className="flex items-center gap-3 ml-8">
                <button
                  className={`${styles.ctaSecondary} px-6 py-2.5 text-sm font-medium rounded-lg`}
                  aria-label="See Our Work"
                >
                  See Our Work
                </button>
                <button
                  onClick={openProjectModal}
                  className={`${styles.ctaPrimary} px-6 py-2.5 text-sm font-semibold rounded-lg`}
                  aria-label="Start a Project"
                >
                  Start a Project
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-300 transition"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className={`${styles.mobileNav} md:hidden border-t border-white/5 py-4 space-y-3`}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium hover:opacity-80 transition"
                  style={{ color: 'var(--secondary-accent)' }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  className={`${styles.ctaSecondary} px-6 py-2.5 text-sm font-medium rounded-lg flex-1`}
                  aria-label="Get Started"
                >
                  Get Started
                </button>
                <button
                  onClick={openProjectModal}
                  className={`${styles.ctaPrimary} px-6 py-2.5 text-sm font-semibold rounded-lg flex-1`}
                  aria-label="Contact Us"
                >
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
