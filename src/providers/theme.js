import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

export const colors = {
  background: '#1C2938',
  backgroundGradient: 'linear-gradient(180deg, #263440 0%, #1C2938 100%)',
  headerBackground: 'rgba(33, 46, 61, 0.9)',
  cardBackground: 'rgba(26, 60, 71, 0.5)',
  tagBackground: '#1C444D',
  cardHeader: '#314352',
  fadedText: '#4F6374',
  tagHighlight: '#5C7488',
  text: '#D5DBD8',
  orange: '#A53C25',
  white: 'white',
};

const typography = {
  fontFamily: 'oxygen mono',
  subheading: {
    fontSize: '0.7rem',
    color: colors.fadedText,
  },
  display1: {
    fontSize: '0.8rem',
    color: colors.text,
  },
  display2: {
    fontSize: '0.9rem',
    color: colors.text,
    fontWeight: '600',
  },
  display3: {
    fontSize: '1rem',
    color: colors.text,
  },
  display4: {
    fontSize: '1.4rem',
    color: colors.text,
    fontWeight: 800,
  },
};
// setup basic theme and any overrides that are
// needed here
const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.background,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
      label: {
        ...typography.display3,
      },
    },
    MuiInputLabel: {
      root: {
        color: colors.fadedText,
      },
    },
    MuiToolbar: {
      gutters: {},
    },
    MuiCard: {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
      },
    },
    MuiSelect: {
      root: {
        height: '1.1em',
      },
      select: {
        paddingRight: '0.2em',
      },
      selectMenu: {
        ...typography.display2,
      },
      icon: {
        color: colors.orange,
        fontSize: '22px',
        top: 'auto',
        bottom: '-0.35em',
        right: '-0.5em',
        transform: 'rotate(-45deg)',
      },
    },
    MuiInput: {
      input: {
        padding: 0,
        ...typography.display2,
      },
    },
    MuiIconButton: {
      root: {
        width: 'auto',
        height: 'auto',
        '&:hover': {
          backgroundColor: 'none',
        },
      },
    },
    MuiMenuItem: {
      root: {
        backgroundColor: colors.cardHeader,
        ...typography.display2,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: colors.cardHeader,
      },
    },
  },
  props: {
    MuiFormControl: {
      disableUnderline: true,
      fullWidth: true,
      margin: 'dense',
    },
    MuiInput: {
      disableUnderline: true,
      fullWidth: true,
    },
    MuiInputLabel: {
      focused: false,
      shrink: true,
    },
    MuiSelect: {
      disableUnderline: true,
      fullWidth: false,
    },
  },
  typography,
  colors,
});

export const CalcoolaTheme = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>{props.children}</CssBaseline>
  </MuiThemeProvider>
);

export default CalcoolaTheme;
