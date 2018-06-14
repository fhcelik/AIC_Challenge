import * as R from 'ramda';
import { createSelector } from 'reselect';

const menuCollectionListSelector = R.path(['app', 'menuCollectionList']);

const collectionsSelector = R.prop('collections');

export const collectionByIdSelector = (state, { id }) =>
  R.path(['collections', id], state);

export const menuCollectionsSelector = createSelector(
  menuCollectionListSelector,
  collectionsSelector,
  (ids, collections) => {
    return R.props(ids, collections);
  }
);
