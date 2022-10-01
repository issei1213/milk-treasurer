import type { FC, ReactNode } from 'react'
import { memo, forwardRef } from 'react'
import {
  Box,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material'
import { useTheme } from '@mui/material'
import { red } from '@mui/material/colors'

type InputWithLabel = OutlinedInputProps & {
  errormessage?: string
  children?: ReactNode
}
type InputErrorMessage = {
  children: ReactNode
}

const LabelBadge: FC = memo(() => {
  const theme = useTheme()

  return (
    <Box
      component="div"
      padding="4px 8px"
      fontWeight="bold"
      fontSize="12px"
      bgcolor={red[500]}
      color={theme.palette.common.white}
      lineHeight="100%"
      borderRadius="4px"
    >
      必須
    </Box>
  )
})

const InputErrorMessage: FC<InputErrorMessage> = ({ children }) => {
  return (
    <Box
      component="span"
      fontSize="16px"
      lineHeight="1.5"
      letterSpacing="0.05"
      fontWeight="bold"
      color={red[700]}
    >
      {children}
    </Box>
  )
}

export const InputWithLabel = memo(
  forwardRef<HTMLInputElement, InputWithLabel>((props, ref) => {
    return (
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        maxWidth="311px"
        width="100%"
      >
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="8px"
          marginBottom="8px"
        >
          <InputLabel htmlFor={props.id}>{props.title}</InputLabel>
          {props.required && <LabelBadge />}
        </Box>
        <OutlinedInput {...props} required={false} ref={ref} />
        {props.errormessage && (
          <InputErrorMessage>{props.errormessage}</InputErrorMessage>
        )}
        {props.children}
      </Box>
    )
  }),
)

LabelBadge.displayName = 'LabelBadge'
InputWithLabel.displayName = 'InputWithLabel'
