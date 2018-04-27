import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

function UnitSelect({ classes, name, defaultUnit, units, onChange }) {
  const unitOptions = units.map(unit => (
    <MenuItem key={unit} value={unit}>
      {unit}
    </MenuItem>
  ));
  return (
    <Select
      value={defaultUnit}
      onChange={onChange}
      disableUnderline
      classes={classes}
      inputProps={{
        name
      }}
    >
      {unitOptions}
    </Select>
  );
}

UnitSelect.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  defaultUnit: PropTypes.string.isRequired,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UnitSelect;
