import { Tooltip } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ShareIconOutlined from '@material-ui/icons/ShareOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '../IconButton';

const ShareButton = ({ hoverText, onClick, successText }) => (
  <React.Fragment>
    <IconButton
      onClick={onClick}
      iconOnHover={ShareIcon}
      tooltipTitle={hoverText}
    >
      <ShareIconOutlined />
    </IconButton>
    {successText && (
      <Tooltip title={successText} open>
        <span />
      </Tooltip>
    )}
  </React.Fragment>
);

ShareButton.propTypes = {
  hoverText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  successText: PropTypes.string,
};

export default ShareButton;
