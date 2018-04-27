import React from 'react';
import { withStyles } from 'material-ui/styles';
import {
  Toolbar,
  Button,
  Typography,
  Card,
  Grid,
  Select,
  MenuItem,
} from 'material-ui';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Favorite from 'material-ui-icons/FavoriteBorder';
import FavoriteFilled from 'material-ui-icons/Favorite';
import Info from 'material-ui-icons/InfoOutline';

const styles = theme => ({
  root: {
    background: theme.colors.backgroundGradient,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: theme.colors.headerBackground,
    border: `1px solid ${theme.colors.cardHeader}`,
    boxShadow: 'none',
    flex: '0 0 auto',
    minHeight: '3em',
  },
  search: {
    flex: 1,
    textAlign: 'left',
    color: theme.colors.fadedText,
    alignItems: 'center',
  },
  searchIcon: {
    paddingTop: '0.2em',
  },
  searchText: {
    display: 'inline',
    position: 'absolute',
    top: '0.9em',
    textTransform: 'uppercase',
  },
  content: {
    position: 'relative',
    flex: '1 1 100%',
    margin: '1em',
  },
  calculator: {
    display: 'inline-block',
    width: '20em',
    backgroundColor: theme.colors.cardBackground,
  },
  calculatorHeader: {
    backgroundColor: theme.colors.cardHeader,
    padding: '0.2em',
    color: theme.colors.text,
  },
  calculatorTitle: {
    textTransform: 'uppercase',
    marginTop: '0.1em',
    marginBottom: '0.5em',
  },
  calculatorContent: {
    margin: '0 0.4em 0.4em',
  },
  calculatorArgument: {
    border: `2px solid ${theme.colors.cardHeader}`,
    padding: '0.2em',
    marginTop: '-2px',
  },
  calculatorContainer: {
    padding: '0 0.3em',
    position: 'relative',
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: '0.5em',
  },
  typeArrow: {
    border: `3px solid ${theme.colors.orange}`,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  },
  result: {
    marginTop: '0.5em',
    backgroundColor: theme.colors.cardHeader,
    padding: '0.8em 0',
    border: `1px solid ${theme.colors.fadedText}`,
  },
  resultSelect: {
    select: {
      paddingRight: '0.2em',
    },
    icon: {
      color: theme.colors.orange,
      fontSize: '22px',
      top: 'auto',
      bottom: '-0.35em',
      right: '-0.5em',
      transform: 'rotate(-45deg)',
    },
  },
  resultSelectMenu: {
    ...theme.typography.display4,
  },
  resultSelectIcon: {
    fontSize: '22px',
    top: 'auto',
    bottom: '-0.75em',
    right: '-0.35em',
    transform: 'rotate(-45deg)',
  },
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <Toolbar className={classes.header}>
      <Button color="inherit">Dashboard</Button>
      <Button color="inherit">Favourites</Button>
      <Button color="inherit">My Calculators</Button>
      <Grid className={classes.search}>
        <MoreVertIcon className={classes.searchIcon} />
        <Typography
          variant="display3"
          color="inherit"
          classes={{
            root: classes.searchText,
          }}
        >
          Search for Calculators...
        </Typography>
      </Grid>
      <Button color="inherit">John Wicked</Button>
    </Toolbar>
    <div className={classes.content}>
      <Card className={classes.calculator}>
        <div className={classes.calculatorHeader}>
          <Grid container justify="flex-end">
            <FavoriteFilled />
            <Favorite />
            <Info />
          </Grid>
        </div>
        <div className={classes.calculatorContent}>
          <div className={classes.calculatorTitle}>
            <Typography variant="display3">
              Maximum allowable mud weight from leak-off
            </Typography>
          </div>
          <div className={classes.calculatorArgument}>
            <Typography variant="subheading" className={classes.label}>
              leak off test pressure
            </Typography>
            <Grid
              container
              justify="space-between"
              className={classes.calculatorContainer}
            >
              <Typography variant="display2">1,434</Typography>
              <Select value="psi" disableUnderline>
                <MenuItem value="psi">psi</MenuItem>
                <MenuItem value={20}>something</MenuItem>
                <MenuItem value={30}>something else</MenuItem>
              </Select>
            </Grid>
          </div>
          <div className={classes.calculatorArgument}>
            <Typography variant="subheading" className={classes.label}>
              casting shoe tvd
            </Typography>
            <Grid
              container
              justify="space-between"
              className={classes.calculatorContainer}
            >
              <Typography variant="display2">500</Typography>
              <Select value="ft" disableUnderline>
                <MenuItem value="ft">ft</MenuItem>
                <MenuItem value={20}>m</MenuItem>
                <MenuItem value={30}>yards</MenuItem>
              </Select>
            </Grid>
          </div>
          <div className={classes.result}>
            <Grid
              container
              justify="space-between"
              className={classes.calculatorContainer}
            >
              <Typography variant="display4">3,093</Typography>
              <Select
                value="yards"
                disableUnderline
                classes={{
                  selectMenu: classes.resultSelectMenu,
                  icon: classes.resultSelectIcon,
                }}
              >
                <MenuItem value="ft">ft</MenuItem>
                <MenuItem value="m">m</MenuItem>
                <MenuItem value="yards">yards</MenuItem>
              </Select>
            </Grid>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default withStyles(styles)(App);
