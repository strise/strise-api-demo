import React from 'react'
import { Select } from 'antd'

export enum Api {
  LOCAL = 'ws://localhost:8080/process/graphql',
  STAGE = 'wss://stage.graphql.strise.ai/process/graphql',
  PROD = 'wss://graphql.strise.ai/process/graphql'
}

export const ApiSelect = ({ api, setApi }: { api: Api, setApi: React.Dispatch<React.SetStateAction<Api>> }) => {
  const onChange = React.useCallback((value: Api) => setApi(value), [setApi])

  return (
    <Select style={{ width: '100%' }} value={api} onChange={onChange}>
      {Object.entries(Api).map(([name, api]) => (
        <Select.Option key={api} value={api}>
          {name}
        </Select.Option>
      ))}
    </Select>
  )
}