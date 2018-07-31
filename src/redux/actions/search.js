import Promise from 'bluebird';
import { normalize } from 'normalizr';
import { replace } from 'react-router-redux';
import { createAction } from 'redux-actions';
import { Routes } from '../../components/App/Routing';
import { calculatorList } from '../schemas/calculator';
import { debounceConfigNames } from '../store';
import { saveSearchQuery, saveSearchResults } from './app';
import { saveEntities } from './entities';

export const fetchSearchCalculators = createAction(
  '@@calcoola/search/fetchCalculators',
  ({ search }) => (dispatch, _, httpClient) => {
    if (search.length < 3) {
      return Promise.resolve();
    }

    return httpClient
      .get('/calculators', { params: { q: search } })
      .then(({ data }) => {
        const { entities, result } = normalize(data, calculatorList);
        dispatch(saveEntities(entities));
        dispatch(saveSearchQuery(search));
        dispatch(saveSearchResults(result));
        dispatch(replace(`${Routes.search}?q=${search}`));
      });
  },
  () => ({ debounce: debounceConfigNames.SEARCH })
);
