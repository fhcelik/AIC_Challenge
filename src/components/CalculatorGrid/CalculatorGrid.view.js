import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import { withStyles } from '@material-ui/core/styles';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';

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
  collectionId,
  setDomNode,
  showAddCalculatorButton = false,
  title,
  toolbarItems,
}) => (
  <Grid className={classes.root} container direction="column">
    <Grid
      justify="space-between"
      container
      wrap="nowrap"
      className={classes.header}
    >
      <Grid item xs={9}>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item xs={3} container spacing={16} justify="flex-end">
        {toolbarItems &&
          toolbarItems.map((item, key) => (
            <Grid item key={key}>
              {React.cloneElement(item)}
            </Grid>
          ))}
      </Grid>
    </Grid>
    <StackGrid
      className={classes.grid}
      gridRef={setDomNode}
      columnWidth={320}
      gutterWidth={25}
      gutterHeight={25}
    >
      {calculatorIds.map(id => (
        <Calculator key={id} id={id} collectionId={collectionId} />
      ))}
      {showAddCalculatorButton && (
        <NewCalculatorButton collectionId={collectionId} />
      )}
    </StackGrid>
  </Grid>
);

CalculatorGrid.propTypes = {
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classes: PropTypes.object.isRequired,
  collectionId: PropTypes.string,
  setDomNode: PropTypes.func.isRequired,
  showAddCalculatorButton: PropTypes.bool,
  title: PropTypes.string,
  toolbarItems: PropTypes.arrayOf(PropTypes.node.isRequired),
};

export default withStyles(styles)(CalculatorGrid);
