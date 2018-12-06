import React from 'react';
import { withStyles } from 'material-ui/styles';
import NavBar from '../NavBar';
import Routing from './Routing';
import NotificationToaster from './NotificationToaster';

const styles = theme => ({
  root: {
    background: theme.palette.background.gradient,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: '20px 30px',
  },
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <NavBar />
    <div className={classes.content}>
      <Routing />
    </div>
    <NotificationToaster />
  </div>
);

export default withStyles(styles)(App);
