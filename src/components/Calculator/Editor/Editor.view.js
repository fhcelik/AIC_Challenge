import cx from 'classnames';
import { Grid, IconButton, Input, TextField } from 'material-ui';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import CancelIcon from 'material-ui-icons/Cancel';
import PreviewIcon from 'material-ui-icons/PlayCircleFilled';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { dot } from '../../../images';
import Formula from '../Formula';
import Header from '../Header';
import HeaderButton from '../HeaderButton';
import { CalculatorStyles, InfoStyles } from '../sharedStyles';
import Argument from './Argument';
import Result from './Result';
import Tags from './Tags';

const styles = theme => ({
  ...CalculatorStyles(theme),
  ...InfoStyles(theme),
  editorRoot: {
    backgroundImage: `url(${dot})`,
  },

  addIcon: {
    color: theme.palette.text.primary,
    fontSize: '30px',
  },
});

const Editor = ({
  args,
  classes,
  description,
  formula,
  onArgAdd,
  onArgAliasChange,
  onArgRemove,
  onArgUnitChange,
  onCancel,
  onDescriptionChange,
  onResultFormulaChange,
  onResultUnitChange,
  onTagAdd,
  onTagDelete,
  onTitleChange,
  result,
  resultBaseUnit,
  showDisplay,
  tags,
  theme,
  title,
}) => (
  <Grid className={cx(classes.root, classes.editorRoot)}>
    <Header>
      <HeaderButton
        onClick={showDisplay}
        icon={PreviewIcon}
        tooltipTitle="Preview"
      />
      <HeaderButton
        onClick={onCancel}
        icon={CancelIcon}
        tooltipTitle="Cancel"
      />
    </Header>
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.content}
    >
      <Input
        name="title"
        value={title}
        onChange={onTitleChange}
        placeholder="Calculator Name"
        type="text"
        multiline
        className={classes.title}
        classes={{ input: classes.titleText }}
      />
      <Tags tags={tags} onTagAdd={onTagAdd} onTagDelete={onTagDelete} />
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        className={classes.args}
      >
        {args.map(arg => (
          <Argument
            key={arg.name}
            {...arg}
            onArgAliasChange={onArgAliasChange}
            onArgUnitChange={onArgUnitChange}
            onArgRemove={onArgRemove}
          />
        ))}
      </Grid>
      <IconButton key="addicon" onClick={onArgAdd}>
        <AddIcon className={classes.addIcon} />
      </IconButton>
      <Result
        {...result}
        unit={resultBaseUnit}
        onFormulaChange={onResultFormulaChange}
        onUnitChange={onResultUnitChange}
      />
      <Grid className={cx(classes.border, classes.formula)}>
        <Formula formula={formula} />
      </Grid>
      <Grid className={classes.border}>
        <TextField
          autoComplete="off"
          name="description"
          label="DESCRIPTION"
          value={description}
          onChange={onDescriptionChange}
          type="text"
          multiline
          {...theme.props.MuiFormControl}
          InputProps={{
            classes: { input: classes.description },
          }}
        />
      </Grid>
    </Grid>
  </Grid>
);

Editor.propTypes = {
  args: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  formula: PropTypes.string.isRequired,
  onArgAdd: PropTypes.func.isRequired,
  onArgAliasChange: PropTypes.func.isRequired,
  onArgRemove: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onDescriptionChange: PropTypes.func.isRequired,
  onResultFormulaChange: PropTypes.func.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  resultBaseUnit: PropTypes.string,
  showDisplay: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
