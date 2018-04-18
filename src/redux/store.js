import Axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/index.js';

const httpClient = Axios.create({
  baseURL: 'http://localhost:3000',
})

export default () => createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(httpClient)))
);
