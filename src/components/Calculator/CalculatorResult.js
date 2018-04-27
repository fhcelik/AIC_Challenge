import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import UnitSelect from '../UnitSelect';

const styles = theme => ({
  result: {
    marginTop: '0.5em',
    backgroundColor: theme.colors.cardHeader,
    padding: '0.8em 0',
    border: `1px solid ${theme.colors.fadedText}`,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative'
  },
  resultSelectMenu: {
    ...theme.typography.display4,
  },
  resultSelectIcon: {
    fontSize: '22px',
    top: 'auto',
    bottom: '-0.75em',
    right: '-0.35em',
    transform: 'rotate(-45deg)',
  },
});

const CalculatorResult = ({
  classes,
  name,
  unit,
  result,
  onResultUnitChange,
}) => (
  <div className={classes.result}>
    <Grid container justify="space-between" className={classes.container}>
      <Typography variant="display4">{result}</Typography>
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

CalculatorResult.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onResultUnitChange: PropTypes.func,
};

export default withStyles(styles)(CalculatorResult);
