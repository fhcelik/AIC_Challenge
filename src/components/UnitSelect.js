import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

export default function UnitSelect({ name, defaultUnit, units, onChange }) {
  const unitOptions = units.map(unit => (
    <MenuItem key={unit} value={unit}>
      {unit}
    </MenuItem>
  ));
  return (
    <Select value={defaultUnit} onChange={onChange} inputProps={{ name }}>
      {unitOptions}
    </Select>
  );
}

UnitSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultUnit: PropTypes.string.isRequired,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};
