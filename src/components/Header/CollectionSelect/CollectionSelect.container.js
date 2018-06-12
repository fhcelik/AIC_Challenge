import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router';
import DropdownMenuView from './CollectionSelect.view';
import routes from '../../../routes';

const enhance = compose(
  withRouter,
  withProps(() => ({
    collections: [
      {
        key: 'my-calculators',
        route: routes.collection + '?my-calculators',
        title: 'My Calculators',
      },
      {
        key: 'my-favourites',
        route: routes.collection + '?my-favourites',
        title: 'My Favourites',
      },
      {
        key: 'custom-collection',
        route: routes.collection + '?custom-collection',
        title: 'Custom Collection',
      },
      {
        key: 'new-collection',
        route: routes.collection + '?new-collection',
        title: 'New Collection',
      },
    ],
  }))
);

export default enhance(DropdownMenuView);
