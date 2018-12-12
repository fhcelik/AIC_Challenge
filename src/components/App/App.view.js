import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar';
import Routing from './Routing';
import NotificationToaster from './NotificationToaster';

const styles = theme => ({
  root: {
    background: theme.palette.background.gradient,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    padding: '75px 30px',
    height: 'inherit',
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
