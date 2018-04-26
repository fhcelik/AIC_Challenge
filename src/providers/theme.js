import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

// setup basic theme and any overrides that are
// needed here
const theme = createMuiTheme();

export const CalcoolaTheme = props => (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
  </CssBaseline>
);

export default CalcoolaTheme;
