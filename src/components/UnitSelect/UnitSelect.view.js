import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import * as R from 'ramda';

function UnitSelect({ classes, name, defaultUnit, units, onChange }) {
  const unitOptions = units.map(unit => (
    <MenuItem key={unit} value={unit}>
      {unit}
    </MenuItem>
  ));
  return (
    <Select
      value={defaultUnit || R.head(units)}
      onChange={onChange}
      disableUnderline
      classes={classes}
      inputProps={{
        name,
      }}
    >
      {unitOptions}
    </Select>
  );
}

UnitSelect.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  defaultUnit: PropTypes.string,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UnitSelect;
