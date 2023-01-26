import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import React from 'react'
import type { Api } from '../components/Api'

export const useClient = (api: Api, token: string): ApolloClient<object> => {
  return React.useMemo(() => {
    const sClient = new SubscriptionClient(api, {
      reconnect: true,

      connectionParams: {
        Authorization: `Bearer ${token}`
      }
    })
    const link = new WebSocketLink(sClient)
    const cache = new InMemoryCache()
    return new ApolloClient({
      link,
      cache
    })
  }, [api, token])
}
