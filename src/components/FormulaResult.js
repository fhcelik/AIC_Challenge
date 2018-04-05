import React from 'react';
import PropTypes from 'prop-types';
import Formula from './Formula';
import math from 'mathjs';

export default function FormulaResult(props) {
  const builtFormula = math.parse(props.execFormula);
  let convert = false;
  if (props.unit) {
    const unit = new math.expression.node.ConstantNode(props.unit);
    convert = new math.expression.node.OperatorNode("to", "to", [builtFormula, unit]);
  }
  const { scope } = props;

  return (
    <div className="formula-result">
      <Formula formula={`${props.name}=${builtFormula.toTex()}=
      ${math.format(convert ? convert.eval(scope) : builtFormula.eval(scope))}
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