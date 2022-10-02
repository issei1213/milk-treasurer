import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import { ButtonProps as MuiButtonProps, Box } from '@mui/material'
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

type StartIconWithLoadingProps = {
  loading: boolean
  size?: 'small' | 'medium' | 'large'
  color?: 'primary'
  icon?: ReactNode
}

// FIX: 今後使うかもしれないので、一旦保留
// const getNumberSize = (size: 'large' | 'medium' | 'small'): number => {
//   switch (size) {
//     case 'large':
//       return 24
//     case 'medium':
//       return 0
//     case 'small':
//       return 1
//   }
// }

const ButtonLoadingIcon: FC<ButtonLoadingIconProps> = (props) => {
  const theme = useTheme()

  const size = props.size === 'large' ? 24 : 0
  const color = props.color === 'primary' ? theme.palette.common.white : ''

  return <CircularProgress size={size} sx={{ color }} />
}

const StartIconWithLoading: FC<StartIconWithLoadingProps> = ({
  size,
  color,
  icon,
  loading,
}) => {
  return (
    <Box display="flex" gap={1}>
      {loading && <ButtonLoadingIcon size={size} color={color} />}
      {icon && icon}
    </Box>
  )
}

export const Button: FC<ButtonProps> = memo(
  ({ children, loading = false, ...rest }) => {
    if (loading) {
      return (
        <MuiButton
          {...rest}
          startIcon={
            <StartIconWithLoading
              loading={loading}
              size={rest.size}
              color={rest.color}
              icon={rest.startIcon}
            />
          }
        >
          {children}
        </MuiButton>
      )
    }

    return <MuiButton {...rest}>{children}</MuiButton>
  },
)

Button.displayName = 'Button'
