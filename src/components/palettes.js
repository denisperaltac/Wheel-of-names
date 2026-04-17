// Palettes
export const PALETTE_SOFT = [
  "#5d9cec",
  "#4fc1e9",
  "#48cfad",
  "#a0d468",
  "#ffce54",
  "#fc6e51",
  "#ed5565",
  "#ac92ec",
  "#ec87c0",
];

export const PALETTE_ELECTRIC = [
  "#6a00ff",
  "#ff00ff",
  "#ff0040",
  "#ff9500",
  "#ffff00",
  "#aaff00",
  "#00ff15",
  "#00ffff",
  "#0095ff",
];

export const PALETTE_EARTH = [
  "#264653",
  "#287271",
  "#2a9d8f",
  "#8ab17d",
  "#e9c46a",
  "#efb366",
  "#f4a261",
  "#ee8959",
  "#e76f51",
];

export const PALETTE_BERRY = [
  "#b7094c",
  "#a01a58",
  "#892b64",
  "#723c70",
  "#5c4d7d",
  "#455e89",
  "#2e6f95",
  "#1780a1",
  "#0091ad",
];

export const PALETTE_VIVID = [
  "#e03524",
  "#f07c12",
  "#ffc200",
  "#90bc1a",
  "#21b534",
  "#0095ac",
  "#1f64ad",
  "#4040a0",
  "#903498",
];

export const PALETTE_ARGENTINA = [
  "#75AADB",
  "#FFFFFF",
  "#F6B40E",
  "#75AADB",
  "#FFFFFF",
  "#F6B40E",
  "#75AADB",
  "#FFFFFF",
  "#F6B40E",
];

export const PALETTE_RIVER = [
  "#FFFFFF",
  "#E2001A",
  "#1A1A1A",
  "#FFFFFF",
  "#E2001A",
  "#1A1A1A",
  "#FFFFFF",
  "#E2001A",
  "#1A1A1A",
];

export const PALETTE_MELI = [
  "#FFE600",
  "#3483FA",
  "#FFFFFF",
  "#FFE600",
  "#3483FA",
  "#FFFFFF",
  "#FFE600",
  "#3483FA",
  "#FFFFFF",
];

export const PALETTE_HARRY_POTTER = [
  "#E9A11A",
  "#7F0922",
  "#2F5D8C",
  "#1E5B3A",
  "#E9A11A",
  "#7F0922",
  "#2F5D8C",
  "#1E5B3A",
  "#7F0922",
];

export const PALETTE_CLAUDE = [
  "#D97757",
  "#1A1915",
  "#C9B99A",
  "#E8DBC5",
  "#D97757",
  "#1A1915",
  "#C9B99A",
  "#E8DBC5",
  "#1A1915",
];

export const PALETTE_VEGAS = [
  "#1f6f43",
  "#b10f2e",
  "#101010",
  "#b10f2e",
  "#101010",
  "#b10f2e",
  "#101010",
  "#b10f2e",
  "#101010",
];

export const PALETTE_FOOTBALL_TEAMS = [
  "#0033a0",
  "#fcd116",
  "#d00027",
  "#111111",
  "#0057b8",
  "#ed1c24",
  "#7f1121",
  "#ffffff",
  "#008d62",
];

export const PALETTES = {
  argentina: {
    id: "argentina",
    name: "Argentina",
    colors: PALETTE_ARGENTINA,
    pointer: "/pointers/Messi.png",
    pointerClass: "messi",
    center: "/centers/LogoAFA.png",
  },
  river: {
    id: "river",
    name: "River Plate",
    colors: PALETTE_RIVER,
    pointer: "/pointers/River.png",
  },
  meli: {
    id: "meli",
    name: "Mercado Libre",
    colors: PALETTE_MELI,
    pointer: "/pointers/Meli.png",
    center: "/centers/LogoMeli.png",
  },
  harryPotter: {
    id: "harryPotter",
    name: "Harry Potter",
    colors: PALETTE_HARRY_POTTER,
    pointer: "/pointers/HarryPotter.png",
    pointerClass: "harryPotter",
    center: "/centers/LogoHogwarts.png",
  },
  claude: {
    id: "claude",
    name: "Claude",
    colors: PALETTE_CLAUDE,
    pointerType: "claude",
    center: "/centers/Claude.png",
  },
  vegas: {
    id: "vegas",
    name: "Las Vegas",
    colors: PALETTE_VEGAS,
    pointer: "/pointers/LasVegas.png",
    pointerClass: "vegas",
    center: "/centers/Las%20Vegas.png",
    wheelStyle: "vegas",
  },
  footballTeams: {
    id: "footballTeams",
    name: "Equipos Futbol",
    colors: PALETTE_FOOTBALL_TEAMS,
    center: "/centers/Pelota.png",
  },
};

export const PALETTE_IDS = [
  "argentina",
  "river",
  "meli",
  "harryPotter",
  "claude",
  "vegas",
  "footballTeams",
];
