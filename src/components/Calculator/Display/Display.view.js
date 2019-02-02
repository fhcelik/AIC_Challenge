import CancelIcon from '@material-ui/icons/Cancel';
import CancelIconOutlined from '@material-ui/icons/CancelOutlined';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import cx from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import EditIconOutlined from '@material-ui/icons/EditOutlined';
import InfoIcon from '@material-ui/icons/Info';
import InfoIconOutLined from '@material-ui/icons/InfoOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddToCollectionButton from './AddToCollectionButton';
import Argument from './Argument';
import Author from '../../Author';
import { CalculatorStyles as styles } from '../sharedStyles';
import Header from '../Header';
import IconButton from '../../IconButton';
import ErrorInfo from './ErrorInfo';
import PublishConfirmation from './PublishConfirmation';
import Result from './Result';
import ShareButton from '../../ShareButton';
import Usages from './Usages';

const Display = ({
  args,
  authorId,
  classes,
  description,
  error,
  id,
  isNew,
  isSaving,
  onArgUnitChange,
  onArgValueChange,
  onCancel,
  onResultUnitChange,
  result,
  shareLink,
  showEditor,
  showInfo,
  tags,
  title,
}) => (
  <Grid
    container
    direction="column"
    className={cx(classes.root, { [classes.isSaving]: isSaving })}
    wrap="nowrap"
  >
    {isNew ? (
      <Header>
        <IconButton
          onClick={showInfo}
          iconOnHover={InfoIcon}
          tooltipTitle="Info"
        >
          <InfoIconOutLined />
        </IconButton>
        <IconButton
          onClick={showEditor}
          iconOnHover={EditIcon}
          tooltipTitle="Edit"
        >
          <EditIconOutlined />
        </IconButton>
        <PublishConfirmation />
        <IconButton
          onClick={onCancel}
          iconOnHover={CancelIcon}
          tooltipTitle="Cancel"
        >
          <CancelIconOutlined />
        </IconButton>
      </Header>
    ) : (
      <Header>
        <Usages id={id} />
        <AddToCollectionButton calculatorId={id} />
        <ShareButton urlToShare={shareLink} hoverText="Share this calculator" />
        <IconButton
          onClick={showInfo}
          iconOnHover={InfoIcon}
          tooltipTitle="Info"
        >
          <InfoIconOutLined />
        </IconButton>
      </Header>
    )}
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.content}
      wrap="nowrap"
    >
      <Grid className={classes.title}>
        <Typography className={classes.titleText} title={description}>
          {title}
        </Typography>
        <Grid container>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.author}
          >
            <Author id={authorId} />
          </Grid>
          {tags.map(tag => (
            <Typography key={tag} className={classes.tag} noWrap title={tag}>
              {tag}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <ErrorInfo error={error}>
        <Grid container direction="column" className={classes.args}>
          {args.map(arg => (
            <Argument
              key={arg.name}
              {...arg}
              onArgValueChange={onArgValueChange}
              onArgUnitChange={onArgUnitChange}
              className={classes.argument}
            />
          ))}
        </Grid>
        <Result {...result} onResultUnitChange={onResultUnitChange} />
      </ErrorInfo>
    </Grid>
    {isSaving && <CircularProgress className={classes.progress} size={150} />}
  </Grid>
);

Display.propTypes = {
  args: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  authorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  error: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  isSaving: PropTypes.bool,
  onArgUnitChange: PropTypes.func.isRequired,
  onArgValueChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  shareLink: PropTypes.string.isRequired,
  showEditor: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Display);
