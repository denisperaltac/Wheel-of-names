import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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
const HOGWARTS_HOUSES = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    logo: '/houses/Gryffindor.png',
    theme: {
      accent: '#ae0001',
      accentHover: '#d01416',
      text: '#ffcc00',
      border: '#740001',
      confetti: ['#ae0001', '#740001', '#ffcc00', '#d3a625', '#f8e6a0'],
    },
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    logo: '/houses/Hufflepuff.png',
    theme: {
      accent: '#ecb939',
      accentHover: '#f5cb62',
      text: '#ffd96a',
      border: '#726255',
      confetti: ['#ecb939', '#f0c75e', '#726255', '#372e29', '#fff0c2'],
    },
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    logo: '/houses/Ravenclaw.png',
    theme: {
      accent: '#0e1a40',
      accentHover: '#1b2f70',
      text: '#946b2d',
      border: '#5d5d5d',
      confetti: ['#0e1a40', '#1b2f70', '#946b2d', '#d8b26e', '#f1e2c2'],
    },
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    logo: '/houses/Slytherin.png',
    theme: {
      accent: '#1a472a',
      accentHover: '#25633b',
      text: '#c0c0c0',
      border: '#5d5d5d',
      confetti: ['#1a472a', '#25633b', '#5d5d5d', '#c0c0c0', '#f3f3f3'],
    },
  },
];

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
  const [winnerHouse, setWinnerHouse] = useState(null);
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
  const [harryPaletteStep, setHarryPaletteStep] = useState(0);

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
  const isHarryPotterWheel = paletteId === 'harryPotter';
  const currentPalette = PALETTES[paletteId] ?? PALETTES.soft;
  const paletteColors = useMemo(() => {
    if (!isHarryPotterWheel) {
      return currentPalette.colors;
    }

    return currentPalette.colors.map(
      (_, index, colors) => colors[(index + harryPaletteStep) % colors.length],
    );
  }, [isHarryPotterWheel, currentPalette.colors, harryPaletteStep]);
  const palettePointer = currentPalette.pointer ?? null;
  const palettePointerClass = currentPalette.pointerClass ?? null;
  const palettePointerType = currentPalette.pointerType ?? null;
  const paletteCenter = currentPalette.center ?? null;

  useEffect(() => {
    if (!isHarryPotterWheel) {
      setHarryPaletteStep(0);
      return () => {};
    }

    if (spinning) {
      return () => {};
    }

    const intervalId = setInterval(() => {
      setHarryPaletteStep((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isHarryPotterWheel, spinning]);

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
    setWinnerHouse(isHarryPotterWheel ? securePick(HOGWARTS_HOUSES) : null);
    modalOpenedAt.current = Date.now();
  };

  const handleClose = ({ telegramWalking } = {}) => {
    const elapsed = Date.now() - (modalOpenedAt.current ?? 0);

    if (telegramWalking) {
      setToast({ name: winner, image: '/MuchoTexto.jpg' });
    } else if (elapsed < 10000) {
      setToast({ name: winner });
    }

    setWinner(null);
    setWinnerHouse(null);
  };

  const handleDismissToast = useCallback(() => setToast(null), []);

  const handleRestore = (name, index) => {
    setPastWinners((prev) => prev.filter((_, i) => i !== index));
    saveNames([...names, name]);
  };

  const handleRemoveAndClose = ({ telegramWalking } = {}) => {
    const elapsed = Date.now() - (modalOpenedAt.current ?? 0);

    if (telegramWalking) {
      setToast({ name: winner, image: '/MuchoTexto.jpg' });
    } else if (elapsed < 10000) {
      setToast({ name: winner });
    }

    saveNames(names.filter((n) => n !== winner));
    setPastWinners((prev) => [...prev, winner]);
    setWinner(null);
    setWinnerHouse(null);
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
              pointerType={palettePointerType}
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
        winnerHouse={winnerHouse}
        onClose={handleClose}
        onRemoveAndClose={handleRemoveAndClose}
        confettiColors={
          isHarryPotterWheel && winnerHouse?.theme?.confetti
            ? winnerHouse.theme.confetti
            : paletteColors
        }
      />
      {toast && (
        <WinnerToast
          name={toast.name}
          image={toast.image}
          onDismiss={handleDismissToast}
        />
      )}
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
