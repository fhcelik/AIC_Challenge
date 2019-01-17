import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';

const WithTooltip = ({ children, ...props }) =>
  props.title ? <Tooltip {...props}>{children}</Tooltip> : children;

WithTooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default WithTooltip;
