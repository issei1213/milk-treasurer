import { FC, memo } from 'react'
import { Alert, AlertColor, Snackbar } from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  message: string
  type?: AlertColor
}

export const Toast: FC<Props> = memo(({ open, onClose, message, type }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      key={Math.random()}
      sx={{ maxWidth: '80%', width: '100%' }}
    >
      <Alert onClose={onClose} sx={{ width: '100%' }} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
})

Toast.displayName = 'Toast'
