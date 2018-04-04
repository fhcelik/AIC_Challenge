import React from 'react';
import PropTypes from 'prop-types';

export default function Formula(props) {
  return (
    <div>
      $${props.formula}$$
    </div>
  );
}

Formula.propTypes = {
  formula: PropTypes.string.isRequired
};