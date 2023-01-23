import { Button } from 'antd'
import React from 'react'
import { usePublishTestEventsMutation } from '../utils/graphqlOperations'

export const PublishTestEvents = ({ teamId }: { teamId: string }): React.ReactElement => {
  const [publish, { loading }] = usePublishTestEventsMutation()
  const handleClick = async (): Promise<void> => {
    await publish({ variables: { team: teamId } })
  }

  return (
    <Button onClick={handleClick} loading={loading}>
      Publish test events
    </Button>
  )
}
