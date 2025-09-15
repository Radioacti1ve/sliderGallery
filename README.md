# @radioactiive/modal-slider-ui — React modal slider components

Lightweight modal slider and helpers for React 18+. No external runtime deps, CSS Modules for styling. Ships ESM, CJS and TypeScript types.

- **Package**: `@radioactiive/modal-slider-ui`
- **Entry points**: `lib/index.esm.js` (module), `lib/index.cjs` (main), `lib/index.d.ts` (types)
- **Peers**: `react >=18 <20`, `react-dom >=18 <20`
- **Side effects**: `**/*.css` (styles are preserved during tree-shaking)

## Installation

```bash
npm i @radioactiive/modal-slider-ui
# or
yarn add @radioactiive/modal-slider-ui
# or
pnpm add @radioactiive/modal-slider-ui
```

## Quick start

```tsx
import { useState } from 'react';
import { ModalSlider, ModalCard } from '@radioactiive/modal-slider-ui';

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const slides = [
    <img src="/1.jpg" alt="Photo 1" />,
    <img src="/2.jpg" alt="Photo 2" />,
    <ModalCard onClose={() => setOpen(false)} header={<b>Header</b>}>
      Any custom content here
    </ModalCard>,
  ];

  return (
    <>
      <button
        onClick={() => {
          setIdx(0);
          setOpen(true);
        }}
      >
        Open
      </button>
      {open && (
        <ModalSlider
          slides={slides}
          currentIndex={idx}
          onIndexChange={setIdx}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
```

---

## Components & hooks

- **`<ModalSlider />`** — modal container + carousel.
- **`<ModalCard />`** — convenience card for content inside the modal.
- **`useSwipe(onLeft, onRight)`** — pointer-based swipe detection.

The library exports named symbols:

```ts
import {
  ModalSlider,
  ModalCard,
  useSwipe,
} from '@radioactiive/modal-slider-ui';
```

---

## `<ModalSlider />` API

```ts
import type { ReactNode } from 'react';

interface IModalSliderBaseProps {
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  loop?: boolean; // default: true
  closeOnBackdrop?: boolean; // default: true
  prevControl?: ReactNode;
  nextControl?: ReactNode;
}

// Provide slides either via `slides` or via `children`.

type IModalSliderProps =
  | ({ slides: ReactNode[]; children?: never } & IModalSliderBaseProps)
  | ({ slides?: never; children: ReactNode } & IModalSliderBaseProps);
```

### Behavior

- **Keyboard**: `Esc` closes, `ArrowLeft`/`ArrowRight` navigate.
- **Looping**: when `loop=false`, index is clamped to `[0, len-1]`.
- **Backdrop**: when `closeOnBackdrop=true`, clicking the overlay closes the modal.
- **Swipe**: horizontal swipes trigger navigation (`useSwipe`).

### Example with children

```tsx
<ModalSlider currentIndex={idx} onClose={close} onIndexChange={setIdx}>
  <img src="/a.jpg" alt="A" />
  <video controls src="/b.mp4" />
  <div>Arbitrary JSX</div>
</ModalSlider>
```

### Custom controls

```tsx
<ModalSlider
  slides={slides}
  currentIndex={idx}
  onClose={close}
  prevControl={<span aria-hidden>‹</span>}
  nextControl={<span aria-hidden>›</span>}
/>
```

---

## `<ModalCard />` API

```ts
interface IModalCardProps {
  onClose: () => void;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  ariaLabel?: string;
  closeControl?: ReactNode;
}
```

Example:

```tsx
<ModalCard
  onClose={close}
  header={<strong>Photo</strong>}
  footer={<small>© Author</small>}
  closeControl={<span aria-hidden>×</span>}
  ariaLabel="Photo dialog"
>
  <img src="/photo.jpg" alt="Description" />
</ModalCard>
```

---

## `useSwipe(onLeft, onRight)`

Pointer Events–based swipe hook. Threshold ±30px; ignores non-left mouse buttons.

```ts
function useSwipe(
  onLeft: () => void,
  onRight: () => void
): {
  bind: {
    onPointerDown: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
  };
};
```

Usage:

```tsx
const { bind } = useSwipe(handleNext, handlePrev)
<div {...bind}>Drag me horizontally</div>
```

---

## Styling & animations

This package uses CSS Modules:

- `ModalSlider.module.css`: `modal`, `open`, `modalContainer`, `carousel`, `carouselTrack`, `carouselSlide`, `navButton`, `prevButton`, `nextButton`.
- `ModalCard.module.css`: `modalContent`, `close`, `info`, `body`.

Minimal example:

```css
.modal {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.modal.open {
  opacity: 1;
}
.carouselTrack {
  display: flex;
  transition: transform 0.3s ease;
}
```

**Open/close animation:** the component sets `isOpen` shortly after mount to add the `open` class, and on close it waits **300ms** before calling `onClose` to let CSS transitions finish.

**Scroll lock:** while open, `document.body.style.overflow = 'hidden'` is applied.

---

## Accessibility

- Root modal container: `role="dialog"`, `aria-modal="true"`.
- Provide `ariaLabel` to `<ModalCard />` when needed.
- Navigation buttons have `aria-label`s.

> Note: focus trapping and focus return to the opener are not included. Add a focus trap if your app requires strict a11y.

---

## SSR & portals

- The modal touches `document.body` for scroll lock; render it on the client only.
- If you need to escape stacking contexts, wrap the modal in a React portal.

---

## TypeScript

Type definitions are shipped via `lib/index.d.ts`. The public types include `IModalSliderProps`, `IModalCardProps` and helpers from the code above.

---

## Repository & issues

- Repo: [https://gitlab.services.mts.ru/mkornev/slidegallery](https://gitlab.services.mts.ru/mkornev/slidegallery)
- Issues: [https://gitlab.services.mts.ru/mkornev/slidegallery/-/issues](https://gitlab.services.mts.ru/mkornev/slidegallery/-/issues)

---

## License

MIT © Maxim Kornev
