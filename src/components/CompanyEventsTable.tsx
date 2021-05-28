import React from 'react'
import { Table } from 'antd'
import { companyIdToStriseUrl } from '../utils/url'
import { CompanyEventFragment, CompanyFragment } from '../types/graphql'
import moment from 'moment'
import { ColumnsType } from 'antd/lib/table'

const NewTabLink = ({ url, children }: { url: string, children: React.ReactNode }) => <a href={url} target='_blank' rel='noreferrer'>{children}</a>

const columns: ColumnsType<CompanyEventFragment> = [
  {
    title: 'Type',
    dataIndex: '__typename',
    key: 'type',
    render: (typename: string) => typename.replace("Event", "")
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title, event) => event.striseUrl ? <NewTabLink url={event.striseUrl}>{title}</NewTabLink> : title
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
    render: (_: any, event) => {
      switch (event.__typename) {
        case 'AnnouncementEvent':
          return event.announcementEventTrigger
        case 'FlagEvent':
          return event.flagEventTrigger
        case 'CreditEvent':
          return event.creditEventTrigger
      }
    }
  },
  {
    title: 'Meta',
    key: 'meta',
    render: (_: any, event) => {
      switch (event.__typename) {
        case 'AnnouncementEvent':
          return (
            <>
              Code: {event.code}
              <br />
              Source: {event.source}
            </>
          )
        case 'FlagEvent':
          return (
            <>
              Code: {event.code}
              <br />
              Severity: {event.severity}
            </>
          )
        case 'CreditEvent':
          return (
            <>
              Code: {event.code}
            </>
          )
      }
    }
  },
]

export const CompanyEventsTable = ({ events }: { events: CompanyEventFragment[] }) => {
  return <Table columns={columns} dataSource={events} />
}
