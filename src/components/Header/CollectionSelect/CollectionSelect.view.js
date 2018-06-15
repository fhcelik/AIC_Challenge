import { ListItem, MenuList, Typography, withStyles } from 'material-ui';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import React from 'react';

import { NavLink } from 'react-router-dom';
import DropdownMenu from '../../utils/DropdownMenu';
import { Routes } from '../../App/Routing';

const styles = theme => ({
  '@global a, a:active, a:visited': {
    textDecoration: 'none',
  },
  listItem: {
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '16px',
    paddingRight: '15px',
    '&:hover': {
      backgroundColor: theme.palette.card.header,
    },
  },
  listItemText: {
    maxWidth: '300px',
  },
});

const CollectionSelect = ({ classes, className, collections }) => (
  <DropdownMenu
    target={<Typography variant="display3">Collections</Typography>}
    offset="-16px, 12px"
    className={className}
  >
    <MenuList disablePadding role="menu">
      {R.map(
        collection => (
          <NavLink
            to={`${Routes.collection}${collection.id}`}
            exact={true}
            key={collection.id}
          >
            <ListItem button className={classes.listItem}>
              <Typography
                variant="display3"
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
      route: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default withStyles(styles)(CollectionSelect);
