'use client';

import { RefObject, useEffect, useState } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useRevealOnIntersect<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  options: RevealOptions = {}
) {
  const { threshold = 0.25, rootMargin = '0px', once = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, once, rootMargin, threshold]);

  return isVisible;
}
