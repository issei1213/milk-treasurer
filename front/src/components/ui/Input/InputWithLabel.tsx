import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import {
  Box,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material'
import { useTheme } from '@mui/material'
import { red } from '@mui/material/colors'

type InputWithLabel = OutlinedInputProps
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

export const InputWithLabel: FC<InputWithLabel> = memo((props) => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      gap="8px"
      maxWidth="311px"
      width="100%"
    >
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="8px"
      >
        <InputLabel htmlFor={props.id}>{props.title}</InputLabel>
        {props.required && <LabelBadge />}
      </Box>
      <OutlinedInput {...props} />
      {props.error && <InputErrorMessage>エラーが起きました</InputErrorMessage>}
    </Box>
  )
})

LabelBadge.displayName = 'LabelBadge'
InputWithLabel.displayName = 'InputWithLabel'
