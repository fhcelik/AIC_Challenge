import React from 'react';
import PropTypes from 'prop-types';
import Formula from './Formula';
import math from 'mathjs';

export default function FormulaResult(props) {
  const builtFormula = math.parse(props.unit ? `(${props.execFormula}) to ${props.unit}` : props.execFormula);
  const { scope } = props;

  return (
    <div className="formula-result">
      <Formula formula={`${props.name}=${builtFormula.toTex()}=
      ${math.format(builtFormula.eval(scope))}
      `} />
    </div>
  );
}
FormulaResult.propTypes = {
  name: PropTypes.string.isRequired,
  execFormula: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  unit: PropTypes.string,
}