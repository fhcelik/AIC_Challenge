import { Grid, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';
import ShareButton from '../ShareButton';

const styles = {
  grid: {
    marginTop: '30px',
  },
  title: {
    textTransform: 'uppercase',
  },
};

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
        <Typography variant="display4" className={classes.title}>
          {title}
        </Typography>
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
