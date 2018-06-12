import cx from 'classnames';
import { Grid, IconButton, Input, TextField } from 'material-ui';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import CancelIcon from 'material-ui-icons/Cancel';
import CheckIcon from 'material-ui-icons/CheckCircle';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { dot } from '../../../images';
import Formula from '../Formula';
import Header from '../Header';
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

  textEditor: {
    ...theme.typography.display3,
  },

  addIcon: {
    color: theme.colors.text,
    fontSize: '30px',
  },
});

const Editor = ({
  classes,
  theme,
  title,
  description,
  tags,
  onTagAdd,
  onTagDelete,
  args,
  onTitleChange,
  onDescriptionChange,
  onArgAdd,
  onArgAliasChange,
  onArgUnitChange,
  onArgRemove,
  result,
  resultBaseUnit,
  onResultFormulaChange,
  onResultUnitChange,
  formula,
}) => (
  <div className={cx(classes.root, classes.editorRoot)}>
    <Header>
      <CheckIcon />
      <CancelIcon />
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
      <div className={cx(classes.border, classes.formula)}>
        <Formula formula={formula} />
      </div>
      <div className={classes.border}>
        <TextField
          name="description"
          label="DESCRIPTION"
          value={description}
          onChange={onDescriptionChange}
          placeholder="Calculator Description"
          type="text"
          multiline
          {...theme.props.MuiFormControl}
          InputProps={{
            classes: { input: classes.textEditor },
          }}
        />
      </div>
    </Grid>
  </div>
);

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
  args: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onArgAdd: PropTypes.func.isRequired,
  onArgAliasChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  onArgRemove: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  resultBaseUnit: PropTypes.string,
  onResultFormulaChange: PropTypes.func.isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
  formula: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
