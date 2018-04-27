import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

export default function ErrorCatch(props) {
  return <Typography variant="display4">{props.message}</Typography>;
}

ErrorCatch.propTypes = {
  message: PropTypes.string.isRequired,
};
