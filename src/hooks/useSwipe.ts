import { useRef, PointerEvent } from 'react';

export function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef(0);
  const active = useRef(false);

  const bind = {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      active.current = true;
      startX.current = e.clientX;
    },

    onPointerUp: (e: PointerEvent) => {
      if (!active.current) return;
      active.current = false;
      const dx = e.clientX - startX.current;
      if (dx < -30) onLeft();
      if (dx > 30) onRight();
    },
  };

  return { bind };
}
