import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h5: {
      fontSize: '1.5rem', // Размер шрифта по умолчанию для h5
      '@media (max-width:600px)': {
        fontSize: '1rem', // Размер шрифта для экранов меньше 600px
      },
    },
    body1: {
      fontSize: '1rem', // Размер шрифта по умолчанию для h5
      '@media (max-width:600px)': {
        fontSize: '0.8rem', // Размер шрифта для экранов меньше 600px
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // Основной цвет
    },
    secondary: {
      main: '#dc004e', // Вторичный цвет
    },
  },
});

export default theme;