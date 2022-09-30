import { createTheme } from '@mui/material'

import { MuiButton, MuiTypography } from './components'

export const theme = createTheme({
  components: {
    MuiTypography,
    MuiButton,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 428,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'BIZ UDPGothic, sans-serif',
  },
})
