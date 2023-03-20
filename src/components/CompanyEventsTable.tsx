import React from 'react'
import { companyIdToStriseUrl } from '../utils/url'
import moment from 'moment'
import type { ColumnsType } from 'antd/lib/table'
import { FilterableTable } from './FilterableTable'
import type { CompanyEventBaseFragment, CompanyFragment } from '../types/graphqlOperationTypes'

export const NewTabLink = ({ url, children }: { url: string; children: React.ReactNode }): React.ReactElement => (
  <a href={url} target='_blank' rel='noreferrer'>
    {children}
  </a>
)

const columns: ColumnsType<CompanyEventBaseFragment> = [
  {
    title: 'Type',
    dataIndex: '__typename',
    key: 'type',
    render: (typename: string) => typename.replace('Event', '')
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title: string, event) => (event.striseUrl ? <NewTabLink url={event.striseUrl}>{title}</NewTabLink> : <>title</>)
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (company: CompanyFragment) => (
      <>
        <NewTabLink url={companyIdToStriseUrl(company.id)}>{company.name}</NewTabLink>
        <br />
        {company.status}
      </>
    )
  },
  {
    title: 'Company Tags',
    dataIndex: 'company',
    key: 'companyTags',
    render: (company: CompanyFragment) => <>{company.tags.edges.map(({ node }) => node.name).join(', ')}</>
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (time: string) => moment(time).fromNow()
  },
  {
    title: 'Published',
    dataIndex: 'published',
    key: 'published',
    render: (time: string) => moment(time).fromNow()
  },
  {
    title: 'Trigger',
    key: 'trigger',
    render: (_, event) => {
      switch (event.__typename) {
        case 'CompanyUpdateEvent':
          return event.companyUpdateTrigger
        case 'FlagEvent':
          return event.flagEventTrigger
      }
    }
  },
  {
    title: 'Meta',
    key: 'meta',
    render: (_, event) => {
      switch (event.__typename) {
        case 'FlagEvent':
          return (
            <>
              Code: {event.code}
              <br />
              Severity: {event.severity}
            </>
          )
        case 'CompanyUpdateEvent':
          return <>Code: {event.code}</>
      }
    }
  }
]

export const CompanyEventsTable = ({ events }: { events: CompanyEventBaseFragment[] }): React.ReactElement => {
  return <FilterableTable columns={columns} data={events} />
}
