import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'katex';

export default function Formula(props) {
  const rendered = {};
  try {
    rendered.__html = renderToString(props.formula);
  } catch (err) {
    console.error(err.message);
    rendered.__html = "Parse Error";
  }
  return (
    <span className="formula" dangerouslySetInnerHTML={rendered}/>
  );
}

Formula.propTypes = {
  formula: PropTypes.string.isRequired
};