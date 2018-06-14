import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  pure,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';
import Collection from './Collection.view';
import { withRouter } from 'react-router';
import { addCalculator } from '../../redux/actions/calculators';
import { fetchCollection } from '../../redux/actions/collections';
import { collectionByIdSelector } from '../../redux/selectors/collections';
import { CircularProgress } from 'material-ui';

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
  pure
)(Collection);
