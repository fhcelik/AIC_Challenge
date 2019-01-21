import React from 'react';
import Icon from '@material-ui/icons/InsertEmoticon';
import ConfirmationDialog from './';

export const Decorator = story => (
  <div
    style={{
      width: 340,
      border: '1px solid white',
      margin: 20,
    }}
  >
    {story()}
  </div>
);

export default {
  base: () => (
    <ConfirmationDialog
      bodyText="Confirmation dialog's body text"
      handleClose={() => {}}
      handleConfirm={() => {}}
      headerText="Confirmation dialog's header text"
      icon={Icon}
    />
  ),
};
