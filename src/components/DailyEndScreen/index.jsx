import { useState, useEffect, useRef } from 'react';

import { ShovelIcon } from '../ShovelIcon';

const DAILY_END_HOUR = 9;
const DAILY_END_MINUTE = 30;

const getMinutesUntilEnd = () => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(DAILY_END_HOUR, DAILY_END_MINUTE, 0, 0);
  const diff = end - now;
  return Math.ceil(diff / 60_000);
};

const isDailyOver = () => getMinutesUntilEnd() <= 0;

let nextShovelId = 0;

const DailyEndScreen = () => {
  const [over, setOver] = useState(isDailyOver);
  const [minutesLeft, setMinutesLeft] = useState(() => Math.max(0, getMinutesUntilEnd()));
  const [shovels, setShovels] = useState([]);
  const intervalRef = useRef(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const tick = setInterval(() => {
      const remaining = getMinutesUntilEnd();
      setMinutesLeft(Math.max(0, remaining));
      if (remaining <= 0) setOver(true);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!over) return;

    const spawnBatch = () => {
      elapsedRef.current += 1;

      const count = Math.min(Math.floor(1 + elapsedRef.current / 3), 12);
      const batch = Array.from({ length: count }, () => {
        nextShovelId += 1;
        return {
          id: nextShovelId,
          left: Math.random() * 100,
          size: 30 + Math.random() * 60,
          duration: 2.5 + Math.random() * 2.5,
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
        };
      });

      setShovels((prev) => {
        const combined = [...prev, ...batch];
        if (combined.length > 200) return combined.slice(-200);
        return combined;
      });
    };

    spawnBatch();
    intervalRef.current = setInterval(spawnBatch, 1000);
    return () => clearInterval(intervalRef.current);
  }, [over]);

  if (!over) {
    return (
      <div className="daily-end">
        <div className="daily-end__countdown-circle">
          <span className="daily-end__minutes">{minutesLeft}</span>
          <span className="daily-end__minutes-label">min</span>
        </div>
        <p className="daily-end__message">
          {minutesLeft === 1
            ? 'Resta 1 minuto para charlar sobre trabajo'
            : `Restan ${minutesLeft} minutos para charlar sobre trabajo`}
        </p>
      </div>
    );
  }

  return (
    <div className="daily-end">
      <div className="shovel-rain" aria-hidden="true">
        {shovels.map((s) => (
          <img
            key={s.id}
            src="/palas/pala.png"
            alt=""
            className="shovel-rain__item"
            style={{
              left: `${s.left}%`,
              width: `${s.size}px`,
              '--fall-duration': `${s.duration}s`,
              '--fall-delay': `${s.delay}s`,
              '--start-rotation': `${s.rotation}deg`,
              '--end-rotation': `${s.rotation + s.spin}deg`,
            }}
          />
        ))}
      </div>
      <div className="daily-end__over">
        <ShovelIcon className="daily-end__icon" aria-hidden />
        <span className="daily-end__over-text">A laburar!!!</span>
      </div>
    </div>
  );
};

export { DailyEndScreen };
