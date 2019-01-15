import * as R from 'ramda';
import Autosuggest from 'react-autosuggest';
import cx from 'classnames';
import { Grid, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/RemoveCircle';
import DeleteIconOutlined from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../../../IconButton';
import TextField from '../../../TextField';
import { ArgumentStyles } from '../../sharedStyles';

const styles = {
  ...ArgumentStyles,
  root: {
    margin: '-2px 0 0 0',
    '& input': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    overflowX: 'visible',
  },
  endAdornmentRoot: {
    margin: '0 2px 0 0',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 25,
    right: -7,
  },
  deleteIcon: {
    fontSize: '16px !important',
  },
};

const AutosuggestInput = ({
  classes,
  onChange,
  placeholder,
  value,
  ...props
}) => (
  <Input
    classes={classes}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    inputProps={props}
  />
);

const generateAutosuggestTheme = (theme, unitSuggestions) => ({
  input: {
    textAlign: 'right',
    maxWidth: '130px',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    zIndex: 10,
    background: theme.palette.dropdownMenu.background,
    border: R.length(unitSuggestions)
      ? `1px solid ${theme.palette.dropdownMenu.border}`
      : 'none',
    width: 120,
    maxHeight: '250px',
    overflow: 'auto',
    boxShadow: `${theme.palette.dropdownMenu.shadow} 4px 5px 4px -1px`,
  },
  suggestion: {
    ...theme.typography.display2,
    listStyleType: 'none',
    cursor: 'pointer',
    padding: '15px 16px',
  },
  suggestionHighlighted: {
    backgroundColor: theme.palette.link.hover,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
  },
});

const Argument = ({
  classes,
  name,
  alias = name,
  onArgAliasChange,
  onArgRemove,
  onUnitSelected,
  onUnitSuggestionsClearRequested,
  onUnitSuggestionsFetchRequested,
  theme,
  unitAutosuggestInputProps,
  unitSuggestions,
}) => (
  <TextField
    className={cx(classes.root, classes.textField)}
    autoComplete="off"
    name={name}
    label={`ARGUMENT: ${name}`}
    type="text"
    value={alias}
    onChange={onArgAliasChange}
    InputProps={{
      endAdornment: (
        <Grid className={classes.endAdornmentRoot}>
          <IconButton
            className={classes.deleteButton}
            onClick={onArgRemove(name)}
            iconOnHover={DeleteIcon}
            tooltipTitle="Delete argument"
          >
            <DeleteIconOutlined className={classes.deleteIcon} />
          </IconButton>
          <Autosuggest
            suggestions={unitSuggestions}
            onSuggestionsFetchRequested={onUnitSuggestionsFetchRequested}
            onSuggestionsClearRequested={onUnitSuggestionsClearRequested}
            getSuggestionValue={R.identity}
            renderSuggestion={R.identity}
            inputProps={unitAutosuggestInputProps}
            onSuggestionSelected={onUnitSelected}
            renderInputComponent={AutosuggestInput}
            theme={generateAutosuggestTheme(theme, unitSuggestions)}
          />
        </Grid>
      ),
    }}
    InputLabelProps={{ className: classes.inputLabel }}
  />
);

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  onArgAliasChange: PropTypes.func.isRequired,
  onArgRemove: PropTypes.func.isRequired,
  onUnitSelected: PropTypes.func.isRequired,
  onUnitSuggestionsClearRequested: PropTypes.func.isRequired,
  onUnitSuggestionsFetchRequested: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  unitAutosuggestInputProps: PropTypes.object.isRequired,
  unitSuggestions: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(Argument);
