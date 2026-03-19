import { PALETTES, PALETTE_IDS } from '../palettes';

const SHUFFLED_IDS = [
  'argentina', 'electric', 'claude', 'berry',
  'harryPotter', 'soft', 'venezuela', 'vivid',
  'meli', 'earth', 'river',
  ...PALETTE_IDS.filter(
    (id) =>
      !['argentina', 'electric', 'claude', 'berry', 'harryPotter', 'soft', 'venezuela', 'vivid', 'meli', 'earth', 'river'].includes(id),
  ),
];

const buildConicGradient = (colors) => {
  const n = colors.length;
  const sliceAngle = 360 / n;

  const stops = colors
    .map((c, i) => `${c} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`)
    .join(', ');

  return `conic-gradient(from -90deg, ${stops})`;
};

const PaletteModal = ({ value, onChange, onClose }) => {
  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };

  const handleSelect = (id) => {
    onChange(id);
    onClose();
  };

  return (
    <div
      className="palette-modal__overlay"
      onClick={onClose}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Cerrar selector de diseño"
    >
      <div
        className="palette-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Seleccionar diseño de rueda"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="palette-modal__header">
          <h2 className="palette-modal__title">Diseño de rueda</h2>
          <button
            type="button"
            className="palette-modal__close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="palette-modal__grid">
          {SHUFFLED_IDS.map((id) => {
            const palette = PALETTES[id];
            const isSelected = value === id;

            return (
              <button
                key={id}
                type="button"
                className={`palette-card${isSelected ? ' palette-card--active' : ''}`}
                onClick={() => handleSelect(id)}
                aria-pressed={isSelected}
              >
                <div className="palette-card__wheel-wrapper">
                  <div
                    className="palette-card__wheel"
                    style={{ background: buildConicGradient(palette.colors) }}
                  >
                    {palette.center ? (
                      <img
                        className="palette-card__wheel-center"
                        src={palette.center}
                        alt=""
                      />
                    ) : (
                      <div className="palette-card__wheel-hub" />
                    )}
                  </div>
                  {palette.pointer && (
                    <img
                      className="palette-card__pointer"
                      src={palette.pointer}
                      alt=""
                    />
                  )}
                </div>
                <span className="palette-card__name">{palette.name}</span>
                <span className="palette-card__swatches">
                  {palette.colors.map((color, i) => (
                    <span
                      key={`${id}-${i}`}
                      className="palette-card__swatch"
                      style={{ background: color }}
                    />
                  ))}
                </span>
                {isSelected && (
                  <span className="palette-card__check" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { PaletteModal };
