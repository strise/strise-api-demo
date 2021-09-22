import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { Button } from 'antd'
import React from 'react'

const PUBLISH = loader('../graphql/publish.graphql')

export const Publish = ({ teamId }: { teamId: string }) => {
  const [publish, { loading }] = useMutation(PUBLISH, { variables: { team: teamId } })
  return (
    <Button onClick={() => publish()} loading={loading}>
      Publish
    </Button>
  )
}
