import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#151d3a',
    },
    secondary: {
      main: '#db9018',
    },
  },
  typography: {
    useNextVariants: true,
  }
});

export default theme;