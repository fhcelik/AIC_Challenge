import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import UnitSelect from '../../UnitSelect';
import { ResultStyles as styles } from '../sharedStyles';

const Result = ({ classes, name, unit, result, onResultUnitChange }) => (
  <div className={classes.result}>
    <Grid container justify="space-between" className={classes.container}>
      <Typography className={classes.resultText}>{result}</Typography>
      {unit && (
        <UnitSelect
          classes={{
            selectMenu: classes.resultSelectMenu,
            icon: classes.resultSelectIcon,
          }}
          name={name}
          defaultUnit={unit}
          onChange={onResultUnitChange}
        />
      )}
    </Grid>
  </div>
);

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onResultUnitChange: PropTypes.func,
};

export default withStyles(styles)(Result);
