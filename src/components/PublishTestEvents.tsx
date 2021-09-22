import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { Button } from 'antd'
import React from 'react'

const PUBLISH_TEST_EVENTS = loader('../graphql/publishTestEvents.graphql')

export const PublishTestEvents = ({ teamId }: { teamId: string }) => {
  const [publish, { loading }] = useMutation(PUBLISH_TEST_EVENTS, { variables: { team: teamId } })
  return (
    <Button onClick={() => publish()} loading={loading}>
      Publish test events
    </Button>
  )
}
