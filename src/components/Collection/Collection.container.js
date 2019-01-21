import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withHandlers, withProps } from 'recompose';
import { push } from 'react-router-redux';
import React from 'react';
import {
  deleteCollection,
  fetchCollection,
} from '../../redux/actions/collections';
import {
  calculatorIdsByCollectionId,
  collectionByIdSelector,
  isCollectionAuthoredByLoggedInUserSelector,
} from '../../redux/selectors/collections';
import { getCollectionLink } from '../App/Routing/Routing';
import handleFetchEntity from '../hoc/handleFetchEntity';
import CalculatorGrid from '../CalculatorGrid';
import DeleteButton from '../DeleteButton';
import { noUnitsSelector } from '../../redux/selectors/units';
import { Routes } from '../App/Routing';
import ShareButton from '../ShareButton';

export default compose(
  connect(
    (state, props) => ({
      calculatorIds: calculatorIdsByCollectionId(state, props),
      isCollectionAuthoredByLoggedInUser: isCollectionAuthoredByLoggedInUserSelector(
        state,
        props
      ),
      noUnits: noUnitsSelector(state, props),
    }),
    {
      deleteCollection,
      push,
    }
  ),
  handleFetchEntity({
    entityName: 'collection',
    entitySelector: collectionByIdSelector,
    fetchEntityAction: fetchCollection,
  }),
  withProps(({ collection, isCollectionAuthoredByLoggedInUser, noUnits }) => ({
    title: `COLLECTION: ${R.propOr('', 'name', collection)}`,
    collectionId: R.prop('id', collection),
    showAddCalculatorButton: isCollectionAuthoredByLoggedInUser && !noUnits,
  })),
  withHandlers({
    handleDelete: ({ collectionId, push, deleteCollection }) => () => {
      push(Routes.root);
      deleteCollection(collectionId);
    },
  }),
  withProps(({ collectionId, handleDelete }) => ({
    toolbarItems: [
      <DeleteButton
        deleteTooltipTitle="Delete this collection"
        handleDelete={handleDelete}
      />,
      <ShareButton
        hoverText="Share this collection"
        urlToShare={getCollectionLink(collectionId)}
      />,
    ],
  })),
  pure
)(CalculatorGrid);
