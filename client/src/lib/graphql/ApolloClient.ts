import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { RetryLink } from "@apollo/client/link/retry";

//Apollo client will send all requests to the GraphqlServer
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_API}/graphql`,
  credentials: "same-origin",  // include cookies with every request to  the api
});

async function getCookieData(): Promise<ReadonlyRequestCookies> {
  const cookieStore = cookies()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieStore)
    }, 1000)
  )
}
 


const authLink =  setContext(async (_, { headers}) => {
  const cookieStore = await getCookieData()
  // const cookieStore = await cookies()
  const token =  cookieStore.get('jwt')?.value
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""
     }
  }
})

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

const authHttpLink = authLink.concat(httpLink)
const link = retryLink.concat(authHttpLink);

// allows using this client directly in our components to fetch data
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
      fragments: createFragmentRegistry(gql`
      fragment Status on Message {
         status
        }
      `)
    }),
    link: link
  });
});

