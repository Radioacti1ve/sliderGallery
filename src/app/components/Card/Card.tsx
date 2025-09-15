import { FC } from 'react';
import { IPhotoCardProps } from '../../types';
import styles from './Card.module.css';

export const Card: FC<IPhotoCardProps> = ({ photo, openModal }) => {
  return (
    <section className={styles.card} onClick={() => openModal(photo.id)}>
      <div className={styles.imageWrapper}>
        <img src={photo.urls.small} alt={photo.user.name} />
      </div>

      <div className={styles.info}>
        <div className={styles.author}>
          <img
            src={photo.user.profile_image.small}
            alt={photo.user.name}
            className={styles.avatar}
          />
          <span className={styles.authorName}>{photo.user.name}</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.like}>
            🖤<span>{photo.likes}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
