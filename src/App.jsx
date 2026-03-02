import { useState, useEffect, useRef, useCallback } from 'react';

import { WheelCanvas } from './components/WheelCanvas';
import { NameList } from './components/NameList';
import { WinnerModal } from './components/WinnerModal';
import { WinnerToast } from './components/WinnerToast';
import { PaletteSelector } from './components/PaletteSelector';
import { ShovelIcon } from './components/ShovelIcon';
import { LogomeliIcon } from './components/LogomeliIcon';
import { DRIVER_NAMES, getDriverImage } from './components/drivers';
import { PALETTES, PALETTE_IDS } from './components/palettes';
import { securePick } from './utils/secureRandom';

const STORAGE_KEY = 'wheel-names';

const WheelOfNames = () => {
  const [names, setNames] = useState(DRIVER_NAMES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        const merged = Array.from(parsed);

        DRIVER_NAMES.forEach((name) => {
          if (!merged.includes(name)) {
            merged.push(name);
          }
        });
        setNames(merged);
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }, []);

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [pastWinners, setPastWinners] = useState([]);
  const [toast, setToast] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const modalOpenedAt = useRef(null);

  const [paletteId, setPaletteId] = useState('soft');

  useEffect(() => {
    const randomId = securePick(PALETTE_IDS);

    setPaletteId(randomId);
  }, []);

  const setPalette = (id) => setPaletteId(id);
  const paletteColors = PALETTES[paletteId]?.colors ?? PALETTES.soft.colors;

  const saveNames = (newNames) => {
    setNames(newNames);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newNames));
    } catch {
      // Ignorar errores de localStorage
    }
  };

  const handleAdd = (name) => saveNames([...names, name]);

  const handleRemove = (index) =>
    saveNames(names.filter((_, i) => i !== index));

  const handleUpdate = (index, name) => {
    const updated = Array.from(names);

    updated[index] = name;
    saveNames(updated);
  };

  const handleReset = () => {
    setPastWinners([]);
    saveNames(DRIVER_NAMES);
  };

  const handleSpin = () => {
    if (spinning || names.length < 1) {
      return;
    }

    setSpinning(true);
  };

  const handleSpinEnd = (winnerName) => {
    setSpinning(false);
    setWinner(winnerName);
    modalOpenedAt.current = Date.now();
  };

  const handleClose = () => {
    const elapsed = Date.now() - (modalOpenedAt.current ?? 0);

    if (elapsed < 10000) {
      setToast(winner);
    }

    setWinner(null);
  };

  const handleDismissToast = useCallback(() => setToast(null), []);

  const handleRestore = (name, index) => {
    setPastWinners((prev) => prev.filter((_, i) => i !== index));
    saveNames([...names, name]);
  };

  const handleRemoveAndClose = () => {
    const elapsed = Date.now() - (modalOpenedAt.current ?? 0);

    if (elapsed < 10000) {
      setToast(winner);
    }

    saveNames(names.filter((n) => n !== winner));
    setPastWinners((prev) => [...prev, winner]);
    setWinner(null);
  };

  return (
    <div
      className={`wheel-page${fullscreen ? ' wheel-page--fullscreen' : ''}`}
      data-palette={paletteId}
    >
      <a href="/" className="wheel-page__logo" aria-label="Mercado Libre">
        <LogomeliIcon className="wheel-page__logo-svg" />
      </a>
      <PaletteSelector value={paletteId} onChange={setPalette} />
      <h1 className="wheel-page__title">DREAM TEAM DAILY</h1>

      <div className="wheel-page__layout">
        <div className="wheel-page__left">
          {names.length >= 1 ? (
            <WheelCanvas
              names={names}
              spinning={spinning}
              onSpinEnd={handleSpinEnd}
              onClick={handleSpin}
              colors={paletteColors}
              fullscreen={fullscreen}
            />
          ) : (
            <div className="wheel-page__empty">
              <ShovelIcon className="wheel-page__empty-icon" aria-hidden />
              <span>A laburar!!!</span>
            </div>
          )}
        </div>

        <div className="wheel-page__right">
          <NameList
            names={names}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
            onReset={handleReset}
            spinning={spinning}
            pastWinners={pastWinners}
            onRestore={handleRestore}
          />
        </div>
      </div>

      <button
        type="button"
        className="wheel-page__fullscreen-btn"
        onClick={() => setFullscreen((prev) => !prev)}
        aria-label={
          fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'
        }
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
      <WinnerModal
        winner={winner}
        winnerImage={winner ? getDriverImage(winner) : null}
        onClose={handleClose}
        onRemoveAndClose={handleRemoveAndClose}
      />
      {toast && <WinnerToast name={toast} onDismiss={handleDismissToast} />}
    </div>
  );
};

export default WheelOfNames;
