import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorCatch(props) {
  return (
    <div className="calculator-card">
      {props.message}
    </div>
  );
}

ErrorCatch.propTypes = {
  message: PropTypes.string.isRequired,
};
