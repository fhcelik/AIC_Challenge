import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import WithTooltip from '../WithTooltip';

const HeaderButton = ({ icon: Icon, onClick, tooltipTitle }) => (
  <WithTooltip title={tooltipTitle}>
    <IconButton onClick={onClick} disableRipple>
      <Icon />
    </IconButton>
  </WithTooltip>
);

HeaderButton.propTypes = {
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  tooltipTitle: PropTypes.string,
};

export default HeaderButton;
