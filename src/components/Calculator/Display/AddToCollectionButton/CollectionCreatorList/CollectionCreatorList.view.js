import {
  CircularProgress,
  Grid,
  ListItem,
  ListItemIcon,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import AddIconOutlined from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewIcon from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../../../../IconButton';

const styles = theme => ({
  header: {
    borderBottom: `1px solid ${theme.palette.navbar.border}`,
  },
  addIcon: {
    padding: 10,
  },
  item: {
    padding: 8,
  },
  inputIcon: {
    color: theme.palette.text.faded,
  },
});

const CollectionCreatorList = ({
  addCollectionEditor,
  classes,
  isSaving,
  newCollection,
  onCollectionNameKeyDown,
  renameNewCollection,
}) => (
  <React.Fragment>
    <Grid container justify="center" className={classes.header}>
      <IconButton
        className={classes.addIcon}
        onClick={addCollectionEditor}
        iconOnHover={AddIcon}
        tooltipTitle="Create a new collection"
      >
        <AddIconOutlined />
      </IconButton>
    </Grid>
    {newCollection && (
      <ListItem className={classes.item}>
        <ListItemIcon>
          {isSaving ? <CircularProgress size={20} /> : <NewIcon />}
        </ListItemIcon>
        <TextField
          value={newCollection.name}
          autoFocus
          onChange={renameNewCollection}
          onKeyDown={onCollectionNameKeyDown}
          InputProps={{
            startAdornment: <MoreVertIcon className={classes.inputIcon} />,
          }}
        />
      </ListItem>
    )}
  </React.Fragment>
);

CollectionCreatorList.propTypes = {
  addCollectionEditor: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  newCollection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onCollectionNameKeyDown: PropTypes.func.isRequired,
  renameNewCollection: PropTypes.func.isRequired,
};

export default withStyles(styles)(CollectionCreatorList);
