import { compose } from 'recompose';
import updateLayoutOnChangeEnhancer from '../../../updateLayoutOnChange.enhancer';
import AddToCollectionButton from './AddToCollectionButton.view';

export default compose(updateLayoutOnChangeEnhancer)(AddToCollectionButton);
