import * as R from 'ramda';
import { MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.dropdownMenu.background,
    border: `1px solid ${theme.palette.dropdownMenu.border}`,
    boxShadow: `${theme.palette.dropdownMenu.shadow} 4px 5px 4px -1px`,
    borderRadius: 0,
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    background: theme.palette.dropdownMenu.background,
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  selectedMenuItem: {
    backgroundColor: `${theme.palette.link.hover} !important`,
  },
});

const UnitSelect = ({
  classes,
  defaultUnit,
  dispatch,
  MenuProps,
  name,
  selectClasses,
  units,
  unrestricted,
  ...props
}) => (
  <Select
    value={defaultUnit || R.head(units)}
    inputProps={{ name }}
    MenuProps={{
      classes: { paper: classes.root },
      MenuListProps: { className: classes.menuList },
      ...MenuProps,
    }}
    classes={selectClasses}
    {...props}
  >
    {units.map(unit => (
      <MenuItem
        key={unit}
        value={unit}
        classes={{
          root: classes.menuItem,
          selected: classes.selectedMenuItem,
        }}
      >
        {unit}
      </MenuItem>
    ))}
  </Select>
);

UnitSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultUnit: PropTypes.string,
  dispatch: PropTypes.func,
  MenuProps: PropTypes.object,
  name: PropTypes.string.isRequired,
  selectClasses: PropTypes.object,
  units: PropTypes.arrayOf(PropTypes.string).isRequired,
  unrestricted: PropTypes.bool,
};

export default withStyles(styles)(UnitSelect);
