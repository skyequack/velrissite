'use client';

import { useEffect, useState } from 'react';

type Listener = (scrollY: number) => void;

const listeners = new Set<Listener>();
let currentScrollY = 0;
let rafId: number | null = null;
let isAttached = false;

const dispatchScrollY = () => {
  currentScrollY = window.scrollY;
  listeners.forEach((listener) => listener(currentScrollY));
  rafId = null;
};

const onWindowScroll = () => {
  if (rafId !== null) {
    return;
  }

  rafId = window.requestAnimationFrame(dispatchScrollY);
};

const attach = () => {
  if (isAttached || typeof window === 'undefined') {
    return;
  }

  isAttached = true;
  currentScrollY = window.scrollY;
  window.addEventListener('scroll', onWindowScroll, { passive: true });
};

const detach = () => {
  if (!isAttached || typeof window === 'undefined') {
    return;
  }

  window.removeEventListener('scroll', onWindowScroll);

  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  isAttached = false;
};

export function useWindowScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    attach();
    const listener: Listener = (nextScrollY) => {
      setScrollY(nextScrollY);
    };

    listeners.add(listener);

    // Sync with actual scroll position after hydration so initial render matches SSR.
    const syncId = window.requestAnimationFrame(() => {
      dispatchScrollY();
    });

    return () => {
      window.cancelAnimationFrame(syncId);
      listeners.delete(listener);

      if (listeners.size === 0) {
        detach();
      }
    };
  }, []);

  return scrollY;
}
