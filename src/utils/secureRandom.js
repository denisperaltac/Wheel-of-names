function getCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    return globalThis.crypto;
  }

  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    return window.crypto;
  }

  return null;
}

const crypto = getCrypto();

export function secureRandom() {
  if (!crypto) {
    throw new Error('secureRandom: no CSPRNG available');
  }

  const array = new Uint32Array(1);

  crypto.getRandomValues(array);

  return array[0] / 2 ** 32;
}

export function secureRandomInt(max) {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new RangeError('secureRandomInt: max debe ser entero positivo');
  }

  return Math.floor(secureRandom() * max);
}

export function secureRandomBetween(min, max) {
  return min + secureRandom() * (max - min);
}

export function securePick(arr) {
  if (!arr?.length) {
    throw new RangeError('securePick: array no vacío requerido');
  }

  return arr[secureRandomInt(arr.length)];
}
