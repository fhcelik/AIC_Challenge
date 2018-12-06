import * as R from 'ramda';
import { CircularProgress } from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent,
  withHandlers,
  withState,
} from 'recompose';
import NotFound from '../NotFound';

export default ({ entityName, entitySelector, fetchEntityAction }) =>
  compose(
    connect(
      (state, props) => ({
        [entityName]: entitySelector(state, props),
      }),
      { fetchEntity: fetchEntityAction }
    ),
    withState('isLoading', 'setIsLoading', true),
    withState('notFound', 'setNotFound', false),
    withState('serverError', 'setServerError', false),
    withHandlers({
      updateEntity: ({
        id,
        fetchEntity,
        setIsLoading,
        setNotFound,
        setServerError,
      }) => () => {
        setIsLoading(true);
        fetchEntity(id)
          .catch(
            R.pipe(
              R.path(['response', 'status']),
              R.cond([
                [R.equals(404), () => setNotFound(true)],
                [R.equals(500), () => setServerError(true)],
              ])
            )
          )
          .finally(() => setIsLoading(false));
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.updateEntity();
      },
    }),
    branch(
      ({ isLoading, ...props }) => !props[entityName] && isLoading,
      renderComponent(() => <CircularProgress size={100} />)
    ),
    branch(({ notFound }) => notFound, renderComponent(NotFound)),
    // uncomment when we'll have Internal Server Error page component
    // branch(({ serverError }) => serverError, renderComponent(ServerError)),
    pure
  );
