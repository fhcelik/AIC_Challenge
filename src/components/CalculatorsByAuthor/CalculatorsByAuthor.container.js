import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import React from 'react';
import { newAndSavedCalculatorsByAuthorIdSelector } from '../../redux/selectors/calculatorsByAuthor';
import { fetchCalculatorsByAuthorId } from '../../redux/actions/calculatorsByAuthor';
import { getCalculatorsByUserLink } from '../App/Routing/Routing';
import handleFetchEntityEnhancer from '../hoc/handleFetchEntity';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import CalculatorGrid from '../CalculatorGrid';
import ShareButton from '../ShareButton';

export default compose(
  connect(state => ({
    loggedInUserId: loggedInUserIdSelector(state),
  })),
  withProps(({ id, loggedInUserId }) => ({
    isMyCalculators: loggedInUserId === id,
  })),
  withProps(
    R.ifElse(
      R.prop('isMyCalculators'),
      () => ({ title: 'my calculators', showAddCalculatorButton: true }),
      ({ id }) => ({ title: `calculators by ${id}` })
    )
  ),
  withProps(({ id, title }) => ({
    toolbarItems: [
      <ShareButton
        hoverText={`Share ${title}`}
        urlToShare={getCalculatorsByUserLink(id)}
      />,
    ],
  })),
  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: newAndSavedCalculatorsByAuthorIdSelector,
    fetchEntityAction: fetchCalculatorsByAuthorId,
  }),
  pure
)(CalculatorGrid);
