import React from 'react';
import PropTypes from 'prop-types';
import Formula from './Formula';

export default function FormulaResult({ name, displayFormula, result }) {
  return (
    <div className="formula-result">
      <Formula formula={`${name}=${displayFormula}=${result}`} />
    </div>
  );
}
FormulaResult.propTypes = {
  name: PropTypes.string.isRequired,
  displayFormula: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
}