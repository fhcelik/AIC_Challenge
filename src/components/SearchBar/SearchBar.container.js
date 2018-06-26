import qs from 'qs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { fetchSearchCalculators } from '../../redux/actions/search';
import { Routes } from '../App/Routing';
import SearchBar from './SearchBar.view';

export default compose(
  withRouter,
  connect(null, {
    fetchSearchCalculators,
    push,
  }),
  withProps(({ location }) => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    return {
      query: location.pathname === Routes.search ? params.q : undefined,
    };
  }),
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    onSearchStart: ({ inputRef, location, push }) => () => {
      if (location.pathname !== Routes.search) {
        const searchString = inputRef ? inputRef.value : '';
        push(`${Routes.search}?q=${searchString}`);
      }
    },
    onSearch: ({ fetchSearchCalculators }) => ({ target: { value } }) => {
      fetchSearchCalculators({ search: value });
    },
  }),
  lifecycle({
    componentDidUpdate() {
      const { inputRef, fetchSearchCalculators, query } = this.props;
      if (inputRef && query && inputRef.value !== query) {
        inputRef.value = query;
        fetchSearchCalculators({ search: query });
      }
    },
  })
)(SearchBar);
