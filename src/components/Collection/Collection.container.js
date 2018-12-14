import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import { fetchCollection } from '../../redux/actions/collections';
import {
  calculatorIdsByCollectionId,
  collectionByIdSelector,
  isCollectionAuthoredByLoggedInUserSelector,
} from '../../redux/selectors/collections';
import { getCollectionLink } from '../App/Routing/Routing';
import handleFetchEntity from '../hoc/handleFetchEntity';
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
  handleFetchEntity({
    entityName: 'collection',
    entitySelector: collectionByIdSelector,
    fetchEntityAction: fetchCollection,
  }),
  withProps(
    ({ collection, id, isCollectionAuthoredByLoggedInUser, noUnits }) => ({
      title: `COLLECTION: ${R.propOr('', 'name', collection)}`,
      collectionId: R.prop('id', collection),
      showAddCalculatorButton: isCollectionAuthoredByLoggedInUser && !noUnits,
      onShareHoverText: 'Share this collection',
      urlToShare: getCollectionLink(id),
    })
  ),
  pure
)(CalculatorGrid);
