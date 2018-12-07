import { withProps } from 'recompose';
import ErrorPage from './ErrorPage.view';

const error404 = {
  errorCode: '404',
  title: 'Not found',
  description: "You're looking for something that probably doesn't exist.",
};

export default withProps(error404)(ErrorPage);
