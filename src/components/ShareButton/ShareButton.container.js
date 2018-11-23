import clipboard from 'copy-to-clipboard';
import { compose, withHandlers, withProps, withState } from 'recompose';
import ShareButton from './ShareButton.view';

const SUCCESS_TEXT = 'URL has been copied for sharing';
const SUCCESS_TIMEOUT = 3000;

const enhance = compose(
  withState('successText', 'setSuccessText', undefined),
  withHandlers({
    onClick: ({ urlToShare, setSuccessText }) => event => {
      clipboard(urlToShare);
      setSuccessText(SUCCESS_TEXT);
      setTimeout(() => setSuccessText(undefined), SUCCESS_TIMEOUT);
    },
  }),
  withProps(({ hoverText, successText }) => ({
    hoverText: !successText ? hoverText : '',
  }))
);

export default enhance(ShareButton);
