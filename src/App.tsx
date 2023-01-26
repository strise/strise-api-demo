import React from 'react'
import { useClient } from './utils/client'
import { ApolloProvider } from '@apollo/client'
import { useLocalStorageState } from './utils/hooks'
import { Logo } from './components/Logo'
import { Api } from './components/Api'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Companies } from './pages/Companies'
import { Users } from './pages/Users'
import { AppContext } from './components/AppContext'
import { SettingsDrawer } from './components/SettingsDrawer'
import { Navigation } from './components/Navigation'
import { Subscription } from './pages/Subscription'
import { useDecodeToken } from './utils/authenticationUtils'
import { Layout } from 'antd'

const Menu = (): React.ReactElement => {
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

const Content = (): React.ReactElement => {
  const decodedToken = useDecodeToken()
  const now = new Date().getTime() / 1000

  if (!decodedToken) return <>Missing token ... Go to settings and paste in a valid one</>

  if (decodedToken.exp < now) return <>Expired token ... Go to settings and paste in a valid one</>

  return (
    <Routes>
      <Route path='/events' element={<Subscription />} />
      <Route path='/users' element={<Users />} />
      <Route path='/companies' element={<Companies />} />
      <Route path='*' element={<Navigate to='/events' replace />} />
    </Routes>
  )
}

const App = (): React.ReactElement => {
  const [api, setApi] = useLocalStorageState<Api>('api', Api.PROD)
  const [teamId, setTeamId] = useLocalStorageState<string>('teamId', '')
  const [token, setToken] = useLocalStorageState<string>('token̈́', '')
  const client = useClient(api, token)

  const values = React.useMemo(
    () => ({
      api,
      setApi,
      teamId,
      setTeamId,
      token,
      setToken
    }),
    [api, setApi, teamId, setTeamId, token, setToken]
  )

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={values}>
        <BrowserRouter>
          <Menu />
          <Layout.Content style={{ padding: '0 50px' }}>
            <Content />
          </Layout.Content>
        </BrowserRouter>
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export default App
