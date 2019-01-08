import { Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WithTooltip from '../../../WithTooltip';

const styles = theme => ({
  root: {
    border: `2px ${theme.palette.text.faded} solid`,
    height: '1.6em',
    padding: '1px 11px',
    borderRadius: '30px',
    fontFamily: 'oxygen mono',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 1,
    marginRight: 3,
  },
});

const Usages = ({ classes, label, tooltipTitle }) => (
  <WithTooltip title={tooltipTitle}>
    <Grid className={classes.root}>{label}</Grid>
  </WithTooltip>
);

Usages.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  tooltipTitle: PropTypes.string,
};

export default withStyles(styles)(Usages);
