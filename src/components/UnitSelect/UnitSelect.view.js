import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';
import * as R from 'ramda';

const UnitSelect = ({
  defaultUnit,
  dispatch,
  name,
  units,
  unrestricted,
  ...props
}) => (
  <Select value={defaultUnit || R.head(units)} inputProps={{ name }} {...props}>
    {units.map(unit => (
      <MenuItem key={unit} value={unit}>
        {unit}
      </MenuItem>
    ))}
  </Select>
);

UnitSelect.propTypes = {
  defaultUnit: PropTypes.string,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  unrestricted: PropTypes.bool,
};

export default UnitSelect;
