import * as R from 'ramda';

export const searchQuerySelector = R.path(['app', 'searchQuery']);

export const searchResultsSelector = R.path(['app', 'searchResults']);
