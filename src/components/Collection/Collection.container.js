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
  withProps,
} from 'recompose';
import { fetchCollection } from '../../redux/actions/collections';
import {
  calculatorIdsByCollectionId,
  collectionByIdSelector,
} from '../../redux/selectors/collections';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      collection: collectionByIdSelector(state, props),
      calculatorIds: calculatorIdsByCollectionId(state, props),
    }),
    { fetchCollection }
  ),
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
    showAddCalculatorButton: true,
  })),
  pure
)(CalculatorGrid);
