import React from 'react';
import UnitSelect from '../UnitSelect';

export default {
  Length: () => (
    <UnitSelect
      name="Length"
      defaultUnit="m"
      onChange={event => console.log(event.target.value)}
    />
  ),
  Pressure: () => (
    <UnitSelect
      name="Pressure"
      defaultUnit="psi"
      onChange={event => console.log(event.target.value)}
    />
  ),
  Density: () => (
    <UnitSelect
      name="Density"
      defaultUnit="ppg"
      onChange={event => console.log(event.target.value)}
    />
  ),
  Any: () => (
    <UnitSelect
      name="Any"
      unrestricted
      onChange={event => console.log(event.target.value)}
    />
  ),
};
