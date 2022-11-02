import { useMutation } from '@apollo/client'
import { Button } from 'antd'
import React from 'react'
import PUBLISH_TEST_EVENTS from '../graphql/publishTestEvents.graphql'

export const PublishTestEvents = ({ teamId }: { teamId: string }) => {
  const [publish, { loading }] = useMutation(PUBLISH_TEST_EVENTS, { variables: { team: teamId } })
  const handleClick = async () => await publish()

  return (
    <Button onClick={handleClick} loading={loading}>
      Publish test events
    </Button>
  )
}
