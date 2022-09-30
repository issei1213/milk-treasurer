import { createTheme } from '@mui/material'
import {
  MuiButton,
  MuiInputLabel,
  MuiOutlinedInput,
  MuiTypography,
} from './components'
import { blue, grey, red } from '@mui/material/colors'

export const theme = createTheme({
  components: {
    MuiButton,
    MuiInputLabel,
    MuiTypography,
    MuiOutlinedInput,
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
  palette: {
    background: {
      default: grey[50],
    },
  },
})
