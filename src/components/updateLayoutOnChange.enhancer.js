import PropTypes from 'prop-types';
import { compose, getContext, lifecycle } from 'recompose';

export default compose(
  getContext({ onResize: PropTypes.func }),
  lifecycle({
    componentDidUpdate() {
      const { onResize } = this.props;
      onResize && onResize();
    },
  })
);
