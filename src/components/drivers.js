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

const getDriverImage = (name) => {
  const driver = DRIVERS.find((d) => d.name === name);

  return driver ? driver.image : null;
};

export { DRIVERS, DRIVER_NAMES, getDriverImage };
