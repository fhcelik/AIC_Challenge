import React from 'react';
import DeleteButton from './';

export const Decorator = story => (
  <div style={{ color: 'white' }}>{story()}</div>
);

export default {
  default: () => (
    <DeleteButton handleDelete={() => {}} deleteTooltipTitle="Delete" />
  ),
};
