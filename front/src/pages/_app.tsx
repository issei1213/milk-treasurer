import { FC, useEffect, useState } from 'react'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Router, useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { Toast } from '~/components/ui/Toast'
import {
  apiGraphQLErrorsVar,
  apiNetworkErrorVar,
  apiOperationVar,
  toastStateVar,
} from '~/graphql/cache'
import { useApollo } from '~/libs/apolloClient'
import { app } from '~/libs/firebase'
import { theme } from '~/theme'
import { removeLocalStorage } from '~/utils/localstorage'

type AuthInitProps = {
  router: Router
}

const AuthInit: FC<AuthInitProps> = () => {
  const auth = getAuth(app)
  const { push } = useRouter()

  useEffect(() => {
    const authChanged = onAuthStateChanged(auth, async (user) => {
      // ログインしていない場合は、ログイン画面へ遷移
      if (!user) {
        await removeLocalStorage('token')
        await push({
          pathname: '/login',
        })
      }
    })

    return () => {
      authChanged()
    }
  }, [])

  return null
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false)
  const apolloClient = useApollo(pageProps)
  const apiErrors = useReactiveVar(apiGraphQLErrorsVar)
  const apiNetworkError = useReactiveVar(apiNetworkErrorVar)
  const apiOperation = useReactiveVar(apiOperationVar)
  const toastState = useReactiveVar(toastStateVar)

  const { push } = useRouter()

  useEffect(() => {
    if (apiErrors) {
      apiErrors.forEach(async (error) => {
        console.error(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
        )
        if (error.extensions.code === 'UNAUTHENTICATED') {
          await removeLocalStorage('token')
          await push({
            pathname: '/login',
          })

          toastStateVar({
            isOpen: true,
            message: '再度ログインしてください',
            type: 'error',
          })
        }

        apiGraphQLErrorsVar([])
        apiOperationVar(null)
      })
    }
    if (apiNetworkError) {
      toastStateVar({
        isOpen: true,
        message: 'サーバーからの応答がありません',
        type: 'error',
      })
      apiNetworkErrorVar(null)
    }

    setMounted(true)
  }, [apiErrors, apiNetworkError, apiOperation, push, router])

  const onCloseToast = () => {
    toastStateVar({
      isOpen: false,
      type: undefined,
      message: '',
    })
  }

  return (
    mounted && (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthInit router={router} />
          <Component {...pageProps} />
        </ThemeProvider>

        <Toast
          open={toastState.isOpen}
          onClose={onCloseToast}
          message={toastState.message}
          type={toastState.type}
        />
      </ApolloProvider>
    )
  )
}

export default MyApp
