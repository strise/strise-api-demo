import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { TeamsQuery } from '../types/graphql'
import { Input, Select } from 'antd'

const TEAMS = loader('../graphql/teams.graphql')

export const Teams = ({ teamId, setTeamId }: { teamId: string, setTeamId: React.Dispatch<React.SetStateAction<string>> }) => {
  const onChange = React.useCallback((value: string) => setTeamId(value), [setTeamId])

  const { data, loading } = useQuery<TeamsQuery>(TEAMS)

  const teams = data?.teams.edges.map(({ node }) => node)
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div>
        Team
      </div>
      {(loading || !teams)
        ? <Input value={teamId} onChange={(e) => setTeamId(e.target.value)} />
        : (
          <Select value={teamId} onChange={onChange}>
            {teams.map((team) => (
              <Select.Option key={team.id} value={team.id}>
                {team.name}
              </Select.Option>
            ))}
          </Select>
        )
      }
    </div>
  )
}