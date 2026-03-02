import { useEffect } from 'react';

const TOAST_DURATION_MS = 4000;

const WinnerToast = ({ name, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="winner-toast" role="status" aria-live="polite">
      <img className="winner-toast__img" src="/AtrasPala.png" alt="Atrás" />
      <span className="winner-toast__name">{name}</span>
    </div>
  );
};

export { WinnerToast };
