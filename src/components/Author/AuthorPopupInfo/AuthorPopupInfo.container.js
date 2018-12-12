import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { branch, compose, flattenProp, pure, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { userByIdSelector } from '../../../redux/selectors/users';
import AuthorPopupInfo from './AuthorPopupInfo.view';

export default compose(
  connect((state, props) => ({
    authorInfo: userByIdSelector(state, props),
  })),
  branch(
    ({ authorInfo }) => !authorInfo,
    renderComponent(() => <CircularProgress />)
  ),
  flattenProp('authorInfo'),
  pure
)(AuthorPopupInfo);
