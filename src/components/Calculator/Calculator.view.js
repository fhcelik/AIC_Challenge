import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CalculatorArgument from './CalculatorArgument';
import CalculatorHeader from './CalculatorHeader';
import CalculatorResult from './CalculatorResult';

const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '20em',
    backgroundColor: theme.colors.cardBackground,
  },

  content: {
    margin: '0 0.4em 0.4em',
  },

  tag: {
    backgroundColor: theme.colors.tagBackground,
    border: `1px solid ${theme.colors.tagHighlight}`,
    color: theme.colors.tagHighlight,
    textTransform: 'uppercase',
    margin: 3,
    padding: 6,
  },

  args: {
    marginBottom: 6,
  },

  title: {
    textTransform: 'uppercase',
    marginTop: '0.1em',
    marginBottom: '0.5em',
  },
});

const Calculator = ({
  classes,
  id,
  description,
  title,
  tags,
  args,
  onArgValueChange,
  onArgUnitChange,
  setArgToFormula,
  result,
  onResultUnitChange,
}) => (
  <div className={classes.root}>
    <CalculatorHeader />
    <div className={classes.content}>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.title}
      >
        <Tooltip id={`${id}-tooltip`} title={description}>
          <Typography variant="display3">{title}</Typography>
        </Tooltip>
        {tags.map(tag => (
          <Typography variant="subheading" className={classes.tag}>
            {tag}
          </Typography>
        ))}
      </Grid>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        className={classes.args}
      >
        {args.map(arg => (
          <CalculatorArgument
            key={arg.name}
            arg={arg}
            onArgValueChange={onArgValueChange}
            onArgUnitChange={onArgUnitChange}
            setArgToFormula={setArgToFormula}
          />
        ))}
      </Grid>
      <CalculatorResult {...result} onResultUnitChange={onResultUnitChange} />
    </div>
  </div>
);

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  args: PropTypes.array.isRequired,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Calculator);
