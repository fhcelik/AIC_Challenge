import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/Tooltip';

const WithTooltip = ({ title, children }) =>
  title ? <Tooltip title={title}>{children}</Tooltip> : children;

WithTooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default WithTooltip;
