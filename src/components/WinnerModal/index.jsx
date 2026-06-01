import { useState, useEffect, useRef } from "react";

import { Confetti } from "../Confetti";
import { PumpkinConfetti } from "../PumpkinConfetti";

const COUNTDOWN_TOTAL_SECONDS = 150;
const PROMOTED_THRESHOLD = -60;

const COUNTDOWN_PALETTE = [
  "#2ecc71",
  "#48cfad",
  "#a0d468",
  "#ffce54",
  "#f1c40f",
  "#e67e22",
  "#fc6e51",
  "#e74c3c",
  "#c0392b",
];

const COUNTDOWN_STAGES = [
  { threshold: 100, icon: "😎" },
  { threshold: 60, icon: "🙂" },
  { threshold: 30, icon: "😬" },
  { threshold: 15, icon: "😧" },
  { threshold: 1, icon: "😱" },
  { threshold: -Infinity, icon: "telegram" },
];

const formatTime = (seconds) => {
  const abs = Math.abs(seconds);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const sign = seconds < 0 ? "-" : "";

  return `${sign}${m}:${s.toString().padStart(2, "0")}`;
};

const getCountdownColor = (remainingSeconds) => {
  const clamped = Math.max(0, remainingSeconds);
  const progress = 1 - clamped / COUNTDOWN_TOTAL_SECONDS;
  const index = Math.min(
    Math.floor(progress * COUNTDOWN_PALETTE.length),
    COUNTDOWN_PALETTE.length - 1,
  );

  return COUNTDOWN_PALETTE[index];
};

const getCountdownIcon = (remainingSeconds) => {
  for (const stage of COUNTDOWN_STAGES) {
    if (remainingSeconds >= stage.threshold) return stage.icon;
  }

  return "telegram";
};

const getTelegramProgress = (remainingSeconds) => {
  if (remainingSeconds >= 0) return 0;
  const elapsed = Math.abs(remainingSeconds);
  return Math.min(elapsed / Math.abs(PROMOTED_THRESHOLD), 1);
};

const BOCA_NOT_FOUND_NAMES = new Set(["Gio", "Pelu"]);

