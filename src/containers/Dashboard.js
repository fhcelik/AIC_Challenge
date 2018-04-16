import { connect } from 'react-redux';
import { compose, pure, withHandlers } from 'recompose';
import { addCalculator } from '../redux/actions/calculators';
import Dashboard from '../components/Dashboard';

export default compose(
  connect((state) => ({
    formulas: Object.keys(state.formulas).map((id) => (
      {id, title: state.formulas[id].title}) ),
    calculators: Object.keys(state.calculators),
  }),{
    addCalculator: addCalculator,
  }),
  withHandlers({
    onClick: (({addCalculator}) => id => addCalculator({formula: id}))
  }),
  pure,
)(Dashboard);