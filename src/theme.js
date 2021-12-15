import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#264653',
      dark: '#183541',
      light: '#6197aa',
    },
    secondary: {
      main: '#f4a261',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    warning: {
      main: '#e9c46a',
    },
    info: {
      main: '#2a9d8f',
    },
    error: {
      main: '#e76f51',
    },
    default: {
      light: '#F8F8F8'
    },
    text: {
      primary: '#232b2e',
      secondary: '#696F8C',
      light: '#fff',
      chip: {
        blue: '#2952CC',
        orange: '#85462B'
      }
    },
    chip: {
      blue: '#D6E0FF',
      orange: '#F8E3DA',
    }
  },
})
export default theme