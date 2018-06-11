import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

function ErrorCatch({ message }) {
  return <Typography variant="display4">{message}</Typography>
}

ErrorCatch.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorCatch;
