import { FC, useEffect, useState } from 'react';
import styles from './ModalSlider.module.css';
import { IModalSliderProps } from '../../types';
import {
  useSwipe,
  useSlides,
  useCarouselIndex,
  useKeyboard,
  useModal,
} from '../../hooks';
import { cn } from '../../utils';

const ModalSlider: FC<IModalSliderProps> = ({
  onClose,
  onIndexChange,
  loop = true,
  closeOnBackdrop = true,
  slides,
  children,
  prevControl,
  nextControl,
  currentIndex,
}) => {
  const { slidesArray, len, getKey, safeIndex } = useSlides(slides, children);

  const { current, goNext, goPrev } = useCarouselIndex({
    len,
    loop,
    currentIndex: safeIndex(currentIndex),
    onIndexChange,
  });

  const { isOpen, close } = useModal(onClose, 300);
  useKeyboard({ onClose: close, onNext: goNext, onPrev: goPrev });

  const { bind } = useSwipe(goNext, goPrev);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  return (
    <div
      className={cn(styles.modal, isOpen && styles.open)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${current * 100}%)`,
              touchAction: 'pan-y',
              userSelect: 'none',
            }}
            {...bind}
          >
            {slidesArray.map((node, index) => (
              <div key={getKey(node, index)} className={styles.carouselSlide}>
                {node}
              </div>
            ))}
          </div>

          {len > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goPrev}
                aria-label="Previous slide"
              >
                {prevControl ?? '‹'}
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goNext}
                aria-label="Next slide"
              >
                {nextControl ?? '›'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSlider;