const WinnerModal = ({
  winner,
  winnerDisplayName,
  winnerImage,
  winnerBadge,
  isVegasTheme,
  onClose,
  onRemoveAndClose,
  confettiColors,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    COUNTDOWN_TOTAL_SECONDS,
  );
  const [promoted, setPromoted] = useState(false);
  const [showBocaNotFound, setShowBocaNotFound] = useState(false);
  const promotedFiredRef = useRef(false);

  useEffect(() => {
    if (!winner) {
      return () => {};
    }

    setRemainingSeconds(COUNTDOWN_TOTAL_SECONDS);
    setPromoted(false);
    promotedFiredRef.current = false;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [winner]);

  useEffect(() => {
    if (remainingSeconds <= PROMOTED_THRESHOLD && !promotedFiredRef.current) {
      promotedFiredRef.current = true;
      setPromoted(true);
    }
  }, [remainingSeconds]);

  useEffect(() => {
    setShowBocaNotFound(false);

    if (
      !winner ||
      winnerBadge?.id !== "boca" ||
      !BOCA_NOT_FOUND_NAMES.has(winner)
    ) {
      return () => {};
    }

    const timeoutId = setTimeout(() => {
      setShowBocaNotFound(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [winner, winnerBadge]);

  if (!winner) {
    return null;
  }

  const countdownColor = getCountdownColor(remainingSeconds);
  const countdownIcon = getCountdownIcon(remainingSeconds);
  const telegramProgress = getTelegramProgress(remainingSeconds);
  const showTelegram = remainingSeconds < 0 && !promoted;

  const displayImage =
    winner === "Jose" && remainingSeconds <= 0
      ? "/drivers/JoseOld.png"
      : winnerImage
        ? `/${winnerImage}`
        : null;
  const promotedElapsed = promoted
    ? Math.abs(remainingSeconds) - Math.abs(PROMOTED_THRESHOLD)
    : 0;
  const showPromotedArrival = promoted && promotedElapsed < 0;
  const houseTheme = winnerBadge?.theme ?? null;
  const displayName = winnerDisplayName ?? winner;

  const closeWithState = (callback) => {
    const isTelegramWalking = remainingSeconds < 0 && !promoted;
    callback({ telegramWalking: isTelegramWalking, promoted });
  };

  const handleBoxKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`winner-modal__overlay${isVegasTheme ? " winner-modal__overlay--vegas" : ""}`}
    >
      {isVegasTheme ? (
        <PumpkinConfetti active={!!winner} />
      ) : (
        <Confetti active={!!winner} colors={confettiColors} />
      )}
      {promoted && !isVegasTheme && (
        <Confetti key="promoted" active colors={confettiColors} />
      )}
      <div
        className={`winner-modal__box${isVegasTheme ? " winner-modal__box--vegas" : ""}`}
        style={
          houseTheme
            ? {
                "--winner-accent": houseTheme.accent,
                "--winner-accent-hover": houseTheme.accentHover,
                "--winner-house-border": houseTheme.border,
              }
            : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-label="Ganador"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleBoxKeyDown}
      >
        {isVegasTheme && (
          <p className="winner-modal__jackpot">JACKPOT WINNER</p>
        )}
        {(displayImage || winnerBadge?.logo || showBocaNotFound) && (
          <div className="winner-modal__hero">
            {displayImage && (
              <img
                className="winner-modal__photo"
                src={displayImage}
                alt={displayName}
              />
            )}
            {(winnerBadge?.logo || showBocaNotFound) && (
              <div className="winner-modal__house">
                {showBocaNotFound ? (
                  <p className="winner-modal__boca-not-found">404 Not Found</p>
                ) : (
                  <img
                    className="winner-modal__house-logo"
                    src={winnerBadge.logo}
                    alt={`Escudo de ${winnerBadge.name}`}
                  />
                )}
              </div>
            )}
          </div>
        )}
        <p className="winner-modal__name">{displayName}</p>
        <div className="winner-modal__content">
          {remainingSeconds > 0 && (
            <div className="winner-modal__countdown" aria-live="polite">
              <span className="winner-modal__countdown-time">
                <span
                  className="winner-modal__countdown-dot"
                  style={{
                    backgroundColor: countdownColor,
                    animationDuration: `${Math.max(0.4, remainingSeconds / 100)}s`,
                  }}
                />
                {formatTime(remainingSeconds)}
              </span>
            </div>
          )}

          {showTelegram && (
            <div className="winner-modal__track">
              <img
                src="/Telegrama.png"
                alt="Telegrama"
                className="winner-modal__track-telegram"
                style={{
                  left: `calc(${telegramProgress * 100}% - ${telegramProgress * 108}px + 30px)`,
                }}
              />
              <img
                src="/Cartero.png"
                alt="Cartero"
                className="winner-modal__track-cartero"
                style={{
                  left: `calc(${telegramProgress * 100}% - ${telegramProgress * 108}px + 85px)`,
                }}
              />
              <span className="winner-modal__track-house">🏠</span>
            </div>
          )}

          {promoted && (
            <div className="winner-modal__promoted">
              {showPromotedArrival && (
                <div className="winner-modal__promoted-arrival">
                  <img
                    src="/Telegrama.png"
                    alt="Telegrama"
                    className="winner-modal__track-telegram winner-modal__track-telegram--arrived"
                  />
                  <img
                    src="/Cartero.png"
                    alt="Cartero"
                    className="winner-modal__track-cartero winner-modal__track-cartero--arrived"
                  />
                  <span className="winner-modal__track-house">🏠</span>
                </div>
              )}
              <p className="winner-modal__promoted-text">
                Felicitaciones!!! haz sido ascendido a Cliente
              </p>
            </div>
          )}
        </div>
        <div className="winner-modal__actions">
          <button
            type="button"
            className="winner-modal__btn winner-modal__btn--info"
            onClick={() => closeWithState(onRemoveAndClose)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export { WinnerModal };
