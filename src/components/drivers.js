const DRIVERS = [
  { name: 'Chamo', image: 'drivers/Chamo.jpg' },
  { name: 'Exequi', image: 'drivers/Exequi.jpg' },
  { name: 'Fran', image: 'drivers/Fran.jpg' },
  { name: 'Ivan', image: 'drivers/Ivan.jpg' },
  { name: 'Jose', image: 'drivers/Jose.jpg' },
  { name: 'Juanma', image: 'drivers/Juanma.jpg' },
  { name: 'Marian', image: 'drivers/Marian.jpg' },
  { name: 'Pelu', image: 'drivers/Pelu.jpg' },
  { name: 'Gio', image: 'drivers/Gio.jpg' },
];

const DRIVER_NAMES = DRIVERS.map((d) => d.name);

const getDriverImage = (name) => {
  const driver = DRIVERS.find((d) => d.name === name);

  if (driver) return driver.image;

  const reversed = name.split("").reverse().join("");
  const reversedDriver = DRIVERS.find((d) => d.name === reversed);

  return reversedDriver ? reversedDriver.image : null;
};

export { DRIVERS, DRIVER_NAMES, getDriverImage };
