import type { Components } from '@mui/material'

export const MuiInputLabel: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: 1.5,
      letterSpacing: '0.05rem',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      color: theme.palette.common.black,
    }),
  },
}
