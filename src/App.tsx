import React from 'react'
import { useClient } from './utils/client'
import { ApolloProvider, useMutation } from '@apollo/client'
import 'antd/dist/antd.css'
import { Button, Input, Layout, PageHeader, Checkbox } from 'antd'
import { useLocalStorageState } from './utils/hooks'
import { CompanyEventsTable } from './components/CompanyEventsTable'
import { loader } from 'graphql.macro'
import { CompanyEventFragment, CompanyEventSubscription } from './types/graphql'
import { Teams } from './components/Team'
import { removeKeyFromObject } from './utils/object'
import { Logo } from './components/Logo'
import { Api, ApiSelect } from './components/Api'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const COMPANY_EVENT = loader('./graphql/companyEvent.graphql')
const PUBLISH = loader('./graphql/publish.graphql')

const Publish = ({ teamId }: { teamId: string }) => {
  const [publish, { loading }] = useMutation(PUBLISH, { variables: { team: teamId } })
  return (
    <Button onClick={() => publish()} loading={loading}>
      Publish
    </Button>
  )
}

const App = () => {
  const [api, setApi] = useLocalStorageState<Api>('api', Api.PROD)
  const [teamId, setTeamId] = useLocalStorageState<string>('teamId', '')
  const [token, setToken] = useLocalStorageState<string>('token̈́', '')
  const client = useClient(api, token)
  const [subscription, setSubscription] = React.useState<ZenObservable.Subscription | null>(null)
  const [events, setEvents] = React.useState<CompanyEventFragment[]>([])

  const start = React.useCallback(() => {
    console.log('Start!', teamId)

    const subscription = client
      .subscribe<CompanyEventSubscription>({ query: COMPANY_EVENT, variables: teamId ? { team: teamId, dryRun: false } : undefined })
      .subscribe((response) => {
        const event = response.data?.companyEvent
        if (!event) return
        console.info('Received event', event.id)
        setEvents((prevEvents) => [{ ...event, key: event.id + event.created, meta: removeKeyFromObject('__typename', event.meta) }, ...prevEvents])
      })

    setSubscription(subscription)
  }, [client, teamId])

  const stop = React.useCallback(() => {
    console.log('Stop!', teamId)
    if (subscription) subscription.unsubscribe()
    setSubscription(null)
  }, [subscription, teamId])

  const clear = React.useCallback(() => setEvents([]), [])

  const [dryRun, setDryRun] = React.useState<boolean>(false)
  const onDryRunChange = React.useCallback((e: CheckboxChangeEvent) => setDryRun(e.target.checked), [setDryRun])

  return (
    <ApolloProvider client={client}>
      <PageHeader
        className="site-page-header"
        title={(
          <div style={{display: 'flex'}}>
            <Logo />
            <div style={{ marginLeft: '1em '}}>
              GraphQL Subscriptions Example
            </div>
          </div>
        )}
      />
      <Layout.Content style={{ padding: '0 50px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '750px' }}>
          <div style={{ flexGrow: 1 }}>
            Access token
            <Input value={token} onChange={(e) => setToken(e.target.value)} />
          </div>
          <div style={{ flexGrow: 1 }}>
            API
            <ApiSelect api={api} setApi={setApi} />
          </div>
          {api !== Api.PROD && (
            <div>
              <div>
                Publish
            </div>
              <Publish teamId={teamId} />
            </div>
          )}
          <div>
            <div>
              Dry run
            </div>
            <Checkbox value={dryRun} onChange={onDryRunChange} />
          </div>
        </div>
        <div style={{width: '750px'}}>
          <Teams teamId={teamId} setTeamId={setTeamId} />
        </div>
        <div style={{ marginTop: '1em', marginBottom: '1em' }}>
          {!subscription ? (
            <Button onClick={() => start()}>
              Start
            </Button>
          ) : (
            <Button onClick={() => stop()}>
              Stop
            </Button>
          )}
          <Button onClick={() => clear()}>
            Clear
          </Button>
        </div>
        <CompanyEventsTable events={events} />
      </Layout.Content>
    </ApolloProvider>
  )
}

export default App
