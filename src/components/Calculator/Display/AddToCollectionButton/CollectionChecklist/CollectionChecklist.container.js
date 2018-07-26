import { connect } from 'react-redux';
import { compose } from 'recompose';
import { menuCollectionsSelector } from '../../../../../redux/selectors/collections';
import CollectionChecklist from './CollectionChecklist.view';

export default compose(
  connect((state, props) => ({
    menuEntries: menuCollectionsSelector(state, props),
  }))
)(CollectionChecklist);
