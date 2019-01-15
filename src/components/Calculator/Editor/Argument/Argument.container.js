import * as R from 'ramda';
import {
  compose,
  lifecycle,
  pure,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { connect } from 'react-redux';
import { allUnitsSelector } from '../../../../redux/selectors/units';
import Argument from './Argument.view';

const getMatchedUnitsByValue = (value, units) =>
  R.pipe(
    R.trim,
    R.toLower,
    R.ifElse(
      R.length,
      val =>
        R.filter(
          unit =>
            R.equals(
              R.compose(R.slice(0, R.length(val)), R.toLower)(unit),
              val
            ),
          units
        ),
      () => []
    )
  )(value);

export default compose(
  connect(state => ({ units: allUnitsSelector(state) })),
  withState('unitValue', 'setUnitValue', R.propOr('', 'unit')),
  withState('unitSuggestions', 'setUnitSuggestions', []),
  withHandlers({
    onUnitChange: ({ setUnitValue }) => (e, { newValue }) =>
      setUnitValue(newValue),
    onUnitSelected: ({ onArgUnitChange, name }) => (e, { suggestionValue }) => {
      onArgUnitChange({ target: { value: suggestionValue, name } });
    },
    onUnitSuggestionsFetchRequested: ({ units, setUnitSuggestions }) => ({
      value,
    }) => {
      setUnitSuggestions(getMatchedUnitsByValue(value, units));
    },
    onUnitSuggestionsClearRequested: ({ setUnitSuggestions }) => () =>
      setUnitSuggestions([]),
  }),
  lifecycle({
    componentDidUpdate({ unitValue: prevUnitValue }) {
      const { unitValue, name, onArgUnitRemove } = this.props;

      if (prevUnitValue && !unitValue) {
        onArgUnitRemove(name);
      }
    },
  }),
  withProps(({ unitValue, onUnitChange }) => ({
    unitAutosuggestInputProps: {
      placeholder: 'UoM',
      value: unitValue,
      onChange: onUnitChange,
    },
  })),
  pure
)(Argument);
