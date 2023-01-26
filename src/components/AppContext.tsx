import React from 'react'
import type { Api } from './Api'

interface AppContextInterface {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  teamId: string
  setTeamId: React.Dispatch<React.SetStateAction<string>>
  api: Api
  setApi: React.Dispatch<React.SetStateAction<Api>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = React.createContext({} as AppContextInterface)
