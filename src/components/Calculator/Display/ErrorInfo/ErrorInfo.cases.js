import React from 'react';
import ErrorInfo from '.';

export const Decorator = story => (
  <div style={{ width: 320, margin: 10 }}>{story()}</div>
);

export default {
  noError: () => <ErrorInfo>No error content</ErrorInfo>,
  hasError: () => <ErrorInfo error={true}>No error content</ErrorInfo>,
};
