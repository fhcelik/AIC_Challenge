import { List, withStyles } from 'material-ui';
import AddToCollectionIcon from 'material-ui-icons/PlaylistAdd';
import PropTypes from 'prop-types';
import React from 'react';
import DropdownMenu from '../../../DropdownMenu';
import CollectionChecklist from './CollectionChecklist';
import CollectionCreatorList from './CollectionCreatorList';
import HeaderButton from '../../HeaderButton';

const styles = {
  items: {
    width: 300,
  },
  list: {
    padding: 0,
    maxHeight: 300,
  },
};

const AddToCollectionButton = ({ classes, calculatorId, onResize }) => (
  <DropdownMenu
    classes={{ items: classes.items }}
    hasIcon={false}
    keepOpen
    onResize={onResize}
    placement="bottom-end"
    target={
      <HeaderButton
        icon={AddToCollectionIcon}
        tooltipTitle="Add to collection"
      />
    }
  >
    <List className={classes.list}>
      <CollectionCreatorList calculatorId={calculatorId} />
      <CollectionChecklist calculatorId={calculatorId} />
    </List>
  </DropdownMenu>
);

AddToCollectionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  calculatorId: PropTypes.string.isRequired,
  onResize: PropTypes.func,
};

export default withStyles(styles)(AddToCollectionButton);
