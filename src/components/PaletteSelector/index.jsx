const PaletteSelector = ({
  onOpenModal,
  onRandom,
  onOpenNames,
  nameCount,
  fullscreen,
  onToggleFullscreen,
}) => (
  <div className="palette-actions">
    <button
      type="button"
      className="palette-actions__btn"
      onClick={onOpenModal}
      aria-label="Elegir diseño de rueda"
      title="Elegir diseño"
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
        <circle cx="13.5" cy="6.5" r="2" />
        <circle cx="17.5" cy="10.5" r="2" />
        <circle cx="8.5" cy="7.5" r="2" />
        <circle cx="6.5" cy="12.5" r="2" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-5.2-4.5-8.4-10-8.4Z" />
      </svg>
    </button>
    <button
      type="button"
      className="palette-actions__btn palette-actions__btn--random"
      onClick={onRandom}
      aria-label="Rueda aleatoria"
      title="Aleatorio"
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
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </svg>
    </button>
    <button
      type="button"
      className="palette-actions__btn palette-actions__btn--names"
      onClick={onOpenNames}
      aria-label="Administrar nombres"
      title="Administrar nombres"
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
      {nameCount > 0 && (
        <span className="palette-actions__badge">{nameCount}</span>
      )}
    </button>
    <button
      type="button"
      className="palette-actions__btn"
      onClick={onToggleFullscreen}
      aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
      title={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
    >
      {fullscreen ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 3v3a2 2 0 0 1-2 2H3" />
          <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
          <path d="M3 16h3a2 2 0 0 1 2 2v3" />
          <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 7V3h4" />
          <path d="M17 3h4v4" />
          <path d="M21 17v4h-4" />
          <path d="M7 21H3v-4" />
        </svg>
      )}
    </button>
  </div>
);

export { PaletteSelector };
