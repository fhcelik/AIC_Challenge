import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropdownMenuView from './CollectionSelect.view';
import { menuCollectionsSelector } from '../../../redux/selectors/collections';

const enhance = compose(
  connect(state => ({
    collections: menuCollectionsSelector(state),
  })),
  withRouter
);

export default enhance(DropdownMenuView);
