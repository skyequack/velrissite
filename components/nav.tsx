'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [gradientPos, setGradientPos] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openProjectModal = () => {
    const event = new CustomEvent('openProjectModal');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Move right as you scroll (scale the position for visual effect)
      const pos = Math.min(scrollPosition / 50, 100);
      setGradientPos(pos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-gradient-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .navbar-gold-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(212, 175, 55, 0) 0%,
            rgba(212, 175, 55, 0.5) 20%,
            rgba(212, 175, 55, 1) 50%,
            rgba(212, 175, 55, 0.5) 80%,
            rgba(212, 175, 55, 0) 100%
          );
        }

        .nav-link {
          position: relative;
          display: inline-block;
          color: var(--secondary-accent);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link-text {
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .nav-link-text::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            var(--highlight) 25%,
            var(--highlight) 75%,
            transparent 100%
          );
          transform: translateX(-50%);
          transition: width 0.4s ease;
        }

        .nav-link:hover .nav-link-text::after {
          width: 100%;
        }

        .nav-link:hover .nav-link-text {
          color: var(--secondary-accent);
        }

        .mobile-nav {
          animation: fadeInDown 0.3s ease;
        }

        .cta-primary {
          background: linear-gradient(135deg, var(--primary-accent), #647F82);
          color: var(--background);
          transition: all 0.3s ease;
          box-shadow: 0 0px 15px rgba(212, 175, 55, 0.2);
        }

        .cta-primary:hover {
\          box-shadow: 0 0px 25px rgba(212, 175, 55, 0.3);
        }

        .cta-secondary {
          border: 1.5px solid rgba(212, 175, 55, 0.5);
          color: var(--secondary-accent);
          transition: all 0.3s ease;
          background: rgba(26, 26, 26, 0.05);
        }

        .cta-secondary:hover {
          border-color: var(--highlight);
          background: rgba(212, 175, 55, 0.1);
        }

        .logo {
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 4px;
          color: white;
          font-family: var(--font-montserrat), sans-serif;
        }
      `}</style>

      <nav className="sticky top-0 z-50 w-full bg-neutral border-b border-white/5">
        {/* Gold accent line */}
        <div className="navbar-gold-line"></div>

        {/* Radial gradient overlay */}
        <div 
          className="navbar-gradient-overlay"
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
              <Link href="/" className="logo">
                V&nbsp;E&nbsp;L&nbsp;R&nbsp;I&nbsp;S
              </Link>
            </div>

            {/* Desktop Navigation + CTA */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link px-4 py-2 text-sm font-medium"
                >
                  <span className="nav-link-text">{item.name}</span>
                </a>
              ))}

              {/* Desktop CTA Buttons */}
              <div className="flex items-center gap-3 ml-8">
                <button
                  className="cta-secondary px-6 py-2.5 text-sm font-medium rounded-lg"
                  aria-label="See Our Work"
                >
                  See Our Work
                </button>
                <button
                  onClick={openProjectModal}
                  className="cta-primary px-6 py-2.5 text-sm font-semibold rounded-lg"
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
                aria-expanded="false"
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
            <div className="mobile-nav md:hidden border-t border-white/5 py-4 space-y-3">
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
                  className="cta-secondary px-6 py-2.5 text-sm font-medium rounded-lg flex-1"
                  aria-label="Get Started"
                >
                  Get Started
                </button>
                <button
                  onClick={openProjectModal}
                  className="cta-primary px-6 py-2.5 text-sm font-semibold rounded-lg flex-1"
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
