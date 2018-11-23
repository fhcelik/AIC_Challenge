import { Tooltip } from 'material-ui';
import ShareIcon from 'material-ui-icons/Share';
import PropTypes from 'prop-types';
import React from 'react';
import HeaderButton from '../Calculator/HeaderButton';

const ShareButton = ({ hoverText, onClick, successText }) => (
  <React.Fragment>
    <HeaderButton onClick={onClick} icon={ShareIcon} tooltipTitle={hoverText} />
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
