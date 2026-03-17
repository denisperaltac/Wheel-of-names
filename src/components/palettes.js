export const PALETTE_SOFT = [
  '#5d9cec',
  '#4fc1e9',
  '#48cfad',
  '#a0d468',
  '#ffce54',
  '#fc6e51',
  '#ed5565',
  '#ac92ec',
  '#ec87c0',
];

export const PALETTE_ELECTRIC = [
  '#6a00ff',
  '#ff00ff',
  '#ff0040',
  '#ff9500',
  '#ffff00',
  '#aaff00',
  '#00ff15',
  '#00ffff',
  '#0095ff',
];

export const PALETTE_EARTH = [
  '#264653',
  '#287271',
  '#2a9d8f',
  '#8ab17d',
  '#e9c46a',
  '#efb366',
  '#f4a261',
  '#ee8959',
  '#e76f51',
];

export const PALETTE_BERRY = [
  '#b7094c',
  '#a01a58',
  '#892b64',
  '#723c70',
  '#5c4d7d',
  '#455e89',
  '#2e6f95',
  '#1780a1',
  '#0091ad',
];

export const PALETTE_VIVID = [
  '#e03524',
  '#f07c12',
  '#ffc200',
  '#90bc1a',
  '#21b534',
  '#0095ac',
  '#1f64ad',
  '#4040a0',
  '#903498',
];

export const PALETTE_ARGENTINA = [
  '#75AADB',
  '#FFFFFF',
  '#F6B40E',
];

export const PALETTE_RIVER = [
  '#FFFFFF',
  '#E2001A',
  '#1A1A1A',
];

export const PALETTE_VENEZUELA = [
  '#FFCC00',
  '#00247D',
  '#CF142B',
];

export const PALETTE_MELI = [
  '#FFE600',
  '#3483FA',
  '#FFFFFF',
];

export const PALETTE_HARRY_POTTER = [
  '#E9A11A',
  '#7F0922',
  '#2F5D8C',
  '#1E5B3A',
];

export const PALETTES = {
  soft: { id: 'soft', name: 'Soft', colors: PALETTE_SOFT },
  electric: { id: 'electric', name: 'Electric', colors: PALETTE_ELECTRIC },
  earth: { id: 'earth', name: 'Earth', colors: PALETTE_EARTH },
  berry: { id: 'berry', name: 'Berry', colors: PALETTE_BERRY },
  vivid: { id: 'vivid', name: 'Vivid', colors: PALETTE_VIVID },
  argentina: {
    id: 'argentina',
    name: 'Argentina',
    colors: PALETTE_ARGENTINA,
    pointer: '/pointers/Messi.png',
    pointerClass: 'messi',
  },
  river: {
    id: 'river',
    name: 'River Plate',
    colors: PALETTE_RIVER,
    pointer: '/pointers/River.png',
  },
  venezuela: {
    id: 'venezuela',
    name: 'Venezuela',
    colors: PALETTE_VENEZUELA,
    pointer: '/pointers/Maduro.png',
    pointerClass: 'maduro',
  },
  meli: {
    id: 'meli',
    name: 'Mercado Libre',
    colors: PALETTE_MELI,
    pointer: '/pointers/Meli.png',
  },
  harryPotter: {
    id: 'harryPotter',
    name: 'Harry Potter',
    colors: PALETTE_HARRY_POTTER,
    pointer: '/pointers/HarryPotter.png',
    pointerClass: 'harryPotter',
  },
};

export const PALETTE_IDS = Object.keys(PALETTES);
