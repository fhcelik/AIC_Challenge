import React from 'react';
import UserProfileMenu from '../UserProfileMenu';

export const initialState = {
  auth: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3OThiYjQwLTJmZDQtNGFmYS1iMmY0LTE5YjI0NWIxOTAzYiIsImVtYWlsIjoiam9obnNtaXRoQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiSm9obiBTbWl0aCIsInJvbGUiOiJQZXRyb2xldW0gRW5naW5lZXIiLCJjb21wYW55IjoiU3VuY29yIn0._Q2FMNldTRCHTlTyN8ihmLn_AQloT0dNHYog5CdDlv4',
    user: {
      id: '7798bb40-2fd4-4afa-b2f4-19b245b1903b',
      email: 'johnsmith@gmail.com',
      fullName: 'John Smith',
      role: 'Petroleum Engineer',
      company: 'Suncor',
    },
  },
};

export default {
  base: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 10,
      }}
    >
      <UserProfileMenu />
    </div>
  ),
};
