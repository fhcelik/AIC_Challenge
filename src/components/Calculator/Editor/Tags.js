import cx from 'classnames';
import { Chip, withStyles } from 'material-ui';
import ChipInput from 'material-ui-chip-input';
import React from 'react';
import { CalculatorStyles, InfoStyles } from '../sharedStyles';

const styles = theme => ({
  ...CalculatorStyles(theme),
  ...InfoStyles(theme),
  selectedTag: {
    border: `1px solid ${theme.colors.tagHighlight}`,
  },
});

const Tags = ({ classes, tags, onTagAdd, onTagDelete }) => {
  const Tag = ({ text, isFocused, handleDelete, className }, key) => (
    <Chip
      key={key}
      className={cx(className, { [classes.selectedTag]: isFocused })}
      onDelete={handleDelete}
      label={text}
    />
  );

  return (
    <div className={classes.border}>
      <ChipInput
        value={tags}
        label="TAGS"
        chipRenderer={Tag}
        onAdd={onTagAdd}
        onDelete={onTagDelete}
        fullWidth
        margin="dense"
        classes={{
          input: classes.textEditor,
          chip: classes.tag,
        }}
        disableUnderline
        InputLabelProps={{
          focused: false,
          shrink: true,
        }}
      />
    </div>
  );
};

export default withStyles(styles)(Tags);
