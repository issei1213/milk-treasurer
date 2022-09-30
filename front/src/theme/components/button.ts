import type { Components } from '@mui/material'
import { blue } from '@mui/material/colors'

export const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    // primary
    containedPrimary: ({ theme }) => {
      // const theme = params.theme.common.white as Record<string, string>

      return {
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
          color: theme.palette.common.white,
        },
      }
    },
  },
  variants: [
    // size
    {
      props: { size: 'large' },
      style: {
        borderRadius: '28px',
        width: '280px',
        height: '56px',
        padding: '16px 24px',
        letterSpacing: '0.1rem',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
  ],
}
