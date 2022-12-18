import { createTheme, ThemeOptions } from '@mui/material';
import colors, { background, secondary, text } from 'colors';

export const consts = {
  navbarHeight: 64,
  menuWidth: 300,
  containerPadding: 16,
  centeredLayoutMaxWidth: 1000,
};

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            minHeight: 0,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#f4f4f4',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        contained: {
          boxShadow: 'none',
        },
        sizeSmall: {
          minWidth: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 6,
          paddingRight: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
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
    MuiGrid: {
      styleOverrides: {
        root: {
          '&.MuiGrid-container': {
            marginRight: '-8px',
            width: 'calc(100% + 16px)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        square: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        adornedStart: {
          gap: '14px',
          backgroundColor: background[200],
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        inputAdornedStart: {
          '&': { paddingLeft: '14px' },
          backgroundColor: background[50],
        },
        input: {
          '::-webkit-input-placeholder': {
            opacity: 0.7,
          },
        },
        root: {
          '&.Mui-disabled': {
            backgroundColor: background[200],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: secondary[700],
        },
        body: {
          fontSize: 16,
        },
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
      fontSize: 18,
      fontWeight: 500,
    },
    h3: {
      fontSize: 18,
      fontWeight: 400,
    },
    body2: {
      color: text[1000],
    },
  },
  palette: {
    background: colors.background,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    text: colors.text,
  },
};

const theme = createTheme(baseThemeOptions);

export default theme;
