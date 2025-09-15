import { FC } from 'react';
import { IGalleryProps } from '../../types';
import { Card } from '../Card';
import styles from './Gallery.module.css';

export const Gallery: FC<IGalleryProps> = ({
  photos,
  loading,
  hasMore,
  onLoadMore,
  openModal,
}) => {
  return (
    <>
      <div className={styles.gallery}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.item}>
            <Card photo={photo} openModal={() => openModal(photo.id)} />
          </div>
        ))}
      </div>

      {loading && <p className={styles.status}>Загрузка…</p>}
      {!hasMore && (
        <p className={styles.status}>
          Произошла непредвиденная ошибка или фотографий больше нет
        </p>
      )}
    </>
  );
};
