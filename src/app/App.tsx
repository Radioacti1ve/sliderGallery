import { FC, useCallback, useState } from 'react';
import './App.css';
import { Gallery } from './components/Gallery';
import { ModalSlider, ModalCard } from '../lib'; // <— добавили ModalCard
import type { IUnsplashPhoto } from './types';
import { useGallery } from './hooks/useGallery';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const { photos, loading, hasMore, loadNextPage } = useGallery({
    perPage: 10,
  });

  useInfiniteScroll({
    onLoadMore: loadNextPage,
    isLoading: loading,
    hasMore,
    offset: 1500,
    throttleMs: 500,
  });

  const openModal = useCallback(
    (id: string) => {
      const index = photos.findIndex((p: IUnsplashPhoto) => p.id === id);
      if (index !== -1) {
        setModalIndex(index);
        setModalOpen(true);
      }
    },
    [photos]
  );

  return (
    <div className="app">
      <h1>sliderGallery</h1>

      <Gallery
        photos={photos}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadNextPage}
        openModal={openModal}
      />

      {modalOpen && (
        <ModalSlider
          currentIndex={modalIndex}
          onClose={() => setModalOpen(false)}
          loop
          prevControl={
            <img
              src="/left.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
            />
          }
          nextControl={
            <img
              src="/right.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
            />
          }
        >
          {photos.map((p) => (
            <ModalCard
              key={p.id}
              onClose={() => setModalOpen(false)}
              header={<p>{p.user.name}</p>}
              footer={<p>Likes: {p.likes}</p>}
              ariaLabel={p.user.name}
              closeControl={
                <img
                  src="/close.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              }
            >
              <img
                src={p.urls.regular ?? p.urls.small}
                alt={p.user.name}
                draggable={false}
              />
            </ModalCard>
          ))}
        </ModalSlider>
      )}
    </div>
  );
};

export default App;
