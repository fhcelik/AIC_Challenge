import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import { createCollectionFromCalculator } from '../../../../../redux/actions/collections';
import { Collection } from '../../../../../redux/schemas/collection';
import updateLayoutOnChange from '../../../../hoc/updateLayoutOnChange';
import CollectionCreatorList from './CollectionCreatorList.view';

export default compose(
  connect(null, {
    createCollectionFromCalculator,
  }),
  withStateHandlers(
    { newCollections: {} },
    {
      addCollectionEditor: ({ newCollections }) => event => {
        const newCollection = Collection({ saving: false });
        return {
          newCollections: R.assoc(
            newCollection.id,
            newCollection,
            newCollections
          ),
        };
      },
      renameCollectionEditor: ({ newCollections }) => ({ id, name }) => ({
        newCollections: R.assocPath([id, 'name'], name, newCollections),
      }),
      removeCollectionEditor: ({ newCollections }) => ({ id }) => ({
        newCollections: R.dissoc(id, newCollections),
      }),
      saveCollectionEditor: ({ newCollections }) => ({ id, saving }) => ({
        newCollections: R.assocPath([id, 'saving'], saving, newCollections),
      }),
    }
  ),
  withHandlers({
    createCollection: ({
      calculatorId,
      removeCollectionEditor,
      saveCollectionEditor,
      createCollectionFromCalculator,
    }) => ({ id, name }) => {
      saveCollectionEditor({ id, saving: true });
      return createCollectionFromCalculator({
        calculatorId,
        id,
        name,
      })
        .then(() => {
          removeCollectionEditor({ id });
        })
        .catch(() => saveCollectionEditor({ id, saving: false }));
    },
  }),
  withHandlers({
    onCollectionNameChange: ({ renameCollectionEditor }) => id => event => {
      renameCollectionEditor({ id, name: event.target.value });
    },
    onCollectionNameKeyDown: ({
      createCollection,
      removeCollectionEditor,
    }) => id => event => {
      const {
        target: { value },
        key,
      } = event;

      if (!R.isEmpty(value) && key === 'Enter') {
        createCollection({ id, name: value });
      }
      if ((R.isEmpty(value) && key === 'Backspace') || key === 'Escape') {
        removeCollectionEditor({ id });
      }
    },
  }),
  updateLayoutOnChange,
  withProps(({ newCollections }) => ({
    newEntries: R.values(newCollections),
  }))
)(CollectionCreatorList);
