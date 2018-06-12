import 'katex/dist/katex.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { BlockMath } from 'react-katex';

function renderError(error) {
  console.error(error.message);
  return 'Parse Error (details in console)';
}

export default function Formula({ formula }) {
  const tex = '' === formula ? ' ' : formula;
  return <BlockMath math={tex} renderError={renderError} />;
}

Formula.propTypes = {
  formula: PropTypes.string.isRequired,
};
