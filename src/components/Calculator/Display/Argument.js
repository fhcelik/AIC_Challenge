import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Calculator from '../../Calculator';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles as styles } from '../sharedStyles';
import { ENTER_VALUE } from './Display.container';

function Argument({
  classes,
  name,
  alias = name,
  value,
  unit,
  refId,
  formulas,
  onArgValueChange,
  onArgUnitChange,
  setArgToFormula,
}) {
  const formulaDropdown = [
    <MenuItem key={name} value={name}>
      {alias}
    </MenuItem>,
    <MenuItem key={ENTER_VALUE} value={ENTER_VALUE}>
      {ENTER_VALUE}
    </MenuItem>,
  ].concat(
    formulas.map(({ id, title }) => (
      <MenuItem key={id} value={id}>
        {title}
      </MenuItem>
    ))
  );

  const label = (
    <Select
      value={name}
      onChange={setArgToFormula(name)}
      inputProps={{ name }}
      classes={{ selectMenu: classes.label }}
    >
      {formulaDropdown}
    </Select>
  );
  const content = refId ? (
    <Calculator id={refId} />
  ) : (
    <Grid container justify="space-between">
      <Input
        name={name}
        type="number"
        value={value}
        onChange={onArgValueChange}
        endAdornment={
          unit && (
            <UnitSelect
              name={name}
              defaultUnit={unit}
              onChange={onArgUnitChange}
            />
          )
        }
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
        {label}
        {content}
      </Grid>
    </div>
  );
}

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
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
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
};

export default withStyles(styles)(Argument);
