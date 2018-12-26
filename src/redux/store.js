import * as R from 'ramda';
import Axios from 'axios';
import Promise from 'bluebird';
import createHistory from 'history/createBrowserHistory';
import localforage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import debounceMiddleware from 'redux-debounce';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import fsaThunk from './fsa-thunk';
import reducer from './reducers';
import { displayNotification } from './actions/notifications';
import { setJWT } from './actions/auth';
import { debounceConfig } from './config';

export const history = createHistory();

const httpClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const middleware = [
  debounceMiddleware(debounceConfig),
  fsaThunk,
  thunk.withExtraArgument(httpClient),
  promiseMiddleware,
  routerMiddleware(history),
];

const reduxPersistConfig = {
  key: 'calcoola/root/230',
  timeout: 35000,
  storage: localforage,
  blacklist: ['notifications'],
  //transforms,
};

const persistedReducer = persistReducer(reduxPersistConfig, reducer);

export default function configureStore(initialState = {}, persist = true) {
  let done;
  const isReady = Promise.fromCallback(next => {
    done = next;
  });
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persist ? persistStore(store, null, done) : null;

  httpClient.interceptors.response.use(
    response => {
      const refreshedToken = response.headers.authorization;
      if (refreshedToken) store.dispatch(setJWT(refreshedToken));
      return response;
    },
    error => {
      const status = R.pathOr(null, ['response', 'status'], error);
      if (status === 401 || status === 403) store.dispatch(setJWT(null));

      const messageOrError = Error(
        R.pathOr(error, ['response', 'data', 'message'], error)
      );

      store.dispatch(displayNotification(messageOrError));
      return Promise.reject(error);
    }
  );

  return {
    store,
    isReady,
    persistor,
  };
}
