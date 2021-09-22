import React from 'react'
import { Api } from './Api'

interface AppContextInterface {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  teamId: string
  setTeamId: React.Dispatch<React.SetStateAction<string>>
  api: Api
  setApi: React.Dispatch<React.SetStateAction<Api>>
}

export const AppContext = React.createContext({} as any as AppContextInterface)
