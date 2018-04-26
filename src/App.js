import React from 'react';
import logo from './logo.svg';
import { withStyles } from 'material-ui/styles';
import Formula from './components/Formula';

const styles = () => ({
  root: {
    textAlign: 'center'
  },
  logo: {
    height: '80px'
  },
  header: {
    backgroundColor: '#222',
    height: '150px',
    padding: '20px',
    color: 'white'
  },
  title: {
    fontSize: '1.5em'
  },
  intro: {
    fontSize: 'large'
  }
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="logo" />
      <h1 className={classes.title}>Calcoola</h1>
    </header>
    <p className={classes.intro}>Formula Builders</p>
    <Formula formula="\sum_{n=0}^{\infty}{\frac{1}{2^n}}=2" />
    When <Formula formula="a \ne 0," /> there are two solutions to{' '}
    <Formula formula="ax^2+bx+c=0" /> and they are{' '}
    <Formula formula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}." />
  </div>
);

export default withStyles(styles)(App);
