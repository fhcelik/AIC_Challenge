import * as R from 'ramda';
import cx from 'classnames';
import { ListItem, MenuList, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../DropdownMenu';
import { Routes } from '../../App/Routing';

const styles = theme => ({
  '@global a, a:active, a:visited': {
    textDecoration: 'none',
  },
  target: {
    ...theme.typography.display3,
  },
  listItem: {
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '16px',
    paddingRight: '15px',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  listItemText: {
    textTransform: 'uppercase',
    maxWidth: '300px',
    ...theme.typography.display3,
  },
});

const CollectionSelect = ({
  classes,
  className,
  collections,
  onTargetClick,
}) => (
  <DropdownMenu
    target={
      <Typography
        className={cx(classes.target, className)}
        onClick={onTargetClick}
      >
        Collections
      </Typography>
    }
  >
    <MenuList disablePadding role="menu">
      {R.map(
        collection => (
          <NavLink
            to={`${Routes.collections}${collection.id}`}
            exact={true}
            key={collection.id}
          >
            <ListItem button className={classes.listItem}>
              <Typography
                color="inherit"
                noWrap
                className={classes.listItemText}
              >
                {collection.name}
              </Typography>
            </ListItem>
          </NavLink>
        ),
        collections
      )}
    </MenuList>
  </DropdownMenu>
);

CollectionSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default withStyles(styles)(CollectionSelect);
