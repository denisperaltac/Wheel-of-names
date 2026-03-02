import { useState } from 'react';

const DEFAULT_PAST_WINNERS = [];

const NameList = ({
  names,
  onAdd,
  onRemove,
  onUpdate,
  onReset,
  spinning,
  pastWinners = DEFAULT_PAST_WINNERS,
  onRestore,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(names[index]);
  };

  const commitEdit = (index) => {
    const trimmed = editingValue.trim();

    if (trimmed && trimmed !== names[index]) {
      onUpdate(index, trimmed);
    }

    setEditingIndex(null);
    setEditingValue('');
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      commitEdit(index);
    }

    if (e.key === 'Escape') {
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const handleSpanKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      if (!spinning) {
        startEditing(index);
      }
    }
  };

  return (
    <div className="name-list">
      <div className="name-list__input-row">
        <input
          type="text"
          className="name-list__input"
          placeholder="Agregar nombre..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={spinning}
        />
        <button
          type="button"
          className="name-list__btn name-list__btn--add"
          onClick={handleAdd}
          disabled={spinning || !inputValue.trim()}
        >
          +
        </button>
      </div>

      <ul className="name-list__list">
        {names.map((name, index) => (
          <li key={`name-${index}-${name}`} className="name-list__item">
            {editingIndex === index ? (
              <input
                type="text"
                className="name-list__edit-input"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => commitEdit(index)}
                onKeyDown={(e) => handleEditKeyDown(e, index)}
                aria-label="Editar nombre"
              />
            ) : (
              <button
                type="button"
                className="name-list__name name-list__name-as-btn"
                onClick={() => !spinning && startEditing(index)}
                onKeyDown={(e) => handleSpanKeyDown(e, index)}
                title="Clic para editar"
              >
                {name}
              </button>
            )}
            <button
              type="button"
              className="name-list__btn name-list__btn--remove"
              onClick={() => onRemove(index)}
              disabled={spinning}
              aria-label={`Eliminar ${name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {names.length > 0 && (
        <button
          type="button"
          className="name-list__btn name-list__btn--reset"
          onClick={onReset}
          disabled={spinning}
        >
          Restaurar lista
        </button>
      )}

      {pastWinners.length > 0 && (
        <div className="name-list__past">
          <ul className="name-list__list">
            {pastWinners.map((name, index) => (
              <li
                key={`past-${index}-${name}`}
                className="name-list__item name-list__item--past"
              >
                <span className="name-list__name name-list__name--past">
                  {name}
                </span>
                <button
                  type="button"
                  className="name-list__btn name-list__btn--restore"
                  onClick={() => onRestore(name, index)}
                  disabled={spinning}
                  aria-label={`Restaurar ${name}`}
                >
                  ↩
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { NameList };
