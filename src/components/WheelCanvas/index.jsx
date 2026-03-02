import { useRef, useEffect, useCallback, useState } from 'react';

import { ShovelIcon } from '../ShovelIcon';
import { secureRandomInt } from '../../utils/secureRandom';

const DEFAULT_COLORS = [
  '#e74c3c',
  '#3498db',
  '#f1c40f',
  '#2ecc71',
  '#e67e22',
  '#9b59b6',
  '#1abc9c',
  '#e91e63',
  '#00bcd4',
];

const SPIN_DURATION = 4000;
const BASE_SIZE = 500;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

const lighten = (hex, amount) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.floor(num / 0x10000) + amount);
  const g = Math.min(255, Math.floor((num % 0x10000) / 0x100) + amount);
  const b = Math.min(255, (num % 0x100) + amount);

  return `rgb(${r},${g},${b})`;
};

const drawWheel = (ctx, names, currentAngle, size, colors) => {
  const palette = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
  const scale = size / BASE_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 14 * scale;
  const segmentAngle = (2 * Math.PI) / names.length;

  ctx.clearRect(0, 0, size, size);

  ctx.beginPath();
  ctx.arc(cx, cy, radius + 4 * scale, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2 * scale;
  ctx.stroke();

  names.forEach((name, i) => {
    const startAngle = currentAngle + i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    const grad = ctx.createRadialGradient(
      cx,
      cy,
      radius * 0.15,
      cx,
      cy,
      radius,
    );
    const baseColor = palette[i % palette.length];

    grad.addColorStop(0, lighten(baseColor, 30));
    grad.addColorStop(1, baseColor);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2.5 * scale;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';

    const fontSize = Math.min(
      36 * scale,
      Math.max(16, (radius / names.length) * 3.2),
    );

    ctx.font = `bold italic ${fontSize}px 'Trebuchet MS', 'Arial Narrow', Arial, sans-serif`;
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    const maxTextWidth = radius - 24 * scale;

    let displayName = name;

    if (ctx.measureText(name).width > maxTextWidth) {
      while (
        ctx.measureText(`${displayName}…`).width > maxTextWidth &&
        displayName.length > 1
      ) {
        displayName = displayName.slice(0, -1);
      }

      displayName = `${displayName}…`;
    }

    ctx.fillText(displayName, radius - 12 * scale, fontSize * 0.38);
    ctx.restore();
  });

  const hubRadius = 22 * scale;
  const hubGrad = ctx.createRadialGradient(
    cx - 4,
    cy - 4,
    0,
    cx,
    cy,
    hubRadius,
  );

  hubGrad.addColorStop(0, '#ffffff');
  hubGrad.addColorStop(0.7, '#f0f0f0');
  hubGrad.addColorStop(1, '#e0e0e0');
  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius, 0, 2 * Math.PI);
  ctx.fillStyle = hubGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5 * scale;
  ctx.stroke();
};

