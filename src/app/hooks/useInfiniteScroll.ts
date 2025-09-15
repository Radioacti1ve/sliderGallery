import { useEffect, useMemo } from 'react';
import { throttle } from '../utils';

type UseInfiniteScrollOptions = {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  offset?: number;
  throttleMs?: number;
};

export function useInfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore,
  offset = 1500,
  throttleMs = 500,
}: UseInfiniteScrollOptions) {
  const handleScroll = useMemo(() => {
    return () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
      if (nearBottom && !isLoading && hasMore) {
        onLoadMore();
      }
    };
  }, [onLoadMore, isLoading, hasMore, offset]);

  const throttled = useMemo(() => throttle(handleScroll, throttleMs), [handleScroll, throttleMs]);

  useEffect(() => {
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  }, [throttled]);
}
