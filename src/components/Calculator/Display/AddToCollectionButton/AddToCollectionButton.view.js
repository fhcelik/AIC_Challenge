import AddToCollectionIcon from '@material-ui/icons/PlaylistAdd';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CollectionChecklist from './CollectionChecklist';
import CollectionCreatorList from './CollectionCreatorList';
import RequireLogin from '../../../RequireLogin';
import DropdownMenu from '../../../DropdownMenu';
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

const AddToCollectionButtonTarget = ({ onClick, tooltipTitle }) => (
  <IconButton onClick={onClick} tooltipTitle={tooltipTitle}>
    <AddToCollectionIcon />
  </IconButton>
);

const AddToCollectionButton = ({
  classes,
  calculatorId,
  isAuthorized,
  onResize,
}) => (
  <DropdownMenu
    offset="54px, 2px"
    classes={{ items: classes.items }}
    hasIcon={false}
    keepOpen
    disabled={!isAuthorized}
    onResize={onResize}
    withPropsToChildren
    placement="bottom-end"
    target={
      <RequireLogin tooltipTitle="Add to collection">
        <AddToCollectionButtonTarget />
      </RequireLogin>
    }
  >
    <Content classes={classes} calculatorId={calculatorId} />
  </DropdownMenu>
);

AddToCollectionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  calculatorId: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  onResize: PropTypes.func,
};

export default withStyles(styles)(AddToCollectionButton);
