// INFO: https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, from,  NormalizedCacheObject, } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import type { AppProps } from 'next/app'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
        'authorization': typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
    }
})

function createApolloClient() {
    return new ApolloClient({
        // SSR時のみTrue
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        allPosts: concatPagination(),
                    },
                },
            },
        }),
        connectToDevTools: true
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    // addApolloState で保存した内容を現在の Apollo Client のキャッシュに復元している
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        })

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data)
    }

    // NOTE: For SSG and SSR always create a new Apollo Client
    //  バックエンド側で実行される際は、毎回createApolloClient()が代入された変数_apolloClientが適用される
    if (typeof window === 'undefined') return _apolloClient

    // NOTE: Create the Apollo Client once in the client
    //  フロント側で実行される際は、最初の一回だけ実行される。二回目の処理はapolloClientに値が入っている為、ここではFalseになる
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

// NOTE: getStaciPropsが呼び出す関数
// 現在のApolloClientのキャッシュ内容をpropsの適用なキーに保存している。この値は後ほど、_app.jsで
// useApolloをよびだす際にpagePropsとして渡される（Server側とClient側の両方で使われる）
export function addApolloState(client, pageProps: AppProps['pageProps']) {
    // @ts-ignore
    if (pageProps?.props) {
        // @ts-ignore
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
}

// NOTE: _app.js が呼び出していたHook。パラメータとして getStaticProps の結果（PageProps）を受け取る。
// pageProps から addApolloState で保存したキャッシュ内容を取り出した後、initializeApollo に渡してる。
// initializeApollo から返された Apollo Client については、単純に _app.js 側に返すだけ
export function useApollo(pageProps: AppProps['pageProps']) {
    // @ts-ignore
    const state = pageProps[APOLLO_STATE_PROP_NAME]
    const store = useMemo(() => initializeApollo(state), [state])
    return store
}
