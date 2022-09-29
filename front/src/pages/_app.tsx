import '../styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    uri: 'http://localhost:5001/milk-treasurer/us-central1/graphql',
    connectToDevTools: true,
    cache,
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
