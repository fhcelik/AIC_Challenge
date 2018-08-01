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
import thunk from 'redux-thunk';
import fsaThunk from './fsa-thunk';
import reducer from './reducers';
import { displayNotification } from './actions/notifications';

export const history = createHistory();

const httpClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const debounceConfigNames = {
  SEARCH: 'search',
};

const debounceConfig = {
  [debounceConfigNames.SEARCH]: 300,
};

const middleware = [
  debounceMiddleware(debounceConfig),
  fsaThunk,
  thunk.withExtraArgument(httpClient),
  routerMiddleware(history),
];

const reduxPersistConfig = {
  key: 'calcoola/root/129',
  timeout: 35000,
  storage: localforage,
  //transforms,
  //blacklist
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

  httpClient.interceptors.response.use(null, error => {
    store.dispatch(displayNotification(error));
    return Promise.reject(error);
  });

  return {
    store,
    isReady,
    persistor,
  };
}
