import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Calculator, { ENTER_VALUE } from '../containers/Calculator';

export default function CalculatorArgument({arg, onArgChange, setArgToFormula}) {
  const argUnit = arg.unit ? ` ${arg.unit}` : '';
  const formulas = [(
    <MenuItem key={arg.name} value={arg.name}>{arg.name}:</MenuItem>), (
    <MenuItem key={`${arg.name}=`} value={ENTER_VALUE}>{ENTER_VALUE}</MenuItem>)]
    .concat(arg.formulas.map(({id, title}) => (
    <MenuItem key={id} value={id}>{title}</MenuItem>
  )
  ));

  const label = (
    <Select value={arg.name} onChange={setArgToFormula(arg.name)} inputProps={{name: arg.name}}>
      {formulas}
    </Select>
  );

  if (arg.refId) {
    return (
      <div className="formula-arg">
        <InputLabel>{label}</InputLabel>
        <Calculator id={arg.refId} />
      </div>
    );
  } else {
    return (
      <div className="formula-arg">
        <TextField name={arg.name} label={label} type="number" value={arg.value} onChange={onArgChange}
          InputProps={{endAdornment: <InputAdornment position="end">{argUnit}</InputAdornment>}}
        />
      </div>
    );
  }
}

CalculatorArgument.propTypes = {
  arg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    unit: PropTypes.string,
    refId: PropTypes.string,
    formulas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired})
    ).isRequired,
  }),
  onArgChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
}