const WheelCanvas = ({
  names,
  spinning,
  onSpinEnd,
  onClick,
  colors,
  fullscreen,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);
  const targetAngleRef = useRef(null);
  const startAngleRef = useRef(null);
  const idleAnimRef = useRef(null);
  const lastIdleTimeRef = useRef(null);

  const [size, setSize] = useState(BASE_SIZE);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !names.length) {
      return;
    }

    const ctx = canvas.getContext('2d');

    drawWheel(ctx, names, angleRef.current, size, colors);
  }, [names, size, colors]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const roRef = { current: null };

    let t3;

    const getSizeFromViewport = () => {
      if (fullscreen) {
        const maxSize = Math.min(window.innerWidth, window.innerHeight) - 16;

        return Math.max(200, maxSize);
      }

      const panelWidth = 280;
      const padding = 32;
      const reservedHeight = 80;
      const maxW = window.innerWidth - panelWidth - padding;
      const maxH = window.innerHeight - reservedHeight;
      const maxSize = Math.min(maxW, maxH) - 16;

      return Math.max(200, maxSize);
    };

    const updateSize = () => {
      const container = containerRef.current;
      const viewportSize = getSizeFromViewport();

      if (
        container &&
        container.clientWidth > 0 &&
        container.clientHeight > 0
      ) {
        const containerSize =
          Math.min(container.clientWidth, container.clientHeight) - 20;

        setSize(Math.max(200, Math.min(viewportSize, containerSize)));
      } else {
        setSize(viewportSize);
      }
    };

    updateSize();
    requestAnimationFrame(updateSize);

    const t1 = setTimeout(updateSize, 100);
    const t2 = setTimeout(updateSize, 400);

    const container = containerRef.current;

    if (container) {
      roRef.current = new ResizeObserver(() =>
        requestAnimationFrame(updateSize),
      );
      roRef.current.observe(container);
    } else {
      t3 = setTimeout(() => {
        if (containerRef.current) {
          roRef.current = new ResizeObserver(() =>
            requestAnimationFrame(updateSize),
          );
          roRef.current.observe(containerRef.current);
          updateSize();
        }
      }, 50);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);

      if (t3) {
        clearTimeout(t3);
      }

      if (roRef.current && container) {
        roRef.current.disconnect();
      }

      window.removeEventListener('resize', updateSize);
    };
  }, [fullscreen]);

  useEffect(() => {
    if (spinning) {
      if (idleAnimRef.current) {
        cancelAnimationFrame(idleAnimRef.current);
        idleAnimRef.current = null;
        lastIdleTimeRef.current = null;
      }

      return () => {};
    }

    const IDLE_SPEED = 0.00025;

    const tick = (timestamp) => {
      if (lastIdleTimeRef.current !== null) {
        angleRef.current += IDLE_SPEED * (timestamp - lastIdleTimeRef.current);
      }

      lastIdleTimeRef.current = timestamp;
      draw();
      idleAnimRef.current = requestAnimationFrame(tick);
    };

    idleAnimRef.current = requestAnimationFrame(tick);

    return () => {
      if (idleAnimRef.current) {
        cancelAnimationFrame(idleAnimRef.current);
        idleAnimRef.current = null;
        lastIdleTimeRef.current = null;
      }
    };
  }, [spinning, draw]);

  useEffect(() => {
    if (!spinning || !names.length) {
      return () => {};
    }

    const segmentAngle = (2 * Math.PI) / names.length;
    const winnerIndex = secureRandomInt(names.length);
    const extraSpins = (5 + secureRandomInt(5)) * 2 * Math.PI;
    const targetSegmentCenter = winnerIndex * segmentAngle + segmentAngle / 2;
    const stopAngle = -targetSegmentCenter;
    const totalRotation =
      extraSpins +
      ((stopAngle - (angleRef.current % (2 * Math.PI)) + 2 * Math.PI) %
        (2 * Math.PI));

    startAngleRef.current = angleRef.current;
    targetAngleRef.current = angleRef.current + totalRotation;
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const eased = easeOutCubic(progress);

      angleRef.current =
        startAngleRef.current +
        (targetAngleRef.current - startAngleRef.current) * eased;
      draw();

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        angleRef.current = targetAngleRef.current;
        draw();
        onSpinEnd(names[winnerIndex]);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, draw]);

  const pointerScale = size / BASE_SIZE;

  return (
    <div
      ref={containerRef}
      className={`wheel-canvas-wrapper${spinning ? ' wheel-canvas-wrapper--spinning' : ''}`}
    >
      <div
        className="wheel-canvas-inner"
        style={{
          width: size,
          height: size,
          '--pointer-scale': pointerScale,
        }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className={`wheel-canvas${spinning ? ' wheel-canvas--spinning' : ''}`}
          onClick={spinning ? undefined : onClick}
        />
        <div className="wheel-pointer" aria-hidden>
          <ShovelIcon />
        </div>
      </div>
    </div>
  );
};

export { WheelCanvas };
