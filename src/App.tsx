import React from 'react'
import { useClient } from './utils/client'
import { ApolloProvider, useApolloClient, useMutation } from '@apollo/client'
import 'antd/dist/antd.css'
import { Button, Input, Layout, PageHeader, Checkbox, Drawer, Menu } from 'antd'
import { useLocalStorageState } from './utils/hooks'
import { CompanyEventsTable } from './components/CompanyEventsTable'
import { loader } from 'graphql.macro'
import { CompanyEventFragment, CompanyEventSubscription } from './types/graphql'
import { Teams } from './components/Team'
import { Logo } from './components/Logo'
import { Api, ApiSelect } from './components/Api'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import { Companies } from './Companies'
import jwt from 'jsonwebtoken'
import { Users } from './Users'

const COMPANY_EVENT = loader('./graphql/companyEvent.graphql')
const PUBLISH = loader('./graphql/publish.graphql')

const Publish = ({ teamId }: { teamId: string }) => {
  const [publish, { loading }] = useMutation(PUBLISH, { variables: { team: teamId } })
  return (
    <Button onClick={() => publish()} loading={loading}>
      Publish
    </Button>
  )
}

interface AppContextInterface {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  teamId: string
  setTeamId: React.Dispatch<React.SetStateAction<string>>
  api: Api
  setApi: React.Dispatch<React.SetStateAction<Api>>
}
export const AppContext = React.createContext({} as any as AppContextInterface)

const Subscription = () => {
  const client = useApolloClient()
  const { teamId, api } = React.useContext(AppContext)
  const [subscription, setSubscription] = React.useState<ZenObservable.Subscription | null>(null)
  const [events, setEvents] = React.useState<CompanyEventFragment[]>([])

  const [dryRun, setDryRun] = React.useState<boolean>(false)
  const onDryRunChange = React.useCallback((e: CheckboxChangeEvent) => setDryRun(e.target.checked), [setDryRun])

  const start = React.useCallback(() => {
    console.log('Start!', teamId)

    const subscription = client
      .subscribe<CompanyEventSubscription>({ query: COMPANY_EVENT, variables: teamId ? { team: teamId, dryRun: false } : undefined })
      .subscribe((response) => {
        const event = response.data?.companyEvent
        if (!event) return
        console.info('Received event', event.id)
        setEvents((prevEvents) => [{ ...event, key: event.id + event.createdAt }, ...prevEvents])
      })

    setSubscription(subscription)
  }, [client, teamId])

  const stop = React.useCallback(() => {
    console.log('Stop!', teamId)
    if (subscription) subscription.unsubscribe()
    setSubscription(null)
  }, [subscription, teamId])

  const clear = React.useCallback(() => setEvents([]), [])
  return (
    <>
      <div style={{display: 'flex', marginBottom: '1em'}}>
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
        {api !== Api.PROD && (
          <div style={{marginLeft: '1em'}}>
            <Publish teamId={teamId} />
          </div>
        )}
        <div style={{marginLeft: '1em'}}>
          <Checkbox value={dryRun} onChange={onDryRunChange}>
            Dry run
          </Checkbox>
        </div>
      </div>
      <CompanyEventsTable events={events} />
    </>
  )
}

const SettingsDrawer = () => {
  const { api, setApi, teamId, setTeamId, token, setToken } = React.useContext(AppContext)
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button type='primary' onClick={onOpen}>
        Settings
      </Button>
      <Drawer title='Settings' placement='right' closable={false} onClose={onClose} visible={open}>
        <div style={{ flexGrow: 1 }}>
          Access token
          <Input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div style={{ flexGrow: 1 }}>
          API
          <ApiSelect api={api} setApi={setApi} />
        </div>
        <Teams teamId={teamId} setTeamId={setTeamId} />
      </Drawer>
    </>
  )
}

const AppMenu = () => {
  const location = useLocation()
  return (
    <Menu selectedKeys={[location.pathname]} mode='horizontal' style={{marginLeft: '1em'}}>
      <Menu.Item key='/'>
        <Link to='/'>
          Events
        </Link>
      </Menu.Item>
      <Menu.Item key='/companies'>
        <Link to='/companies'>
          Companies
        </Link>
      </Menu.Item>
      <Menu.Item key='/users'>
        <Link to='/users'>
          Users
        </Link>
      </Menu.Item>
    </Menu>
  )
}

const App = () => {
  const [api, setApi] = useLocalStorageState<Api>('api', Api.PROD)
  const [teamId, setTeamId] = useLocalStorageState<string>('teamId', '')
  const [token, setToken] = useLocalStorageState<string>('token̈́', '')
  const client = useClient(api, token)

  const decodedToken = jwt.decode(token)
  const now = new Date().getTime() / 1000
  const expiresAt = (typeof decodedToken === 'object' && decodedToken && 'exp' in decodedToken && decodedToken['exp']) as number

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{api, setApi, teamId, setTeamId, token, setToken}}>
        <Router>
          <PageHeader
            className="site-page-header"
            title={(
              <div style={{ display: 'flex', width: '95vw' }}>
                <Logo />
                <div style={{ marginLeft: '1em ', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                  GraphQL Process API Example
                  <AppMenu />
                </div>
                <div>
                  <SettingsDrawer />
                </div>
              </div>
            )}
          />
          <Layout.Content style={{ padding: '0 50px' }}>
            {!decodedToken ? (
              <>
                Missing token ... Go to settings and paste in a valid one
              </>
            ) : (expiresAt < now) ?
              (
                <>
                  Expired token ... Go to settings and paste in a valid one
                </>
              ) : (
                <Switch>
                  <Route path='/users' component={Users} />
                  <Route path='/companies' component={Companies} />
                  <Route path='/' component={Subscription} />
                </Switch>
              )}
          </Layout.Content>
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export default App
