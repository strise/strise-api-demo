import { useApolloClient } from '@apollo/client'
import React from 'react'
import { CompanyEventFragment, CompanyEventSubscription } from '../types/graphql'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { Button, Checkbox } from 'antd'
import { Api } from '../components/Api'
import { CompanyEventsTable } from '../components/CompanyEventsTable'
import { AppContext } from '../components/AppContext'
import { loader } from 'graphql.macro'
import { PublishTestEvents } from '../components/PublishTestEvents'

const COMPANY_EVENT = loader('../graphql/companyEvent.graphql')

export const Subscription = () => {
  const client = useApolloClient()
  const { teamId, api } = React.useContext(AppContext)
  const [subscription, setSubscription] = React.useState<ZenObservable.Subscription | null>(null)
  const [events, setEvents] = React.useState<CompanyEventFragment[]>([])

  const [dryRun, setDryRun] = React.useState<boolean>(false)
  const onDryRunChange = React.useCallback((e: CheckboxChangeEvent) => setDryRun(e.target.checked), [setDryRun])

  const start = React.useCallback(() => {
    console.log('Start!', teamId)

    const subscription = client
      .subscribe<CompanyEventSubscription>({ query: COMPANY_EVENT, variables: teamId ? { team: teamId, dryRun } : undefined })
      .subscribe((response) => {
        const event = response.data?.companyEvent
        if (!event) return
        console.info('Received event', event.id)
        setEvents((prevEvents) => [{ ...event, key: event.id + event.createdAt }, ...prevEvents])
      })

    setSubscription(subscription)
  }, [client, teamId])

  const stop = React.useCallback(() => {
    console.log('Stop!', teamId)
    if (subscription) subscription.unsubscribe()
    setSubscription(null)
  }, [subscription, teamId])

  const clear = React.useCallback(() => setEvents([]), [])
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '1em', alignItems: 'center' }}>
        {!subscription ? (
          <Button onClick={() => start()}>
            Start
          </Button>
        ) : (
          <Button onClick={() => stop()}>
            Stop
          </Button>
        )}
        <Button onClick={() => clear()}>
          Clear
        </Button>
        {api !== Api.PROD && (
          <div style={{ marginLeft: '1em' }}>
            <PublishTestEvents teamId={teamId} />
          </div>
        )}
        <div style={{ marginLeft: '1em' }}>
          <Checkbox checked={dryRun} onChange={onDryRunChange}>
            Dry run
          </Checkbox>
        </div>
      </div>
      <CompanyEventsTable events={events} />
    </>
  )
}
