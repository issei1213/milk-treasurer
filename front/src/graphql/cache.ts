import { makeVar, Operation } from '@apollo/client'
import { GraphQLErrors, NetworkError } from '@apollo/client/errors'
import { AlertColor } from '@mui/material'

type ToastState = {
  isOpen: boolean
  type?: AlertColor
  message: string
}

export const apiGraphQLErrorsVar = makeVar<GraphQLErrors>([])
export const apiNetworkErrorVar = makeVar<NetworkError>(null)
export const apiOperationVar = makeVar<Operation | null>(null)
export const toastStateVar = makeVar<ToastState>({
  isOpen: false,
  type: 'error',
  message: '',
})
