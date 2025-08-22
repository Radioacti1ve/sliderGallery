import { useState, useEffect, useCallback, FC } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { getRandomPhotos } from '../../api/unsplash';
import { UnsplashPhoto } from '../../types';
import { Card } from '../Card';
import { ModalSlider } from '../ModalSlider';
import { throttle } from '../../utils/throttle';
import styles from './Gallery.module.css';

export const Gallery: FC = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const loadPhotos = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const data = await getRandomPhotos(page, 10);
    setPhotos((prev) => [...prev, ...data]);
    setLoading(false);

    if (data.length < 10) {
      setHasMore(false);
    }
  }, [loading, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const throttledScroll = useCallback(throttle(handleScroll, 300), [throttle]);

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      loadPhotos();
    }
  }, [page, hasMore]);

  const openModal = (id: string) => {
    const index = photos.findIndex((p) => p.id === id);
    setModalIndex(index);
    setModalOpen(true);
  };

  return (
    <div className={styles.gallery}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 250: 2, 350: 3, 750: 4, 900: 5, 1600: 6 }}>
        <Masonry>
          {photos.map((photo) => (
            <Card key={photo.id} photo={photo} openModal={() => openModal(photo.id)} />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {modalOpen && (
        <ModalSlider
          key={modalIndex}
          photos={photos}
          currentIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}

      {!hasMore && <p>Больше фотографий нет</p>}
    </div>
  );
};
