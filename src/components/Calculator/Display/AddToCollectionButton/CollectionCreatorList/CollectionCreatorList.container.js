import * as R from 'ramda';
import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  withHandlers,
  withState,
  withStateHandlers,
} from 'recompose';
import { createCollectionFromCalculator } from '../../../../../redux/actions/collections';
import { Collection } from '../../../../../redux/schemas/collection';
import updateLayoutOnChange from '../../../../hoc/updateLayoutOnChange';
import CollectionCreatorList from './CollectionCreatorList.view';

export default compose(
  connect(null, {
    createCollectionFromCalculator,
  }),
  withStateHandlers(
    { newCollection: null },
    {
      addCollectionEditor: ({ newCollection }) => () => ({
        newCollection: newCollection || Collection(),
      }),
      renameNewCollection: ({ newCollection }) => e => ({
        newCollection: R.assoc('name', e.target.value, newCollection),
      }),
      removeCollectionEditor: () => () => ({ newCollection: null }),
    }
  ),
  withState('isSaving', 'setIsSaving', false),
  withHandlers({
    createCollection: ({
      calculatorId,
      removeCollectionEditor,
      setIsSaving,
      createCollectionFromCalculator,
    }) => ({ id, name }) => {
      setIsSaving(true);
      return createCollectionFromCalculator({
        calculatorId,
        id,
        name,
      })
        .then(removeCollectionEditor)
        .finally(() => setIsSaving(false));
    },
  }),
  withHandlers({
    onCollectionNameKeyDown: ({
      createCollection,
      newCollection: { id, name },
      removeCollectionEditor,
    }) => e => {
      if (!R.isEmpty(name) && e.key === 'Enter') {
        createCollection({ id, name });
      }
      if ((R.isEmpty(name) && e.key === 'Backspace') || e.key === 'Escape') {
        removeCollectionEditor();
      }
    },
  }),
  lifecycle({
    componentDidUpdate() {
      const { open, removeCollectionEditor } = this.props;
      if (!open) removeCollectionEditor();
    },
  }),
  updateLayoutOnChange
)(CollectionCreatorList);
