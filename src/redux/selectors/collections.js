import * as R from 'ramda';
import { createSelector } from 'reselect';

const menuCollectionListSelector = R.path(['app', 'menuCollectionList']);

const collectionsSelector = R.path(['entities', 'collections']);

export const collectionByIdSelector = (state, { id }) =>
  R.prop(id, collectionsSelector(state));

export const menuCollectionsSelector = createSelector(
  menuCollectionListSelector,
  collectionsSelector,
  (ids, collections) => {
    return R.props(ids, collections);
  }
);
