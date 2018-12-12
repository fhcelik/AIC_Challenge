import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';
import * as R from 'ramda';

const UnitSelect = ({ classes, name, defaultUnit, units, onChange }) => (
  <Select
    value={defaultUnit || R.head(units)}
    onChange={onChange}
    classes={classes}
    inputProps={{ name }}
  >
    {units.map(unit => (
      <MenuItem key={unit} value={unit}>
        {unit}
      </MenuItem>
    ))}
  </Select>
);

UnitSelect.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  defaultUnit: PropTypes.string,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UnitSelect;
