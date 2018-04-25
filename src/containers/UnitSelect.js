import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import UnitSelect from '../components/UnitSelect';
import { getBaseUnit } from '../redux/schemas/units';

export default compose(
  connect((state, { defaultUnit }) => ({
    units: state.units[getBaseUnit(defaultUnit)] || [defaultUnit]
  })),
  pure
)(UnitSelect);
