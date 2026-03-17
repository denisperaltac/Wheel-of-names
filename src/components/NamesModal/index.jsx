import { NameList } from '../NameList';

const NamesModal = ({
  names,
  onAdd,
  onRemove,
  onUpdate,
  onReset,
  spinning,
  pastWinners,
  onRestore,
  onClose,
}) => {
  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };

  return (
    <div
      className="names-modal__overlay"
      onClick={onClose}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Cerrar lista de nombres"
    >
      <div
        className="names-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Administrar nombres"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="names-modal__header">
          <h2 className="names-modal__title">
            Participantes
            <span className="names-modal__count">{names.length}</span>
          </h2>
          <button
            type="button"
            className="names-modal__close"
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

        <NameList
          names={names}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
          onReset={onReset}
          spinning={spinning}
          pastWinners={pastWinners}
          onRestore={onRestore}
        />
      </div>
    </div>
  );
};

export { NamesModal };
