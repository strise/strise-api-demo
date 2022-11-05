import React from 'react'
import { useClient } from './utils/client'
import { ApolloProvider } from '@apollo/client'
import { Layout } from 'antd'
import { useLocalStorageState } from './utils/hooks'
import { Logo } from './components/Logo'
import { Api } from './components/Api'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import { Companies } from './pages/Companies'
import { Users } from './pages/Users'
import { AppContext } from './components/AppContext'
import { SettingsDrawer } from './components/SettingsDrawer'
import { Navigation } from './components/Navigation'
import { Subscription } from './pages/Subscription'
import { useDecodeToken } from './utils/authenticationUtils'

const Menu = () => {
  return (
    <div style={{ display: 'flex', paddingRight: 12, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Logo />
        <h3 style={{ margin: '0 8px' }}>API Demo</h3>
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
  const decodedToken = useDecodeToken()
  const now = new Date().getTime() / 1000

  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      {!decodedToken ? (
        <>
          Missing token ... Go to settings and paste in a valid one
        </>
      ) : (decodedToken.exp < now) ? (
        <>
          Expired token ... Go to settings and paste in a valid one
        </>
      ) : (
        <Routes>
          <Route path='/graphql-subscriptions-example/events' element={<Subscription />} />
          <Route path='/graphql-subscriptions-example/users' element={<Users />} />
          <Route path='/graphql-subscriptions-example/companies' element={<Companies />} />
          <Route path='*' element={<Navigate to='/graphql-subscriptions-example/events' replace />} />
        </Routes>
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
        <BrowserRouter>
          <Menu />
          <Content />
        </BrowserRouter>
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export default App
