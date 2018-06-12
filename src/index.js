import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import JssProvider from './providers/jss';
import ThemeProvider from './providers/theme';
import configureStore, { history } from './redux/store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor, isReady } = configureStore();

const target = document.getElementById('root');
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <JssProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </JssProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

let cleanup;
const render = () => {
  /**
   * Assign some sort of cleanup function
   */
  if (cleanup) cleanup();

  /**
   * Render the actual app
   */
  ReactDOM.render(app, target);
};

/**
 * Wait for persistor to be ready
 */
isReady.finally(async () => {
  // get the search resources from the server
  //await store.dispatch(fetchSearchResources);

  return render();
});

ReactDOM.render(app, target);
registerServiceWorker();
