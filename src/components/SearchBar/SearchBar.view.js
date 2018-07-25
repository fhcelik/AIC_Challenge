import { Input } from '@material-ui/core';
import { withStyles } from 'material-ui';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  searchIcon: {
    fontSize: 32,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.faded,
  },
  searchText: {
    ...theme.typography.display3,
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    padding: '10px 0',
  },
  focused: {
    backgroundColor: `linear-gradient(to right, ${theme.palette.primary.main} ${
      theme.palette.navbar.background
    })`,
  },
});

const SearchBar = ({ classes, setInputRef, onSearchStart, onSearch }) => (
  <Input
    className={classes.searchText}
    classes={{ focused: classes.focused }}
    type="text"
    placeholder="Search for Calculators..."
    inputRef={setInputRef}
    startAdornment={<MoreVertIcon className={classes.searchIcon} />}
    onFocus={onSearchStart}
    onChange={onSearch}
  />
);

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setInputRef: PropTypes.func.isRequired,
  onSearchStart: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
export default withStyles(styles)(SearchBar);
