const PaletteSelector = ({ onOpenModal, onRandom, onOpenNames, nameCount }) => (
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
        <path d="M12 2a10 10 0 0 0-7.35 16.76C6.53 21.16 9.7 22 12 22c1 0 1.73-.82 1.73-1.73 0-.45-.19-.83-.4-1.12-.28-.38-.43-.78-.43-1.15 0-.93.8-1.73 1.73-1.73H16.5A5.5 5.5 0 0 0 22 10.8C22 5.92 17.52 2 12 2Z" />
        <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
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
  </div>
);

export { PaletteSelector };
