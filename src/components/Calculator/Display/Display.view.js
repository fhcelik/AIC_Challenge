import cx from 'classnames';
import { CircularProgress } from 'material-ui';
import CancelIcon from 'material-ui-icons/Cancel';
import CheckIcon from 'material-ui-icons/CheckCircle';
import EditIcon from 'material-ui-icons/Edit';
import InfoIcon from 'material-ui-icons/InfoOutline';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Header';
import HeaderButton from '../HeaderButton';
import { CalculatorStyles as styles } from '../sharedStyles';
import AddToCollectionButton from './AddToCollectionButton';
import Argument from './Argument';
import Result from './Result';

const Display = ({
  args,
  classes,
  description,
  id,
  isAuthorized,
  isNew,
  isSaving,
  onArgUnitChange,
  onArgValueChange,
  onCancel,
  onEditDone,
  onResultUnitChange,
  result,
  setArgToFormula,
  showEditor,
  showInfo,
  tags,
  title,
}) => (
  <Grid
    container
    direction="column"
    className={cx(classes.root, { [classes.isSaving]: isSaving })}
  >
    {isNew ? (
      <Header>
        <HeaderButton onClick={showInfo} icon={InfoIcon} tooltipTitle="Info" />
        <HeaderButton
          onClick={showEditor}
          icon={EditIcon}
          tooltipTitle="Edit"
        />
        <HeaderButton
          onClick={onEditDone}
          icon={CheckIcon}
          tooltipTitle="Save"
        />
        <HeaderButton
          onClick={onCancel}
          icon={CancelIcon}
          tooltipTitle="Cancel"
        />
      </Header>
    ) : (
      <Header>
        {isAuthorized && <AddToCollectionButton calculatorId={id} />}
        <HeaderButton onClick={showInfo} icon={InfoIcon} tooltipTitle="Info" />
      </Header>
    )}
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.content}
    >
      <Grid className={classes.title}>
        <Tooltip id={`${id}-tooltip`} title={description}>
          <Typography className={classes.titleText}>{title}</Typography>
        </Tooltip>
        <Grid container>
          {tags.map(tag => (
            <Typography key={tag} className={classes.tag}>
              {tag}
            </Typography>
          ))}
        </Grid>
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
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isNew: PropTypes.bool,
  isSaving: PropTypes.bool,
  onArgUnitChange: PropTypes.func.isRequired,
  onArgValueChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEditDone: PropTypes.func.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
  showEditor: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Display);
