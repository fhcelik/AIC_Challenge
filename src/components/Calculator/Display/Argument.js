import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles as styles } from '../sharedStyles';

const Argument = ({
  classes,
  theme,
  name,
  alias = name,
  value,
  unit,
  onArgValueChange,
  onArgUnitChange,
}) => (
  <div className={classes.argument}>
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.container}
    >
      <Grid container justify="space-between">
        <TextField
          className={classes.textField}
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
                onChange={onArgUnitChange}
              />
            ),
          }}
          {...theme.props.MuiFormControl}
          InputLabelProps={{ className: classes.label }}
        />
      </Grid>
    </Grid>
  </div>
);

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Argument);
