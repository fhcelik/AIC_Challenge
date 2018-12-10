import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/users';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import Author from './Author.view';

export default compose(
  connect(
    (state, { id }) => ({
      id: id || loggedInUserIdSelector(state),
    }),
    {
      fetchUser,
    }
  ),
  withHandlers({
    fetchUser: ({ id, fetchUser }) => () => {
      fetchUser(id);
    },
  })
)(Author);
