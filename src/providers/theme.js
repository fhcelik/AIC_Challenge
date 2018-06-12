import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

export const colors = {
  darkGray: '#4F6374',
  gunmetal: '#1C2938',
  gunmetalGradient: 'linear-gradient(180deg, #263440 0%, #1C2938 100%)',
  lightGray: '#D5DBD8',
  midnightBlue: '#212E3D',
  navyBlue: '#314352',
  orange: '#A53C25',
  steelBlue: '#5C7488',
  steelTeal: 'rgba(26, 60, 71, 0.5)',
  stormcloud: '#1C444D',
  white: 'white',
};

const palette = {
  background: {
    default: colors.gunmetal,
    gradient: colors.gunmetalGradient,
  },
  header: {
    background: colors.midnightBlue,
  },
  card: {
    background: colors.steelTeal,
    header: colors.navyBlue,
  },
  tag: {
    background: colors.stormcloud,
    highlight: colors.steelBlue,
  },
  text: {
    primary: colors.lightGray,
    faded: colors.darkGray,
  },
  select: {
    icon: colors.orange,
  },
};

const typography = {
  fontFamily: 'oxygen mono',
  subheading: {
    fontSize: '0.7rem',
    color: palette.text.faded,
  },
  display1: {
    fontSize: '0.8rem',
    color: palette.text.primary,
  },
  display2: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: palette.text.primary,
  },
  display3: {
    fontSize: '1rem',
    color: palette.text.primary,
  },
  display4: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: palette.text.primary,
  },
};
// setup basic theme and any overrides that are
// needed here
const theme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiTypography: {
      root: {
        color: palette.text.primary,
      },
    },
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
        color: palette.text.faded,
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
        color: palette.select.icon,
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
        backgroundColor: palette.card.header,
        ...typography.display2,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: palette.card.header,
      },
    },
  },
  props: {
    MuiFormControl: {
      fullWidth: true,
      margin: 'dense',
    },
    MuiIconButton: {
      color: 'inherit',
    },
    MuiInput: {
      disableUnderline: true,
      fullWidth: true,
    },
    MuiInputLabel: {
      focused: false,
    },
    MuiSelect: {
      disableUnderline: true,
      fullWidth: false,
    },
  },
});

export const CalcoolaTheme = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>{props.children}</CssBaseline>
  </MuiThemeProvider>
);

export default CalcoolaTheme;
