import CssBaseline from 'material-ui/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import './app.css';

export const colors = {
  darkGray: '#4F6374',
  gunmetal: '#1C2938',
  gunmetalGradient:
    'linear-gradient(180deg, #1e2529 0%, #1C2938 50%, #1C2938 100%)',
  lightGray: '#D5DBD8',
  midnightBlue: '#212E3D',
  navyBlue: '#314352',
  orange: '#A53C25',
  steelBlue: '#5C7488',
  steelTeal: 'rgba(26, 60, 71, 0.5)',
  stormcloud: '#1C444D',
  white: 'white',
  gray: 'rgba(0, 0, 0, 0.2)',
};

const palette = {
  primary: {
    main: colors.navyBlue,
    contrastText: colors.lightGray,
  },
  secondary: {
    main: colors.lightGray,
    contrastText: colors.navyBlue,
  },
  background: {
    default: colors.gunmetal,
    gradient: colors.gunmetalGradient,
  },
  navbar: {
    background: colors.midnightBlue,
    border: colors.navyBlue,
  },
  card: {
    background: colors.steelTeal,
    header: colors.navyBlue,
  },
  link: {
    active: colors.navyBlue,
    hover: colors.steelTeal,
  },
  tag: {
    background: colors.stormcloud,
    highlight: colors.steelBlue,
  },
  text: {
    primary: colors.lightGray,
    faded: colors.darkGray,
    disabled: colors.steelBlue,
  },
  select: {
    icon: colors.orange,
  },
  notification: {
    background: colors.stormcloud,
    error: {
      background: colors.orange,
    },
  },
  dropdownMenu: {
    shadow: colors.gray,
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
  display5: {
    fontSize: '7rem',
    fontWeight: 800,
    color: palette.text.primary,
  },
};

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
      root: {
        ...typography.display2,
      },
      input: {
        padding: 0,
      },
      disabled: { color: palette.text.disabled },
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
    MuiListItemIcon: {
      root: {
        color: 'inherit',
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
    MuiSnackbar: {
      root: {
        maxWidth: 640,
      },
    },
    MuiSvgIcon: {
      root: {
        color: palette.text.primary,
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
    MuiSnackbar: {
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
      autoHideDuration: 5000,
    },
  },
});

export const CalcoolaTheme = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>{props.children}</CssBaseline>
  </MuiThemeProvider>
);

export default CalcoolaTheme;
