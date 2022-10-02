import type { Components } from '@mui/material'

export const MuiTypography: Components['MuiTypography'] = {
  variants: [
    {
      props: { variant: 'h4' },
      style: {
        fontWeight: 'bold',
        letterSpacing: '0.1em',
      },
    },
    {
      props: { variant: 'h5' },
      style: {
        fontWeight: 'bold',
        letterSpacing: '0.1em',
      },
    },
    {
      props: { variant: 'h6' },
      style: {
        fontWeight: 'bold',
        letterSpacing: '0.1em',
      },
    },
  ],
}
