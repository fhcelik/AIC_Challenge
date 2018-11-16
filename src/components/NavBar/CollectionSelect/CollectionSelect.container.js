import { branch, compose, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DropdownMenuView from './CollectionSelect.view';
import { menuCollectionsSelector } from '../../../redux/selectors/collections';
import { isAuthorizedSelector } from '../../../redux/selectors/auth';

const enhance = compose(
  connect(state => ({
    collections: menuCollectionsSelector(state),
    isAuthorized: isAuthorizedSelector(state),
  })),
  branch(({ isAuthorized }) => !isAuthorized, renderNothing),
  withRouter
);

export default enhance(DropdownMenuView);
