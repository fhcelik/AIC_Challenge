import cx from 'classnames';
import { Input, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import UnitSelect from '../../UnitSelect';
import { ResultStyles } from '../sharedStyles';

const styles = theme => ({
  ...ResultStyles(theme),
  formulaInput: {
    fontSize: 'inherit',
  },
});

const Result = ({
  classes,
  name,
  execFormula,
  onFormulaChange,
  result,
  unit,
  onUnitChange,
}) => {
  return (
    <Input
      classes={{
        root: cx(classes.result, classes.resultText),
        input: classes.formulaInput,
      }}
      name={name}
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
            name={name}
            defaultUnit={unit}
            onChange={onUnitChange}
          />
        )
      }
    />
  );
};

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  execFormula: PropTypes.string.isRequired,
  onFormulaChange: PropTypes.func.isRequired,
  result: PropTypes.any,
  unit: PropTypes.string,
  onUnitChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Result);
