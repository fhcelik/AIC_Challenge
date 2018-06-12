import React from 'react';
import { withStyles } from 'material-ui/styles';
import Header from '../Header';
import Routing from './Routing';

const styles = theme => ({
  root: {
    background: theme.colors.backgroundGradient,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Routing />
  </div>
);

export default withStyles(styles)(App);
