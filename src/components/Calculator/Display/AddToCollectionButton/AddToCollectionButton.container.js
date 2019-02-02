import { compose } from 'recompose';
import { connect } from 'react-redux';
import AddToCollectionButton from './AddToCollectionButton.view';
import { isAuthorizedSelector } from '../../../../redux/selectors/auth';
import updateLayoutOnChange from '../../../hoc/updateLayoutOnChange';

export default compose(
  connect(state => ({ isAuthorized: isAuthorizedSelector(state) })),
  updateLayoutOnChange
)(AddToCollectionButton);
