import { compose } from 'recompose';
import updateLayoutOnChange from '../../../hoc/updateLayoutOnChange';
import AddToCollectionButton from './AddToCollectionButton.view';

export default compose(updateLayoutOnChange)(AddToCollectionButton);
