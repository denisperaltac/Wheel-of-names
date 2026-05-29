const DRIVERS = [
  { name: 'Chamo', image: 'drivers/Chamo.png' },
  { name: 'Exequi', image: 'drivers/Exequi.png' },
  { name: 'Fran', image: 'drivers/Fran.png' },
  { name: 'Ivan', image: 'drivers/Ivan.png' },
  { name: 'Jose', image: 'drivers/Jose.png' },
  { name: 'Juanma', image: 'drivers/Juanma.png' },
  { name: 'Marian', image: 'drivers/Marian.png' },
  { name: 'Pelu', image: 'drivers/Pelu.png' },
  { name: 'Gio', image: 'drivers/Gio.png' },
];

const DRIVER_NAMES = DRIVERS.map((d) => d.name);

const resolveDriverName = (name) => {
  if (DRIVERS.some((d) => d.name === name)) return name;

  const reversed = name.split('').reverse().join('');
  if (DRIVERS.some((d) => d.name === reversed)) return reversed;

  return name;
};

const getDriverImage = (name) => {
  const canonical = resolveDriverName(name);
  const driver = DRIVERS.find((d) => d.name === canonical);

  return driver ? driver.image : null;
};

const getGotImage = (name, imageFolder) => {
  const canonical = resolveDriverName(name);
  if (!DRIVERS.some((d) => d.name === canonical)) return null;

  return `GOT/${imageFolder}/${canonical}.png`;
};

const formatGotDisplayName = (name, faction) => {
  const canonical = resolveDriverName(name);

  if (faction.nameFormat === 'prefix') {
    return `${faction.displayLabel} ${canonical}`;
  }

  return `${canonical} ${faction.displayLabel}`;
};

export {
  DRIVERS,
  DRIVER_NAMES,
  resolveDriverName,
  getDriverImage,
  getGotImage,
  formatGotDisplayName,
};
