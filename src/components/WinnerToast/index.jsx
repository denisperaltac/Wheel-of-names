import { useEffect, useState } from 'react';

const TOAST_DURATION_MS = 4000;

const ATRAS_IMAGES = [
  '/not-working/AtrasPala.png',
  '/not-working/AtrasPala2.jpeg',
  '/not-working/AtrasPala3.jpeg',
  '/not-working/AtrasPala4.jpeg',
  '/not-working/AtrasPala5.jpeg',
];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const WinnerToast = ({ name, onDismiss }) => {
  const [image] = useState(() => pickRandom(ATRAS_IMAGES));

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="winner-toast" role="status" aria-live="polite">
      <span className="winner-toast__name">{name}</span>
      <img className="winner-toast__img" src={image} alt="Atrás" />
    </div>
  );
};

export { WinnerToast };
