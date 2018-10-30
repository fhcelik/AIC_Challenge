import { TextField, InputLabel } from '@material-ui/core';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Calculator from '../../Calculator';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles as styles } from '../sharedStyles';

const Argument = ({
  classes,
  theme,
  name,
  alias = name,
  value,
  unit,
  refId,
  onArgValueChange,
  onArgUnitChange,
}) => {
  const content = refId ? (
    <React.Fragment>
      <InputLabel className={classes.label}>{alias}</InputLabel>
      <Calculator id={refId} />
    </React.Fragment>
  ) : (
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
  );

  return (
    <div className={classes.argument}>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.container}
      >
        {content}
      </Grid>
    </div>
  );
};

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  refId: PropTypes.string,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Argument);
