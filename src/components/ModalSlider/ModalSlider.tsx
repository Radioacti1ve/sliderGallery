import { useState, useEffect, FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IModalSliderProps } from '../../types';
import { ModalCard } from '../ModalCard/ModalCard';
import styles from './ModalSlider.module.css';

export const ModalSlider: FC<IModalSliderProps> = ({
  photos,
  currentIndex,
  onClose,
}) => {
  const len = photos.length;
  const [current, setCurrent] = useState(
    len ? ((currentIndex % len) + len) % len : 0
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrent(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ''}`}
      onClick={handleClose}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div key={index} className={styles.carouselSlide}>
                <ModalCard photo={photo} onClose={handleClose} />
              </div>
            ))}
          </div>

          {photos.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goPrev}
              >
                <ChevronLeft size={32} />
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goNext}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
