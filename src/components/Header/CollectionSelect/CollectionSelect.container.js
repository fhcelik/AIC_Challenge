import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropdownMenuView from './CollectionSelect.view';
import { collectionsSelector } from '../../../redux/selectors/collections';

const enhance = compose(
  connect(state => ({
    collections: collectionsSelector(state),
  })),
  withRouter
);

export default enhance(DropdownMenuView);
