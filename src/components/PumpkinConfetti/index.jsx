const PUMPKIN_COUNT = 25;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const pumpkins = Array.from({ length: PUMPKIN_COUNT }, (_, i) => {
  const size = randomBetween(30, 80);
  const left = randomBetween(0, 100);
  const duration = randomBetween(2.5, 5);
  const delay = randomBetween(0, 2);
  const rotation = randomBetween(-180, 180);
  const drift = randomBetween(-150, 150);

  return { id: i, size, left, duration, delay, rotation, drift };
});

export const PumpkinConfetti = ({ active }) => {
  if (!active) return null;

  return (
    <div className="pumpkin-confetti" aria-hidden="true">
      {pumpkins.map((p) => (
        <img
          key={p.id}
          className="pumpkin-confetti__item"
          src="/Pumpkin.svg"
          alt=""
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--pumpkin-rotation": `${p.rotation}deg`,
            "--pumpkin-drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};
