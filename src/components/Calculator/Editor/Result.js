import cx from 'classnames';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UnitSelect from '../../UnitSelect';
import { ResultStyles } from '../sharedStyles';

const styles = theme => ({
  ...ResultStyles(theme),
  formulaInput: {
    fontSize: 'inherit',
    padding: '0 0.3em',
    minHeight: 27,
  },
});

const Result = ({
  classes,
  execFormula,
  onFormulaChange,
  result,
  unit,
  onUnitChange,
}) => (
  <Input
    classes={{
      root: cx(classes.result, classes.editorResultText),
      input: classes.formulaInput,
    }}
    value={execFormula}
    onChange={onFormulaChange}
    error={isNaN(result)}
    type="text"
    multiline
    endAdornment={
      unit && (
        <UnitSelect
          classes={{
            selectMenu: classes.resultSelectMenu,
            icon: classes.resultSelectIcon,
          }}
          name="Result"
          defaultUnit={unit}
          onChange={onUnitChange}
        />
      )
    }
    placeholder="Formula"
  />
);

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  execFormula: PropTypes.string,
  onFormulaChange: PropTypes.func.isRequired,
  result: PropTypes.any,
  unit: PropTypes.string,
  onUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Result);
