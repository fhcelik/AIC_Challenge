import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'katex';
import 'katex/dist/katex.min.css';

export default function Formula(props) {
  const rendered = {};
  try {
    rendered.__html = renderToString(props.formula);
  } catch (err) {
    console.error(err.message);
    rendered.__html = "Parse Error (details in console)";
  }
  return (
    <span className="formula" dangerouslySetInnerHTML={rendered}/>
  );
}

Formula.propTypes = {
  formula: PropTypes.string.isRequired
};