import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import { fetchCollection } from '../../redux/actions/collections';
import {
  calculatorIdsByCollectionId,
  collectionByIdSelector,
  isCollectionAuthoredByLoggedInUserSelector,
} from '../../redux/selectors/collections';
import handleFetchEntityEnhancer from '../handleFetchEntity.enhancer';
import CalculatorGrid from '../CalculatorGrid';
import { noUnitsSelector } from '../../redux/selectors/units';

export default compose(
  connect((state, props) => ({
    calculatorIds: calculatorIdsByCollectionId(state, props),
    isCollectionAuthoredByLoggedInUser: isCollectionAuthoredByLoggedInUserSelector(
      state,
      props
    ),
    noUnits: noUnitsSelector(state, props),
  })),
  handleFetchEntityEnhancer({
    entityName: 'collection',
    entitySelector: collectionByIdSelector,
    fetchEntityAction: fetchCollection,
  }),
  withProps(({ collection, isCollectionAuthoredByLoggedInUser, noUnits }) => ({
    title: `COLLECTION: ${R.propOr('', 'name', collection)}`,
    showAddCalculatorButton: isCollectionAuthoredByLoggedInUser && !noUnits,
  })),
  pure
)(CalculatorGrid);
