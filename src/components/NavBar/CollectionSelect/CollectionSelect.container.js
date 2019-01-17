import * as R from 'ramda';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropdownMenuView from './CollectionSelect.view';
import { fetchCollections } from '../../../redux/actions/collections';
import { isAuthorizedSelector } from '../../../redux/selectors/auth';
import { menuCollectionsSelector } from '../../../redux/selectors/collections';

const enhance = compose(
  connect(
    state => ({
      collections: menuCollectionsSelector(state),
      isAuthorized: isAuthorizedSelector(state),
    }),
    { fetchCollections }
  ),
  withHandlers({
    onTargetClick: ({ collections, fetchCollections }) => () => {
      if (R.isEmpty(collections)) fetchCollections();
    },
  }),
  withRouter
);

export default enhance(DropdownMenuView);
