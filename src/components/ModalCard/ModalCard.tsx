import { FC } from 'react';
import styles from './ModalCard.module.css';

interface IModalCardProps {
  photo: {
    urls: {
      regular: string;
    };
    user: {
      name: string;
    };
    likes: number;
  };
  onClose: () => void;
}

export const ModalCard: FC<IModalCardProps> = ({ photo, onClose }) => {
  return (
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>

      <div className={styles.info}>
        <p>{photo.user.name}</p>
      </div>

      <img
        src={photo.urls.regular}
        alt={photo.user.name}
        className={styles.image}
        loading="lazy"
      />

      <div className={styles.info}>
        <p>Likes: {photo.likes}</p>
      </div>
    </div>
  );
};
