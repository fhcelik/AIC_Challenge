import cx from 'classnames';
import { Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../../TextField';
import UnitSelect from '../../UnitSelect';
import { ArgumentStyles } from '../sharedStyles';

const styles = theme => ({
  ...ArgumentStyles,
  root: {
    margin: '-2px 0 0 0',
    '& input': {
      textTransform: 'uppercase',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  deleteButton: {
    position: 'absolute',
    bottom: 25,
    right: -7,
  },
  deleteIcon: {
    color: theme.palette.text.primary,
    fontSize: '16px',
  },
});

const Argument = ({
  classes,
  name,
  alias = name,
  unit,
  onArgAliasChange,
  onArgUnitChange,
  onArgRemove,
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
          >
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
          <UnitSelect
            className={classes.endAdornmentRoot}
            name={name}
            defaultUnit={unit}
            unrestricted
            onChange={onArgUnitChange}
          />
        </Grid>
      ),
    }}
  />
);

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
