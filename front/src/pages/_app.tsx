import { FC, useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Router, useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { app } from '~/libs/firebase'
import { theme } from '~/theme'

type AuthInitProps = {
  router: Router
}

const AuthInit: FC<AuthInitProps> = () => {
  const auth = getAuth(app)
  const { push } = useRouter()

  useEffect(() => {
    const authChanged = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await push({
          pathname: '/teams',
        })
      } else {
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
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    connectToDevTools: true,
    cache,
  })

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthInit router={router} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
