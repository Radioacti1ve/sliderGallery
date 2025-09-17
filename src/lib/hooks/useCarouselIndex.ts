import { useCallback, useEffect, useState } from 'react';

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export function useCarouselIndex(opts: {
  len: number;
  currentIndex: number;
  loop: boolean;
  onIndexChange?: (i: number) => void;
}) {
  const { len, loop, onIndexChange } = opts;
  const normalize = useCallback(
    (i: number) => {
      if (!len) return 0;
      return loop ? ((i % len) + len) % len : clamp(i, 0, Math.max(0, len - 1));
    },
    [len, loop]
  );

  const [current, setCurrent] = useState(normalize(opts.currentIndex));

  useEffect(() => {
    setCurrent(normalize(opts.currentIndex));
  }, [opts.currentIndex, normalize]);

  const setIndex = useCallback(
    (i: number) => {
      const next = normalize(i);
      setCurrent(next);
      onIndexChange?.(next);
    },
    [normalize, onIndexChange]
  );

  const goNext = useCallback(() => setIndex(current + 1), [current, setIndex]);
  const goPrev = useCallback(() => setIndex(current - 1), [current, setIndex]);

  return { current, setIndex, goNext, goPrev };
}
