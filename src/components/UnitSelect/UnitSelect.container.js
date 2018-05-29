import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import {
  allUnitsSelector,
  matchingUnitsSelector,
} from '../../redux/selectors/units';
import UnitSelect from './UnitSelect.view';

export default compose(
  connect((state, { defaultUnit, unrestricted }) => ({
    units: unrestricted
      ? allUnitsSelector(state)
      : matchingUnitsSelector(state, { defaultUnit }),
  })),
  pure
)(UnitSelect);
