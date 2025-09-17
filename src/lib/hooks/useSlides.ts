import {
  Children,
  ReactNode,
  ReactElement,
  isValidElement,
  useMemo,
} from 'react';

export function useSlides(slides?: ReactNode[], children?: ReactNode) {
  const slidesArray = useMemo<ReactNode[]>(
    () => slides ?? Children.toArray(children),
    [slides, children]
  );
  const len = slidesArray.length;

  const getKey = (node: ReactNode, index: number) => {
    if (isValidElement(node) && (node as ReactElement).key != null)
      return (node as ReactElement).key!;
    return index;
  };

  const safeIndex = (currentIndex: number) =>
    len ? ((currentIndex % len) + len) % len : 0;

  return { slidesArray, len, getKey, safeIndex };
}
