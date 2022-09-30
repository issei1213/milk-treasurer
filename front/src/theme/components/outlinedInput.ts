import type { Components } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

export const MuiOutlinedInput: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      boxSizing: 'border-box',
    },
    input: {
      padding: '12px 16px',
      border: `1px solid ${grey[400]}`,
      fontSize: '16px',
      letterSpacing: '0.05rem',
      borderRadius: '4px',

      '&.Mui-focused': {
        border: `2px solid ${blue[500]}`,
      },
    },

    adornedEnd: {
      border: 'none',
    },
  },
}
