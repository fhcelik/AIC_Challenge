import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import InfoIcon from 'material-ui-icons/InfoOutline';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Header';
import { CalculatorStyles as styles } from '../sharedStyles';
import Argument from './Argument';
import Result from './Result';

const Display = ({
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
    <Header>
      <FavoriteIcon />
      <InfoIcon />
    </Header>
    <div className={classes.content}>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.title}
      >
        <Tooltip id={`${id}-tooltip`} title={description}>
          <Typography className={classes.titleText}>{title}</Typography>
        </Tooltip>
        {tags.map(tag => (
          <Typography key={tag} className={classes.tag}>
            {tag}
          </Typography>
        ))}
      </Grid>
      <Grid container direction="column" className={classes.args}>
        {args.map(arg => (
          <Argument
            key={arg.name}
            {...arg}
            onArgValueChange={onArgValueChange}
            onArgUnitChange={onArgUnitChange}
            setArgToFormula={setArgToFormula}
          />
        ))}
      </Grid>
      <Result {...result} onResultUnitChange={onResultUnitChange} />
    </div>
  </div>
);

Display.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  args: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Display);
