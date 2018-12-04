import cx from 'classnames';
import { Grid, TextField, Typography } from 'material-ui';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Author from '../../Author';
import Formula from '../Formula';
import Header from '../Header';
import HeaderButton from '../HeaderButton';
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
      <HeaderButton
        onClick={showDisplay}
        icon={CancelIcon}
        tooltipTitle="Cancel"
      />
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
