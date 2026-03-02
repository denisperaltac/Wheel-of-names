import { useState, useEffect } from 'react';

import { Confetti } from '../Confetti';

const COUNTDOWN_TOTAL_SECONDS = 150;

const COUNTDOWN_PALETTE = [
  '#2ecc71',
  '#48cfad',
  '#a0d468',
  '#ffce54',
  '#f1c40f',
  '#e67e22',
  '#fc6e51',
  '#e74c3c',
  '#c0392b',
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}:${s.toString().padStart(2, '0')}`;
};

const getCountdownColor = (remainingSeconds) => {
  const progress = 1 - remainingSeconds / COUNTDOWN_TOTAL_SECONDS;
  const index = Math.min(
    Math.floor(progress * COUNTDOWN_PALETTE.length),
    COUNTDOWN_PALETTE.length - 1,
  );

  return COUNTDOWN_PALETTE[index];
};

const WinnerModal = ({ winner, winnerImage, onClose, onRemoveAndClose }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    COUNTDOWN_TOTAL_SECONDS,
  );

  useEffect(() => {
    if (!winner) {
      return () => {};
    }

    setRemainingSeconds(COUNTDOWN_TOTAL_SECONDS);

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const next = Math.max(0, prev - 1);

        if (next === 0) {
          clearInterval(interval);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [winner]);

  if (!winner) {
    return null;
  }

  const countdownColor = getCountdownColor(remainingSeconds);

  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClose();
    }
  };

  const handleBoxKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="winner-modal__overlay"
      onClick={onClose}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Cerrar modal"
    >
      <Confetti active={!!winner} />
      <div
        className="winner-modal__box"
        role="dialog"
        aria-modal="true"
        aria-label="Ganador"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleBoxKeyDown}
      >
        {winnerImage && (
          <img
            className="winner-modal__photo"
            src={`/${winnerImage}`}
            alt={winner}
          />
        )}
        <p className="winner-modal__name">{winner}</p>
        <p
          className="winner-modal__countdown"
          style={{ color: countdownColor }}
          aria-live="polite"
        >
          {formatTime(remainingSeconds)}
        </p>
        <div className="winner-modal__actions">
          <button
            type="button"
            className="winner-modal__btn winner-modal__btn--info"
            onClick={onRemoveAndClose}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export { WinnerModal };
