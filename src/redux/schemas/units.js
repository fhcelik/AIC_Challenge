import math from '../../mathjs-secured';

export function getBaseUnit(unit) {
  return math
    .unit(unit)
    .toSI()
    .toJSON().unit;
}

export function Unit(props) {
  return {
    base: getBaseUnit(props.unit),
    ...props,
  };
}
