import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const COLORS = ['#ffe600', '#3483fa', '#00a650', '#e74c3c', '#9b59b6'];
const DURATION = 4000;

export const Confetti = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const cannon = confetti.create(canvasRef.current, { resize: true });
    const end = Date.now() + DURATION;

    const frame = () => {
      cannon({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: COLORS,
      });

      cannon({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: COLORS,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => cannon.reset();
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
