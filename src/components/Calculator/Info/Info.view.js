import { IconButton } from '@material-ui/core';
import cx from 'classnames';
import { Grid, TextField, Typography } from 'material-ui';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Formula from '../Formula';
import Header from '../Header';
import { CalculatorStyles, InfoStyles } from '../sharedStyles';

const styles = theme => ({
  ...CalculatorStyles(theme),
  ...InfoStyles(theme),
});

const Info = ({ classes, title, description, formula, showDisplay, theme }) => (
  <div className={classes.root}>
    <Header>
      <IconButton onClick={showDisplay}>
        <CancelIcon />
      </IconButton>
    </Header>
    <Grid container direction="column" className={classes.content}>
      <Typography className={cx(classes.titleText, classes.title)}>
        {title}
      </Typography>
      <div className={cx(classes.border, classes.formula)}>
        <Formula formula={formula} />
      </div>
      <TextField
        autoComplete="off"
        label="DESCRIPTION"
        value={description}
        disabled
        type="text"
        multiline
        {...theme.props.MuiFormControl}
        InputProps={{
          classes: { input: classes.description },
        }}
      />
    </Grid>
  </div>
);

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  formula: PropTypes.string.isRequired,
  showDisplay: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Info);
