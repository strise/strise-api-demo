import React from 'react'
import { Input, Select } from 'antd'
import { useTeamsQuery } from '../utils/graphqlOperations'

export const Teams = ({ teamId, setTeamId }: { teamId: string; setTeamId: React.Dispatch<React.SetStateAction<string>> }): React.ReactElement => {
  const onChange = React.useCallback((value: string) => setTeamId(value), [setTeamId])

  const { data, loading } = useTeamsQuery()

  const teams = data?.teams.edges.map(({ node }) => node)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Team</div>
      {loading || teams == null ? (
        <Input value={teamId} onChange={(e) => setTeamId(e.target.value)} />
      ) : (
        <Select value={teamId} onChange={onChange}>
          {teams.map((team) => (
            <Select.Option key={team.id} value={team.id}>
              {team.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </div>
  )
}
