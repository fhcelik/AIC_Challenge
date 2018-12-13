import * as R from 'ramda';
import cx from 'classnames';
import { compose, withStateHandlers, withProps } from 'recompose';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WithTooltip from '../WithTooltip';

const styles = {
  iconButton: {
    '& svg': {
      fontSize: 28,
    },
  },
};

const enhance = compose(
  withStateHandlers(
    { isHovered: false },
    {
      onMouseEnter: () => () => ({ isHovered: true }),
      onMouseLeave: () => () => ({ isHovered: false }),
    }
  ),
  withProps(({ isHovered, iconOnHover: IconOnHover, children }) => ({
    children:
      isHovered && IconOnHover ? (
        <IconOnHover {...R.prop('props', children)} />
      ) : (
        children
      ),
  })),
  withStyles(styles)
);

const IconButtonWithTooltip = ({
  classes,
  className,
  iconOnHover,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  tooltipTitle,
  ...props
}) => (
  <WithTooltip title={tooltipTitle}>
    <IconButton
      disableRipple
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cx(classes.iconButton, className)}
      {...props}
    />
  </WithTooltip>
);

IconButtonWithTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  iconOnHover: PropTypes.func,
  isHovered: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  tooltipTitle: PropTypes.string,
};

export default enhance(IconButtonWithTooltip);
