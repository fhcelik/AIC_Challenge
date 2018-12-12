import {
  CircularProgress,
  Grid,
  ListItem,
  ListItemIcon,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewIcon from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    borderBottom: `1px solid ${theme.palette.navbar.border}`,
  },
  item: {
    padding: 8,
  },
  inputIcon: {
    color: theme.palette.text.faded,
  },
});

const CollectionCreatorList = ({
  classes,
  newEntries,
  addCollectionEditor,
  onCollectionNameChange,
  onCollectionNameKeyDown,
}) => (
  <React.Fragment>
    <ListItem
      className={classes.header}
      button
      disableRipple
      onClick={addCollectionEditor}
    >
      <Grid container justify="center">
        <AddIcon />
      </Grid>
    </ListItem>
    {newEntries.map(({ id, name, saving }) => (
      <ListItem key={id} className={classes.item}>
        <ListItemIcon>
          {saving ? <CircularProgress size={20} /> : <NewIcon />}
        </ListItemIcon>
        <TextField
          value={name}
          autoFocus
          onChange={onCollectionNameChange(id)}
          onKeyDown={onCollectionNameKeyDown(id)}
          InputProps={{
            startAdornment: <MoreVertIcon className={classes.inputIcon} />,
          }}
        />
      </ListItem>
    ))}
  </React.Fragment>
);

CollectionCreatorList.propTypes = {
  classes: PropTypes.object.isRequired,
  newEntries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      saving: PropTypes.bool.isRequired,
    })
  ),
  addCollectionEditor: PropTypes.func.isRequired,
  onCollectionNameChange: PropTypes.func.isRequired,
  onCollectionNameKeyDown: PropTypes.func.isRequired,
};

export default withStyles(styles)(CollectionCreatorList);
