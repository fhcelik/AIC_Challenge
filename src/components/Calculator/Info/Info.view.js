import cx from 'classnames';
import { Grid, TextField, Typography } from '@material-ui/core';
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
  theme,
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
  </Grid>
);

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  formula: PropTypes.string.isRequired,
  showDisplay: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Info);
