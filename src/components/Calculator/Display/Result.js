import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UnitSelect from '../../UnitSelect';
import { ResultStyles as styles } from '../sharedStyles';

const Result = ({ classes, unit, result, onResultUnitChange }) => (
  <div className={classes.result}>
    <Grid container justify="space-between" className={classes.container}>
      <Typography className={classes.resultText}>{result}</Typography>
      {unit && (
        <UnitSelect
          classes={{
            root: classes.resultSelectRoot,
            selectMenu: classes.resultSelectMenu,
            icon: classes.resultSelectIcon,
          }}
          name="Result"
          defaultUnit={unit}
          onChange={onResultUnitChange}
        />
      )}
    </Grid>
  </div>
);

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onResultUnitChange: PropTypes.func,
};

export default withStyles(styles)(Result);
