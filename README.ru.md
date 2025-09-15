# @radioactiive/modal-slider-ui — React UI components

Набор лёгких компонентов для модальных окон со слайдами. Включает `<ModalSlider />`, `<ModalCard />` и хук `useSwipe`. Подходит для галерей, лайтбоксов и произвольного контента.

## Установка

```bash
npm i @radioactiive/modal-slider-ui
# или
yarn add @radioactiive/modal-slider-ui
# или
pnpm add @radioactiive/modal-slider-ui
```

> Требуются peer‑dependencies: **react >=18 <20**, **react-dom >=18 <20**.

---

## Быстрый старт

```tsx
import { useState } from 'react';
import { ModalSlider, ModalCard } from '@radioactiive/modal-slider-ui';

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const slides = [
    <img src="/1.jpg" alt="Фото 1" />,
    <img src="/2.jpg" alt="Фото 2" />,
    <ModalCard onClose={() => setOpen(false)} header={<b>Заголовок</b>}>
      Любой произвольный контент
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
        Открыть
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

## Архитектура

- **`<ModalSlider />`** — модальное окно + карусель.
- **`<ModalCard />`** — карточка с заголовком/футером.
- **`useSwipe(onLeft, onRight)`** — хук свайпов.

Компоненты собираются в `lib/index.cjs`, `lib/index.esm.js`, типы — `lib/index.d.ts`.

---

## `<ModalSlider />` API

```ts
interface IModalSliderBaseProps {
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  loop?: boolean; // default: true
  closeOnBackdrop?: boolean; // default: true
  prevControl?: ReactNode;
  nextControl?: ReactNode;
}
```

Источник данных: либо `slides: ReactNode[]`, либо `children: ReactNode`.

### Навигация

- Esc — закрыть
- ← / → — листать
- свайпы — через `useSwipe`

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

---

## `useSwipe(onLeft, onRight)`

Хук для обработки свайпов. Порог ±30px, работает с Pointer Events.

```tsx
const { bind } = useSwipe(() => console.log('←'), () => console.log('→'))
<div {...bind}>Контент</div>
```

---

## Стили

Все стили инкапсулированы в CSS‑модули. Бандлер Rollup помечает `**/*.css` как `sideEffects`, поэтому стили не будут вычищены.

---

## Репозиторий и баги

- GitLab: [slidegallery](https://gitlab.services.mts.ru/mkornev/slidegallery)
- Issues: [bugs](https://gitlab.services.mts.ru/mkornev/slidegallery/-/issues)

---

## Лицензия

MIT © Maxim Kornev
