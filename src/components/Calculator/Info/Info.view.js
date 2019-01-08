import cx from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CancelIconOutlined from '@material-ui/icons/CancelOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Author from '../../Author';
import Formula from '../Formula';
import Header from '../Header';
import IconButton from '../../IconButton';
import { CalculatorStyles, InfoStyles } from '../sharedStyles';

const styles = theme => ({
  ...CalculatorStyles(theme),
  ...InfoStyles(theme),
});

const Info = ({
  classes,
  description,
  formula,
  authorId,
  showDisplay,
  title,
}) => (
  <Grid container direction="column" className={classes.root} wrap="nowrap">
    <Header>
      <IconButton
        onClick={showDisplay}
        iconOnHover={CancelIcon}
        tooltipTitle="Cancel"
      >
        <CancelIconOutlined />
      </IconButton>
    </Header>
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.content}
    >
      <Typography className={cx(classes.titleText, classes.title)}>
        {title}
      </Typography>
      <Grid className={classes.author}>
        <Author id={authorId} />
      </Grid>
      <Grid className={cx(classes.border, classes.formula)}>
        <Formula formula={formula} />
      </Grid>
      <Grid className={cx(classes.description, classes.border)}>
        <Typography className={classes.descriptionHeader}>
          DESCRIPTION
        </Typography>
        <Typography className={classes.descriptionBody}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  formula: PropTypes.string.isRequired,
  showDisplay: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Info);
