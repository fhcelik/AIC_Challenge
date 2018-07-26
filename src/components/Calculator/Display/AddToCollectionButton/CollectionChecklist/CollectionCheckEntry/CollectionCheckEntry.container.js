import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import {
  addCalculatorToCollection,
  removeCalculatorFromCollection,
} from '../../../../../../redux/actions/collections';
import { collectionHasCalculatorSelector } from '../../../../../../redux/selectors/collections';
import CollectionCheckEntry from './CollectionCheckEntry.view';

export default compose(
  connect(
    (state, props) => ({
      checked: collectionHasCalculatorSelector(state, props),
    }),
    {
      addCalculatorToCollection,
      removeCalculatorFromCollection,
    }
  ),
  withHandlers({
    onCollectionChecked: ({
      calculatorId,
      checked,
      id: collectionId,
      addCalculatorToCollection,
      removeCalculatorFromCollection,
    }) => () =>
      checked
        ? removeCalculatorFromCollection({ calculatorId, collectionId })
        : addCalculatorToCollection({ calculatorId, collectionId }),
  })
)(CollectionCheckEntry);
