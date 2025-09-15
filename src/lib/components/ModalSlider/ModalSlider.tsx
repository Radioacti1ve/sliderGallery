import {
  useState,
  useEffect,
  FC,
  ReactNode,
  ReactElement,
  isValidElement,
  Children,
} from 'react';
import styles from './ModalSlider.module.css';
import { IModalSliderProps } from '../../types';
import { useSwipe } from '../../hooks/useSwipe';

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const ModalSlider: FC<IModalSliderProps> = (props) => {
  const { onClose, onIndexChange, loop = true, closeOnBackdrop = true } = props;

  const slidesArray: ReactNode[] =
    props.slides ?? Children.toArray(props.children);
  const len = slidesArray.length;

  const safeIndex = len ? ((props.currentIndex % len) + len) % len : 0;
  const [current, setCurrent] = useState(safeIndex);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrent(len ? ((props.currentIndex % len) + len) % len : 0);
  }, [props.currentIndex, len]);

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  const setIndex = (next: number) => {
    let newIndex = next;
    if (!loop) {
      newIndex = clamp(next, 0, Math.max(0, len - 1));
    } else if (len) {
      newIndex = ((next % len) + len) % len;
    } else {
      newIndex = 0;
    }
    setCurrent(newIndex);
    onIndexChange?.(newIndex);
  };

  const goNext = () => setIndex(current + 1);
  const goPrev = () => setIndex(current - 1);

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
  }, [current, len]);

  const { bind } = useSwipe(goNext, goPrev);

  const getKey = (node: ReactNode, index: number) => {
    if (isValidElement(node) && (node as ReactElement).key != null) {
      return (node as ReactElement).key!;
    }
    return index;
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ''}`}
      onClick={closeOnBackdrop ? handleClose : undefined}
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
                {props.prevControl ?? '‹'}
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goNext}
                aria-label="Next slide"
              >
                {props.nextControl ?? '‹'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSlider;
