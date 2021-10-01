
import Header from './components/Header/Header';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createTheme } from '@material-ui/core/styles';
const App = () => {
  return (
    <MuiThemeProvider  theme={theme}><Header /></MuiThemeProvider >
    
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#e9c46a'
    },
    secondary: {
      main: '#2a9d8f'
    }
  }
});

export default App;
