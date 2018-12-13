import React from 'react';
import CancelIconFilled from '@material-ui/icons/Cancel';
import CancelIconOutlined from '@material-ui/icons/CancelOutlined';
import IconButton from '.';

export default {
  withOneIcon: () => (
    <IconButton>
      <CancelIconOutlined />
    </IconButton>
  ),
  withOneIconAndTooltip: () => (
    <IconButton tooltipTitle="tooltip">
      <CancelIconOutlined />
    </IconButton>
  ),
  withTwoIcons: () => (
    <IconButton iconOnHover={CancelIconFilled}>
      <CancelIconOutlined />
    </IconButton>
  ),
  withTwoIconsAndTooltip: () => (
    <IconButton iconOnHover={CancelIconFilled} tooltipTitle="tooltip">
      <CancelIconOutlined />
    </IconButton>
  ),
};
