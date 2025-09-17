import { useEffect } from 'react';

export function useKeyboard(handlers: {
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlers.onClose?.();
      if (e.key === 'ArrowRight') handlers.onNext?.();
      if (e.key === 'ArrowLeft') handlers.onPrev?.();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [handlers]);
}
