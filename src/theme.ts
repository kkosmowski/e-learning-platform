import { createTheme, ThemeOptions } from '@mui/material';
import colors, { text } from 'colors';

export const consts = {
  navbarHeight: 64,
  menuWidth: 300,
  containerPadding: 16,
};

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 4,
          paddingBottom: 4,
        },
        contained: {
          boxShadow: 'none',
        },
        sizeSmall: {
          minWidth: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 6,
          paddingRIght: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          ':last-child': {
            padding: 16,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // backgroundColor: 'rgb(86 98 164 / 84%)',
          lineHeight: 1.44,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: {
      fontSize: 18,
      fontWeight: 400,
    },
    h2: {
      fontSize: 22,
      fontWeight: 700,
    },
    h3: {
      fontSize: 18,
      fontWeight: 400,
    },
    body1: {
      color: colors.text.primary,
    },
    body2: {
      color: text[1000],
    },
  },
  palette: {
    background: colors.background,
    error: colors.error,
    info: colors.info,
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    text: colors.text,
    warning: colors.warning,
  },
};

const theme = createTheme(baseThemeOptions);

export default theme;
