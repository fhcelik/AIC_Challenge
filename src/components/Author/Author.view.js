import AccountIcon from '@material-ui/icons/AccountBox';
import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthorPopupInfo from './AuthorPopupInfo';

const styles = theme => ({
  icon: {
    marginRight: 10,
    fontSize: 28,
  },
  popper: {
    opacity: 0.97,
  },
  tooltip: {
    padding: 0,
    background: theme.palette.navbar.background,
    border: `1px solid ${theme.palette.card.header}`,
  },
});

const Author = ({ classes, fetchUser, id }) => (
  <Tooltip
    title={<AuthorPopupInfo id={id} />}
    classes={{ tooltip: classes.tooltip, popper: classes.popper }}
    placement="bottom-start"
    interactive
  >
    <AccountIcon onMouseEnter={fetchUser} className={classes.icon} />
  </Tooltip>
);

Author.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(Author);
