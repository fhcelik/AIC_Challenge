import PropTypes from 'prop-types';
import React from 'react';
import CollectionCheckEntry from './CollectionCheckEntry';

const CollectionChecklist = ({ calculatorId, menuEntries }) => (
  <React.Fragment>
    {menuEntries.map(props => (
      <CollectionCheckEntry
        key={props.id}
        calculatorId={calculatorId}
        {...props}
      />
    ))}
  </React.Fragment>
);

CollectionChecklist.propTypes = {
  calculatorId: PropTypes.string.isRequired,
  menuEntries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CollectionChecklist;
