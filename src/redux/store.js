import Axios from 'axios';
import Promise from 'bluebird';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import fsaThunk from './fsa-thunk';
import reducer from './reducers';
import localforage from 'localforage';

export const history = createHistory();

const httpClient = Axios.create({
  baseURL: 'http://localhost:3000',
});

const reduxPersistConfig = {
  key: 'calcoola/root/1',
  version: 1,
  timeout: 35000,
  storage: localforage,
  //transforms,
  //blacklist
};

const middleware = [
  fsaThunk,
  thunk.withExtraArgument(httpClient),
  routerMiddleware(history),
];

const persistedReducer = persistReducer(reduxPersistConfig, reducer);

export default function configureStore(initialState = {}, persist = true) {
  let done;
  const isReady = Promise.fromCallback(next => {
    done = next;
  });
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persist ? persistStore(store, null, done) : null;
  return {
    store,
    isReady,
    persistor,
  };
}
