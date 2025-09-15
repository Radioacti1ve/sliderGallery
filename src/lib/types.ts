import { ReactNode } from 'react';

export interface IModalSliderBaseProps {
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  closeOnBackdrop?: boolean;

  prevControl?: ReactNode;
  nextControl?: ReactNode;
}

export interface IModalSliderPropsWithSlides extends IModalSliderBaseProps {
  slides: ReactNode[];
  children?: never;
}

export interface IModalSliderPropsWithChildren extends IModalSliderBaseProps {
  slides?: never;
  children: ReactNode;
}

export type IModalSliderProps =
  | IModalSliderPropsWithSlides
  | IModalSliderPropsWithChildren;

export interface IModalCardProps {
  onClose: () => void;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  ariaLabel?: string;
  closeControl?: ReactNode;
}
