import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import { createCollectionFromCalculator } from '../../../../../redux/actions/collections';
import { Collection } from '../../../../../redux/schemas/collection';
import updateLayoutOnChangeEnhancer from '../../../../updateLayoutOnChange.enhancer';
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
      if (event.target.value !== '' && event.key === 'Enter') {
        createCollection({ id, name: event.target.value });
      }
      if (event.target.value === '' && event.key === 'Backspace') {
        event.preventDefault();
        removeCollectionEditor({ id });
      }
    },
  }),
  updateLayoutOnChangeEnhancer,
  withProps(({ newCollections }) => ({
    newEntries: R.values(newCollections),
  }))
)(CollectionCreatorList);
