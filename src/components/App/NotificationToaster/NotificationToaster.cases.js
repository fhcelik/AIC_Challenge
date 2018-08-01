import React from 'react';
import NotificationToaster from '../NotificationToaster';

export const initialState = {
  notifications: [
    { id: '1', message: 'Successful Notification' },
    { id: '2', message: 'test error', error: true },
  ],
};

export default {
  base: () => <NotificationToaster />,
};
