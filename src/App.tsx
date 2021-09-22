import React, { useContext } from 'react'
import { useClient } from './utils/client'
import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { useLocalStorageState } from './utils/hooks'
import { Logo } from './components/Logo'
import { Api } from './components/Api'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Companies } from './pages/Companies'
import jwt from 'jsonwebtoken'
import { Users } from './pages/Users'
import { AppContext } from './components/AppContext'
import { SettingsDrawer } from './components/SettingsDrawer'
import { Navigation } from './components/Navigation'
import { Subscription } from './pages/Subscription'

const Menu = () => {
  return (
    <div style={{ display: 'flex', paddingRight: 12, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Logo />
        <h3 style={{ margin: '0 8px' }}>GraphQL Process API Example</h3>
      </div>
      <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Navigation />
        <div>
          <SettingsDrawer />
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  const { token } = useContext(AppContext)

  const decodedToken = jwt.decode(token)
  const now = new Date().getTime() / 1000
  const expiresAt = (typeof decodedToken === 'object' && decodedToken && 'exp' in decodedToken && decodedToken['exp']) as number

  return (
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
            <Route path='/graphql-subscriptions-example/users' component={Users} />
            <Route path='/graphql-subscriptions-example/companies' component={Companies} />
            <Route path='/graphql-subscriptions-example/events' component={Subscription} />
            <Redirect to='/graphql-subscriptions-example/events' from='*' />
          </Switch>
        )}
    </Layout.Content>
  )
}

const App = () => {
  const [api, setApi] = useLocalStorageState<Api>('api', Api.PROD)
  const [teamId, setTeamId] = useLocalStorageState<string>('teamId', '')
  const [token, setToken] = useLocalStorageState<string>('token̈́', '')
  const client = useClient(api, token)

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ api, setApi, teamId, setTeamId, token, setToken }}>
        <Router>
          <Menu />
          <Content />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export default App
