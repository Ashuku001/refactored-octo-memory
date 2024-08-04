"use client";
import { ApolloLink, HttpLink,  gql, split, from} from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from "@apollo/client/utilities";
import { getCookie } from "cookies-next";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from '@apollo/client/link/context'
import { isLoggedInVar, merchantId } from "@/components/AuthGuard";
import { createFragmentRegistry } from "@apollo/client/cache";
import { RetryLink } from "@apollo/client/link/retry";


// client schema
const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        merchantId: Int!
    }

`

const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error,
    },
  });
  

// this client will be SSR-rendered for the initial request
export function makeClient() {

    //Apollo client will send all requests to the GraphqlServer
    const httpLink = new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_SERVER_API}/graphql`,
        credentials: "same-origin",  // include cookies with every request to  the api
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from loacl storate 
        const token = getCookie('jwt')
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    const authHttpLink = authLink.concat(httpLink)
    const link = retryLink.concat(authHttpLink);

    const wsLink = new GraphQLWsLink(createClient({
        url: `${process.env.NEXT_PUBLIC_WS_URL}/subscriptions`,
        // retryAttempts: Infinity,
        shouldRetry: () => true,
        keepAlive: 1000,
        connectionParams: () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                return {
                    Authorization: `Bearer ${token}`
                }
            }
            return {}
        },
    }))

    // and the link to use for an operation if the function returns a falsy valu
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,  // for subscriptions
        authHttpLink, // for queries and mutations
    );

    return new NextSSRApolloClient({
        connectToDevTools: true,
        // the caching that we use is Next specific not the normal inMemoryCache
        cache: new NextSSRInMemoryCache({
            addTypename: false,
            typePolicies: {
                Query: {
                    fields: {
                        isLoggedIn: {
                            read() {
                                return isLoggedInVar();
                            }
                        },
                        merchantId: {
                            read() {
                                return merchantId()
                            }
                        }
                    }
                }
            },
            fragments: createFragmentRegistry(gql`
            fragment Status on Message {
               status
              }
            `)
        }),

        // if on the server and if undefined
        link: typeof window === "undefined"
            ? ApolloLink.from([
                // onError(({graphQLErrors, networkError}) => {
                //     if(graphQLErrors) {
                //         graphQLErrors.map(({message, locations, path}) =>
                //             console.log(`[GRAPHQL ERROR]: message: ${message}, Locations, ${locations?.entries}, path: ${path}`)
                //         )
                //     }
                //     if (networkError) {
                //         console.log(`[Network error]: ${networkError}`);
                //     }
                // }),
                new SSRMultipartLink({
                    stripDefer: true,
                }),
                splitLink,
            ])
            : ApolloLink.from([
                // onError(({graphQLErrors, networkError}) => {
                //     if(graphQLErrors) {
                //         graphQLErrors.map(({message, locations, path}) =>
                //             console.log(`[GRAPHQL ERROR]: message: ${message}, Locations, ${locations![0]}, path: ${path}`)
                //         )
                //     }
                //     if (networkError) {
                //         console.log(`[Network error]: ${networkError}`);
                //     }
                // }),
                splitLink,
            ]),
        typeDefs,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        // make sure every page using this layour have access to the Apollo Client
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
} 