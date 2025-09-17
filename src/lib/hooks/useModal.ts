import { useEffect, useState, useCallback } from 'react';

export function useModal(onClose?: () => void, closeDelayMs = 300) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const t = setTimeout(() => onClose?.(), closeDelayMs);
    return () => clearTimeout(t);
  }, [onClose, closeDelayMs]);

  return { isOpen, close };
}
