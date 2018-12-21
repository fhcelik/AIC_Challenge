import { List } from '@material-ui/core';
import AddToCollectionIcon from '@material-ui/icons/PlaylistAdd';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../../DropdownMenu';
import CollectionChecklist from './CollectionChecklist';
import CollectionCreatorList from './CollectionCreatorList';
import IconButton from '../../../IconButton';

const styles = {
  items: {
    width: 308,
  },
  list: {
    padding: 0,
    maxHeight: 300,
  },
};

const Content = ({ classes, ...props }) => (
  <List className={classes.list}>
    <CollectionCreatorList {...props} />
    <CollectionChecklist {...props} />
  </List>
);

const AddToCollectionButton = ({ classes, calculatorId, onResize }) => (
  <DropdownMenu
    offset="54px, 2px"
    classes={{ items: classes.items }}
    hasIcon={false}
    keepOpen
    onResize={onResize}
    withPropsToChildren
    placement="bottom-end"
    target={
      <IconButton tooltipTitle="Add to collection">
        <AddToCollectionIcon />
      </IconButton>
    }
  >
    <Content classes={classes} calculatorId={calculatorId} />
  </DropdownMenu>
);

AddToCollectionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  calculatorId: PropTypes.string.isRequired,
  onResize: PropTypes.func,
};

export default withStyles(styles)(AddToCollectionButton);
