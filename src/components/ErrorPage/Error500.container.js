import { withProps } from 'recompose';
import ErrorPage from './ErrorPage.view';

const error500 = {
  errorCode: '500',
  title: 'Oops, something went wrong',
  description:
    'Sorry for the inconvenience.\nWe are working to fix this.\nPlease try again later.',
};

export default withProps(error500)(ErrorPage);
