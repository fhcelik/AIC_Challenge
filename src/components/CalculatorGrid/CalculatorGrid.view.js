import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import { withStyles } from '@material-ui/core/styles';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';
import ShareButton from '../ShareButton';

const styles = theme => ({
  grid: {
    marginTop: '30px',
  },
  title: {
    textTransform: 'uppercase',
    ...theme.typography.display4,
  },
});

const CalculatorGrid = ({
  calculatorIds,
  classes,
  onShareHoverText,
  setDomNode,
  showAddCalculatorButton = false,
  title,
  urlToShare,
}) => (
  <Grid className={classes.root} container direction="column">
    <Grid
      justify="space-between"
      container
      wrap="nowrap"
      className={classes.header}
    >
      <Grid item>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item>
        {urlToShare && (
          <ShareButton urlToShare={urlToShare} hoverText={onShareHoverText} />
        )}
      </Grid>
    </Grid>
    <StackGrid
      className={classes.grid}
      gridRef={setDomNode}
      columnWidth={320}
      gutterWidth={25}
      gutterHeight={25}
    >
      {calculatorIds.map(id => <Calculator key={id} id={id} />)}
      {showAddCalculatorButton && <NewCalculatorButton />}
    </StackGrid>
  </Grid>
);

CalculatorGrid.propTypes = {
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classes: PropTypes.object.isRequired,
  onShareHoverText: PropTypes.string,
  setDomNode: PropTypes.func.isRequired,
  showAddCalculatorButton: PropTypes.bool,
  title: PropTypes.string,
  urlToShare: PropTypes.string,
};

export default withStyles(styles)(CalculatorGrid);
