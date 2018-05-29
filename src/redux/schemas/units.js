import math from '../../mathjs-secured';

export const UNITLESS = '#';

export function getUnit(unit) {
  if (unit === UNITLESS) {
    return undefined;
  }
  return math.unit(unit).toJSON().unit;
}

export function getBaseUnit(unit) {
  if (unit === UNITLESS) {
    return unit;
  }
  return math
    .unit(unit)
    .toSI()
    .toJSON().unit;
}

export function Unit({ unit }) {
  return {
    base: getBaseUnit(unit),
    unit: getUnit(unit),
  };
}
