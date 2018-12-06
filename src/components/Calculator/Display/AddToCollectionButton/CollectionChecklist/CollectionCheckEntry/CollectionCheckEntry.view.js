import {
  Icon,
  ListItem,
  ListItemIcon,
  Typography,
  withStyles,
} from 'material-ui';
import CheckedIcon from 'material-ui-icons/Check';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  root: {
    padding: 8,
  },
  text: {
    textTransform: 'uppercase',
  },
};

const CollectionCheckEntry = ({
  checked,
  classes,
  name,
  onCollectionChecked,
}) => (
  <ListItem button className={classes.root} onClick={onCollectionChecked}>
    <ListItemIcon>{checked ? <CheckedIcon /> : <Icon />}</ListItemIcon>
    <Typography className={classes.text}>{name}</Typography>
  </ListItem>
);

CollectionCheckEntry.propTypes = {
  checked: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onCollectionChecked: PropTypes.func.isRequired,
};

export default withStyles(styles)(CollectionCheckEntry);
