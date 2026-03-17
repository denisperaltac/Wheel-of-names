import { useState, useEffect, useRef, useCallback } from 'react';

import { WheelCanvas } from './components/WheelCanvas';
import { WinnerModal } from './components/WinnerModal';
import { WinnerToast } from './components/WinnerToast';
import { PaletteSelector } from './components/PaletteSelector';
import { PaletteModal } from './components/PaletteModal';
import { NamesModal } from './components/NamesModal';
import { DailyEndScreen } from './components/DailyEndScreen';
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
  const modalOpenedAt = useRef(null);

  const [paletteId, setPaletteId] = useState('soft');

  useEffect(() => {
    const randomId = securePick(PALETTE_IDS);

    setPaletteId(randomId);
  }, []);

  const [paletteModalOpen, setPaletteModalOpen] = useState(false);
  const [namesModalOpen, setNamesModalOpen] = useState(false);

  const formatClock = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const [clock, setClock] = useState(formatClock);

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock()), 10_000);
    return () => clearInterval(id);
  }, []);

  const setPalette = (id) => setPaletteId(id);
  const currentPalette = PALETTES[paletteId] ?? PALETTES.soft;
  const paletteColors = currentPalette.colors;
  const palettePointer = currentPalette.pointer ?? null;
  const palettePointerClass = currentPalette.pointerClass ?? null;
  const paletteCenter = currentPalette.center ?? null;

  const handleRandomPalette = () => {
    const others = PALETTE_IDS.filter((id) => id !== paletteId);
    setPaletteId(securePick(others));
  };

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
    <div className="wheel-page" data-palette={paletteId}>
      <div className="wheel-page__header-left">
        <h1 className="wheel-page__title">DREAM TEAM DAILY</h1>
      </div>
      <PaletteSelector
        onOpenModal={() => setPaletteModalOpen(true)}
        onRandom={handleRandomPalette}
        onOpenNames={() => setNamesModalOpen(true)}
        nameCount={names.length}
      />

      <div className="wheel-page__layout">
        <div className="wheel-page__left">
          {names.length >= 1 ? (
            <WheelCanvas
              names={names}
              spinning={spinning}
              onSpinEnd={handleSpinEnd}
              onClick={handleSpin}
              colors={paletteColors}
              pointer={palettePointer}
              pointerClass={palettePointerClass}
              center={paletteCenter}
            />
          ) : (
            <DailyEndScreen />
          )}
        </div>
      </div>

      <WinnerModal
        winner={winner}
        winnerImage={winner ? getDriverImage(winner) : null}
        onClose={handleClose}
        onRemoveAndClose={handleRemoveAndClose}
      />
      {toast && <WinnerToast name={toast} onDismiss={handleDismissToast} />}
      {paletteModalOpen && (
        <PaletteModal
          value={paletteId}
          onChange={setPalette}
          onClose={() => setPaletteModalOpen(false)}
        />
      )}
      {namesModalOpen && (
        <NamesModal
          names={names}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          onReset={handleReset}
          spinning={spinning}
          pastWinners={pastWinners}
          onRestore={handleRestore}
          onClose={() => setNamesModalOpen(false)}
        />
      )}
      <span className="wheel-page__clock">{clock}</span>
    </div>
  );
};

export default WheelOfNames;
