import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/users';
import Author from './Author.view';

export default compose(
  connect(null, { fetchUser }),
  withHandlers({
    fetchUser: ({ id, fetchUser }) => () => {
      fetchUser(id);
    },
  })
)(Author);
