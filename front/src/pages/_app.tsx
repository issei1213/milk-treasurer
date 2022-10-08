import { FC, useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Router, useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { removeLocalStorage} from "~/utils/localstorage";
import { app } from '~/libs/firebase'
import { theme } from '~/theme'
import { useApollo } from '~/libs/apolloClient'

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
  }, [auth, push])

  return null
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const cache = new InMemoryCache()

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthInit router={router} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
