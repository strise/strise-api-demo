import { ApolloClient, InMemoryCache } from '@apollo/client'
import React from 'react'
import { Api } from '../components/Api'

import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client'
import { print, GraphQLError } from 'graphql'
import { createClient, ClientOptions, Client } from 'graphql-ws'

class WebSocketLink extends ApolloLink {
  private client: Client

  constructor(options: ClientOptions) {
    super()
    this.client = createClient(options)
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              sink.error(err)
            } else if (err instanceof CloseEvent) {
              sink.error(
                new Error(
                  `Socket closed with event ${err.code}` + err.reason
                    ? `: ${err.reason}` // reason will be available on clean closes
                    : '',
                ),
              )
            } else {
              sink.error(
                new Error(
                  (err as GraphQLError[])
                    .map(({ message }) => message)
                    .join(', '),
                ),
              )
            }
          },
        },
      )
    })
  }
}

export const useClient = (api: Api, token: string) => {
  return React.useMemo(() => {
    const cache = new InMemoryCache()
    return new ApolloClient({
      link: new WebSocketLink({
        url: api,
        connectionParams: {
          Authorization: `Bearer ${token}`
        }
      }),
      cache
    })
  }, [api, token])
}
