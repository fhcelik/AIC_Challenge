import React from 'react';
import PropTypes from 'prop-types';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function renderError(error) {
  console.error(error.message);
  return 'Parse Error (details in console)';
}

export default function Formula({ formula }) {
  return <InlineMath math={formula} renderError={renderError} />;
}

Formula.propTypes = {
  formula: PropTypes.string.isRequired
};
