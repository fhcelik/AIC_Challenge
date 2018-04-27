import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import Calculator from '../Calculator';
import { ENTER_VALUE } from './Calculator.container';
import UnitSelect from '../UnitSelect';

const styles = theme => ({
  argument: {
    border: `2px solid ${theme.colors.cardHeader}`,
    padding: '0.2em',
    marginTop: '-2px',
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: '0.5em',
    ...theme.typography.subheading,
  },
  container: {
    padding: '0 0.3em',
    position: 'relative',
  },
});

function CalculatorArgument({
  classes,
  arg,
  onArgValueChange,
  onArgUnitChange,
  setArgToFormula,
}) {
  const formulas = [
    <MenuItem key={arg.name} value={arg.name}>
      {arg.alias || arg.name}
    </MenuItem>,
    <MenuItem key={ENTER_VALUE} value={ENTER_VALUE}>
      {ENTER_VALUE}
    </MenuItem>,
  ].concat(
    arg.formulas.map(({ id, title }) => (
      <MenuItem key={id} value={id}>
        {title}
      </MenuItem>
    ))
  );

  const label = (
    <Select
      value={arg.name}
      onChange={setArgToFormula(arg.name)}
      disableUnderline
      inputProps={{ name: arg.name }}
      classes={{ selectMenu: classes.label }}
    >
      {formulas}
    </Select>
  );
  const content = arg.refId ? (
    <Calculator id={arg.refId} />
  ) : (
    <Grid container justify="space-between">
      <Input
        name={arg.name}
        type="number"
        value={arg.value}
        onChange={onArgValueChange}
        disableUnderline
      />
      {arg.unit && (
        <UnitSelect
          name={arg.name}
          defaultUnit={arg.unit}
          onChange={onArgUnitChange}
        />
      )}
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
        {label}
        {content}
      </Grid>
    </div>
  );
}

CalculatorArgument.propTypes = {
  classes: PropTypes.object.isRequired,
  arg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    alias: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    refId: PropTypes.string,
    formulas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
};

export default withStyles(styles)(CalculatorArgument);
