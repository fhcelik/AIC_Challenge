import { CircularProgress } from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent,
  withHandlers,
  withProps,
} from 'recompose';
import { addCalculator } from '../../redux/actions/calculators';
import { fetchCollection } from '../../redux/actions/collections';
import { collectionByIdSelector } from '../../redux/selectors/collections';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      collection: collectionByIdSelector(state, props),
    }),
    {
      addCalculator,
      fetchCollection,
    }
  ),
  withHandlers({
    onClick: ({ addCalculator }) => id => addCalculator({ formula: id }),
  }),
  lifecycle({
    componentDidMount() {
      const { id, fetchCollection } = this.props;
      fetchCollection({ id });
    },
  }),
  branch(
    ({ collection }) => !collection,
    renderComponent(() => <CircularProgress size={100} />)
  ),
  withProps(({ collection }) => ({
    title: `COLLECTION: ${collection.name}`,
    calculatorIds: collection.calculators,
    addButton: true,
  })),
  pure
)(CalculatorGrid);
