import { PALETTES, PALETTE_IDS } from '../palettes';

const PaletteSelector = ({ value, onChange }) => (
  <fieldset className="palette-selector" aria-label="Diseño de paleta">
    {PALETTE_IDS.map((id) => {
      const palette = PALETTES[id];
      const isSelected = value === id;

      return (
        <button
          key={id}
          type="button"
          className={`palette-selector__tag ${isSelected ? 'palette-selector__tag--active' : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={isSelected}
          aria-label={`Paleta ${palette.name}`}
          title={palette.name}
        >
          <span className="palette-selector__swatches">
            {palette.colors.slice(0, 5).map((color, swatchIndex) => (
              <span
                key={`${id}-${color}-${swatchIndex}`}
                className="palette-selector__swatch"
                style={{ background: color }}
              />
            ))}
          </span>
          <span className="palette-selector__label">{palette.name}</span>
        </button>
      );
    })}
  </fieldset>
);

export { PaletteSelector };
