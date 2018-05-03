import React from 'react';
import PropTypes from 'prop-types';
import Formula from '../Formula';
import UnitSelect from '../UnitSelect';

export default function CalculatorResult({
  name,
  displayFormula,
  unit,
  result,
  onResultUnitChange,
}) {
  return (
    <div className="formula-result">
      <Formula formula={`${name}=${displayFormula}=${result}`} />
      {unit ? (
        <UnitSelect
          name={name}
          defaultUnit={unit}
          onChange={onResultUnitChange}
        />
      ) : null}
    </div>
  );
}
CalculatorResult.propTypes = {
  name: PropTypes.string.isRequired,
  displayFormula: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onResultUnitChange: PropTypes.func,
};
