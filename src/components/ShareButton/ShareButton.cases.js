import React from 'react';
import ShareButton from './';

export const Decorator = story => (
  <div style={{ color: 'white' }}>{story()}</div>
);

export default {
  default: () => (
    <ShareButton
      urlToShare="http://example.com"
      hoverText="click to copy sharing link to clipboard"
    />
  ),
};
