import { Icon, ListItem, ListItemIcon, Typography } from 'material-ui';
import CheckedIcon from 'material-ui-icons/Check';
import PropTypes from 'prop-types';
import React from 'react';

const CollectionCheckEntry = ({ checked, name, onCollectionChecked }) => (
  <ListItem button onClick={onCollectionChecked}>
    <ListItemIcon>{checked ? <CheckedIcon /> : <Icon />}</ListItemIcon>
    <Typography>{name}</Typography>
  </ListItem>
);

CollectionCheckEntry.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onCollectionChecked: PropTypes.func.isRequired,
};

export default CollectionCheckEntry;
