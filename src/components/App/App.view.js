import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import NavBar from '../NavBar';
import Routing from './Routing';
import NotificationToaster from './NotificationToaster';

const styles = theme => ({
  root: {
    background: theme.palette.background.gradient,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    padding: '75px 30px',
    flex: '1 0 auto',
  },
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <NavBar />
    <div className={classes.content}>
      <Routing />
    </div>
    <NotificationToaster />
    <Copyright />
  </div>
);

export default withStyles(styles)(App);
