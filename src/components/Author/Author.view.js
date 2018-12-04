import AccountIcon from 'material-ui-icons/AccountBox';
import { Tooltip, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import AuthorPopupInfo from './AuthorPopupInfo';

const styles = theme => ({
  icon: {
    fontSize: 24,
    color: theme.palette.text.primary,
    marginRight: 10,
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
    classes={{ tooltip: classes.tooltip }}
    placement="bottom-start"
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
