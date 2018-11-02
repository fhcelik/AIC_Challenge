import cx from 'classnames';
import { Chip, withStyles } from 'material-ui';
import ChipInput from 'material-ui-chip-input';
import React from 'react';
import PropTypes from 'prop-types';
import { CalculatorStyles, InfoStyles } from '../sharedStyles';

const styles = theme => ({
  ...CalculatorStyles(theme),
  ...InfoStyles(theme),
  selectedTag: {
    border: `1px solid ${theme.palette.tag.highlight}`,
  },
  tagLabel: {
    display: 'block',
    maxWidth: '264px',
    overflow: 'hidden',
    paddingLeft: 4,
    textOverflow: 'ellipsis',
  },
});

const Tags = ({ classes, theme, tags, onTagAdd, onTagDelete }) => {
  const Tag = ({ text, isFocused, handleDelete, className }, key) => (
    <Chip
      key={key}
      classes={{ label: classes.tagLabel }}
      className={cx(className, { [classes.selectedTag]: isFocused })}
      onDelete={handleDelete}
      label={text}
      title={text}
    />
  );

  return (
    <div className={cx(classes.border, classes.tags)}>
      <ChipInput
        value={tags}
        label="TAGS"
        chipRenderer={Tag}
        onAdd={onTagAdd}
        onDelete={onTagDelete}
        classes={{
          chip: classes.tag,
          input: classes.textEditor,
        }}
        {...theme.props.MuiInput}
        {...theme.props.MuiFormControl}
        InputLabelProps={theme.props.MuiInputLabel}
      />
    </div>
  );
};

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Tags);
