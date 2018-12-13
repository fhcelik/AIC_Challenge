import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../../TextField';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles as styles } from '../sharedStyles';

const Argument = ({
  classes,
  className,
  name,
  alias = name,
  value,
  unit,
  onArgValueChange,
  onArgUnitChange,
}) => (
  <TextField
    className={cx(classes.textField, className)}
    autoComplete="off"
    name={name}
    label={alias}
    type="number"
    value={value}
    onChange={onArgValueChange}
    InputProps={{
      endAdornment: unit && (
        <UnitSelect
          name={name}
          defaultUnit={unit}
          className={classes.endAdornmentRoot}
          onChange={onArgUnitChange}
        />
      ),
    }}
  />
);

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Argument);
