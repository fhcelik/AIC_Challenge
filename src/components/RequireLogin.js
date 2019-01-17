import * as R from 'ramda';
import {
  branch,
  compose,
  mapProps,
  pure,
  renderComponent,
  withHandlers,
  withState,
} from 'recompose';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import React from 'react';
import { isAuthorizedSelector } from '../redux/selectors/auth';
import { openLoginDropdown } from '../redux/actions/app';
import WithTooltip from './WithTooltip';

const TOOLTIP_TITLE_IF_UNAUTH =
  'You need to login to be able to use this feature';

const renderChildren = ({ children, ...props }) =>
  React.Children.map(children, child => React.cloneElement(child, props));

const enhance = compose(
  connect(state => ({ isAuthorized: isAuthorizedSelector(state) }), {
    openLoginDropdown,
  }),
  branch(R.prop('isAuthorized'), renderComponent(renderChildren)),
  withState('tooltipUnauthTitle', 'setTooltipUnauthTitle', ''),
  withHandlers({
    onClick: ({ openLoginDropdown, setTooltipUnauthTitle }) => () => {
      setTooltipUnauthTitle(TOOLTIP_TITLE_IF_UNAUTH);
      openLoginDropdown();
    },
    onMouseLeave: ({ setTooltipUnauthTitle }) => () =>
      setTooltipUnauthTitle(''),
  }),
  mapProps(R.when(R.prop('tooltipUnauthTitle'), R.dissoc('tooltipTitle'))),
  pure
);

const RequireLogin = ({
  tooltipUnauthTitle,
  onMouseLeave,
  children,
  ...props
}) => (
  <WithTooltip title={tooltipUnauthTitle}>
    <Grid onMouseLeave={onMouseLeave}>
      {renderChildren({ ...props, children })}
    </Grid>
  </WithTooltip>
);

export default enhance(RequireLogin);
