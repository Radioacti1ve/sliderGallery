import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomPhotos } from '../api/unsplash';
import type { IUnsplashPhoto } from '../types';

type UseGalleryProps = {
  perPage?: number;
};

export function useGallery({ perPage = 10 }: UseGalleryProps = {}) {
  const [photos, setPhotos] = useState<IUnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const aborted = useRef(false);

  const fetchPage = useCallback(
    async (pageToLoad: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = await getRandomPhotos(pageToLoad, perPage);
        setPhotos((prev) => [...prev, ...data]);
        if (data.length < perPage) {
          setHasMore(false);
        }
      } catch (err) {
        if (!aborted.current) {
          console.error('Failed to fetch photos:', err);
        }
      } finally {
        if (!aborted.current) {
          setLoading(false);
        }
      }
    },
    [perPage]
  );

  const loadNextPage = useCallback(() => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore]);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    aborted.current = false;

    if (page === 1 && isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchPage(page);
    } else if (page > 1) {
      fetchPage(page);
    }

    return () => {
      aborted.current = true;
    };
  }, [page]);

  return {
    photos,
    loading,
    hasMore,
    loadNextPage,
    reset: () => {
      setPhotos([]);
      setPage(1);
      setHasMore(true);
      isFirstLoad.current = true;
    },
  };
}
