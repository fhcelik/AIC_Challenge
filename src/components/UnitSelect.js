import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import math from 'mathjs';

export default function UnitSelect({name, defaultUnit, onChange}) {
  const units = ["m", "ft", "psi", "ppg", "atm", "N/(m^3)"]; // TODO: Retrieve from somewhere
  const unitOptions = units.filter(unit => math.unit(defaultUnit).equalBase(math.unit(unit)))
    .map(unit => (<MenuItem key={unit} value={unit}>{unit}</MenuItem>));
  return (
    <Select value={defaultUnit} onChange={onChange} inputProps={{name}}>
      {unitOptions}
    </Select>
  );
}

UnitSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultUnit: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}