import * as R from 'ramda';
import cx from 'classnames';
import { ListItem, MenuList, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RequireLogin from '../../RequireLogin';
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
  noCollectionMessage: {
    width: 210,
    padding: 10,
    textTransform: 'uppercase',
    color: theme.palette.text.faded,
  },
});

const CollectionSelectTarget = ({ className, onClick }) => (
  <Typography className={className} onClick={onClick}>
    Collections
  </Typography>
);

const CollectionSelect = ({
  classes,
  className,
  collections,
  isAuthorized,
  onTargetClick,
}) => (
  <DropdownMenu
    disabled={!isAuthorized}
    target={
      <RequireLogin
        className={cx(classes.target, className)}
        onClick={onTargetClick}
      >
        <CollectionSelectTarget />
      </RequireLogin>
    }
  >
    {R.length(collections) ? (
      <MenuList disablePadding role="menu">
        {R.map(
          collection =>
            collection && (
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
    ) : (
      <Typography className={classes.noCollectionMessage}>
        You haven't created any collections yet...
      </Typography>
    )}
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
  isAuthorized: PropTypes.bool.isRequired,
  onTargetClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CollectionSelect);
