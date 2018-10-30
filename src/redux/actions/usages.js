import * as R from 'ramda';
import { createAction } from 'redux-actions';

export const saveUsages = createAction('@@calcoola/usages/save', usages => () =>
  R.reduce((acc, usage) => R.assoc(usage.id, usage.usages, acc), {}, usages)
);

export const fetchUsages = createAction(
  '@@calcoola/usages/fetchUsages',
  calculatorIds => (dispatch, getState, httpClient) =>
    httpClient
      .get('/usages', { params: { ids: calculatorIds } })
      .then(({ data }) => dispatch(saveUsages(data)))
);
