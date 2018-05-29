import cx from 'classnames';
import { Grid, IconButton, TextField } from 'material-ui';
import DeleteIcon from 'material-ui-icons/RemoveCircleOutline';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles } from '../sharedStyles';

const styles = theme => ({
  ...ArgumentStyles(theme),
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: '16px',
    height: '16px',
  },
  deleteIcon: {
    color: theme.colors.text,
    fontSize: '16px',
  },
});

function Argument({
  classes,
  name,
  alias = name,
  unit,
  onArgAliasChange,
  onArgUnitChange,
  onArgRemove,
}) {
  return (
    <Grid
      container
      direction="column"
      className={cx(classes.argument, classes.container)}
    >
      <TextField
        name={name}
        label={`ARGUMENT: ${name}`}
        type="text"
        margin="dense"
        fullWidth
        value={alias}
        onChange={onArgAliasChange}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <UnitSelect
              name={name}
              defaultUnit={unit}
              unrestricted
              onChange={onArgUnitChange}
            />
          ),
        }}
        InputLabelProps={{
          focused: false,
          shrink: true,
        }}
      />

      <IconButton className={classes.deleteButton} onClick={onArgRemove(name)}>
        <DeleteIcon className={classes.deleteIcon} />
      </IconButton>
    </Grid>
  );
}

Argument.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  unit: PropTypes.string,
  onArgAliasChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  onArgRemove: PropTypes.func.isRequired,
};

export default withStyles(styles)(Argument);
