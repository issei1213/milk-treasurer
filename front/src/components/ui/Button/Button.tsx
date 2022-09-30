import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import { ButtonProps as MuiButtonProps } from '@mui/material'
import { Button as MuiButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'

type ButtonProps = MuiButtonProps & {
  color: 'primary'
  loading?: boolean
  children: ReactNode
}

type ButtonLoadingIconProps = {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary'
}

const ButtonLoadingIcon: FC<ButtonLoadingIconProps> = (props) => {
  const theme = useTheme()

  const size = props.size === 'large' ? 24 : 0
  const color = props.color === 'primary' ? theme.palette.common.white : ''

  return <CircularProgress size={size} sx={{ color }} />
}

export const Button: FC<ButtonProps> = memo(
  ({ children, loading = false, ...rest }) => {
    if (loading) {
      const size = rest.size === 'large' ? 24 : 0

      return (
        <MuiButton
          {...rest}
          startIcon={<ButtonLoadingIcon size={rest.size} color={rest.color} />}
        >
          {children}
        </MuiButton>
      )
    }

    return <MuiButton {...rest}>{children}</MuiButton>
  },
)

Button.displayName = 'Button'
