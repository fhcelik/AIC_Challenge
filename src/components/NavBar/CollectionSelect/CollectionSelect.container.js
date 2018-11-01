import * as R from 'ramda';
import { branch, compose, renderNothing, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCollections } from '../../../redux/actions/collections';
import DropdownMenuView from './CollectionSelect.view';
import { menuCollectionsSelector } from '../../../redux/selectors/collections';
import { isAuthorizedSelector } from '../../../redux/selectors/auth';

const enhance = compose(
  connect(
    state => ({
      collections: menuCollectionsSelector(state),
      isAuthorized: isAuthorizedSelector(state),
    }),
    { fetchCollections }
  ),
  branch(({ isAuthorized }) => !isAuthorized, renderNothing),
  withHandlers({
    onTargetClick: ({ collections, fetchCollections }) => () => {
      if (R.isEmpty(collections)) fetchCollections();
    },
  }),
  withRouter
);

export default enhance(DropdownMenuView);
