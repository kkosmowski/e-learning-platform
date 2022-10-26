export const primary = {
  50: '#fefeff',
  100: '#c6cbeb',
  200: '#9ca6dd',
  300: '#6776ca',
  400: '#5062c2',
  500: '#3f51b5',
  600: '#37479e',
  700: '#2f3d88',
  800: '#273371',
  900: '#1f285a',
};

export const secondary = {
  50: '#ffffff',
  100: '#f1f3f4',
  200: '#d2d7dc',
  300: '#aab3bc',
  400: '#99a4ae',
  500: '#8895a1',
  600: '#778693',
  700: '#687684',
  800: '#5b6773',
  900: '#4d5862',
};

export const success = {
  50: '#eaf5ea',
  100: '#c9e7cb',
  200: '#a6d7a8',
  300: '#82c785',
  400: '#67bb6a',
  500: '#4caf50',
  600: '#45a849',
  700: '#3c9f40',
  800: '#339637',
  900: '#248627',
};

export const info = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
};

export const warning = {
  50: '#ffffff',
  100: '#ffe4bd',
  200: '#ffce85',
  300: '#ffb13d',
  400: '#ffa41f',
  500: '#ff9800',
  600: '#e08600',
  700: '#c27400',
  800: '#a36100',
  900: '#854f00',
};

export const error = {
  50: '#f9e9e8',
  100: '#efc7c5',
  200: '#e5a29e',
  300: '#da7d77',
  400: '#d26159',
  500: '#ca453c',
  600: '#c53e36',
  700: '#bd362e',
  800: '#b72e27',
  900: '#ab1f1a',
};

export const background = {
  50: '#fff',
  100: '#fafafa',
  200: '#f4f4f4',
  300: '#ececec',
  400: '#e4e4e4',
  500: '#dfdfdf',
  600: '#d9d9d9',
  700: '#d5d5d5',
  800: '#cfcfcf',
  900: '#cacaca',
};

export const text = {
  50: '#000',
  100: '#0f0f0f',
  200: '#161616',
  300: '#1f1f1f',
  400: '#323232',
  500: '#424242',
  600: '#585858',
  700: '#686868',
  800: '#747474',
  900: '#848484',
  1000: '#fff',
};

const colors = {
  background: {
    default: background[50],
  },
  error,
  info,
  mode: 'light',
  primary,
  secondary: {
    main: secondary[500],
    contrastText: text[1000],
  },
  success,
  text: {
    primary: text[300],
    secondary: text[800],
    disabled: text[900],
    success: success[600],
    warning: warning[600],
    error: error[600],
  },
  warning,
};

export const unpublishedNoticeColor = '#fff1d6';

export default colors;
