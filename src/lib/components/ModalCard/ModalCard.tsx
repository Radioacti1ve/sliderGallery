import { FC } from 'react';
import styles from './ModalCard.module.css';
import { IModalCardProps } from '../../types';
import close from '../../assets/close.svg';

const ModalCard: FC<IModalCardProps> = ({
  onClose,
  header,
  children,
  footer,
  ariaLabel,
  closeControl,
}) => {
  return (
    <div
      className={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <button className={styles.close} onClick={onClose} aria-label="Close">
        {closeControl ?? 'x'}
      </button>

      {header ? <div className={styles.info}>{header}</div> : null}

      <div className={styles.body}>{children}</div>

      {footer ? <div className={styles.info}>{footer}</div> : null}
    </div>
  );
};

export default ModalCard;
