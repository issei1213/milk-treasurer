import { blue, grey } from '@mui/material/colors'
import type { Components } from '@mui/material'

export const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    // primary
    containedPrimary: ({ theme }) => ({
      background: blue[500],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      color: theme.palette.common.white,
      '&:disabled': {
        opacity: 0.5,
        background: blue[500],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        color: theme.palette.common.white,
      },
      '&:focus': {
        background: blue[600],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // color: theme.palette.common.white,
      },
    }),
    outlinedPrimary: () => ({
      color: grey['A700'],
      '&:hover': {
        background: blue[200],
      },
    }),
  },
  variants: [
    // size
    {
      props: { size: 'large' },
      style: {
        borderRadius: '28px',
        minWidth: '280px',
        height: '56px',
        padding: '16px 24px',
        letterSpacing: '0.1rem',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    {
      props: { size: 'small' },
      style: {
        boxSizing: 'border-box',
        borderRadius: '19px',
        minWidth: '98px',
        width: 'max-content',
        height: '38px',
        padding: '16px 16px',
        letterSpacing: '0.1rem',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
  ],
}
