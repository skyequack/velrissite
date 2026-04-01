'use client';

import { RefObject, useEffect, useMemo, useState } from 'react';
import { useWindowScrollY } from './useWindowScrollY';

type ScrollProgressOptions = {
  startOffset?: number;
  endOffset?: number;
};

const clamp = (value: number) => Math.max(0, Math.min(value, 1));

type ElementMetrics = {
  top: number;
  height: number;
  viewportHeight: number;
};

export function useScrollProgress<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  options: ScrollProgressOptions = {}
) {
  const { startOffset = 0, endOffset = 0 } = options;
  const scrollY = useWindowScrollY();
  const [metrics, setMetrics] = useState<ElementMetrics>({
    top: 0,
    height: 0,
    viewportHeight: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const measure = () => {
      const node = elementRef.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      setMetrics({
        top: rect.top + window.scrollY,
        height: rect.height,
        viewportHeight: window.innerHeight,
      });
    };

    const rafId = window.requestAnimationFrame(measure);
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
    };
  }, [elementRef]);

  return useMemo(() => {
    if (!metrics.height || !metrics.viewportHeight) {
      return 0;
    }

    const topInViewport = metrics.top - scrollY;

    const rawProgress =
      (metrics.viewportHeight - topInViewport - startOffset) /
      (metrics.viewportHeight + metrics.height + endOffset);

    return clamp(rawProgress);
  }, [endOffset, metrics, scrollY, startOffset]);
}
