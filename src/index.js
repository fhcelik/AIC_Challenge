import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from './providers/jss';
import ThemeProvider from './providers/theme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const target = document.getElementById('root');

const app = (
  <JssProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </JssProvider>
);
ReactDOM.render(app, target);
registerServiceWorker();
