import React from 'react'
import { Table } from 'antd'
import { companyIdToStriseUrl } from '../utils/url'
import { CompanyEventFragment, CompanyFragment } from '../types/graphql'
import moment from 'moment'
import { ColumnsType } from 'antd/lib/table'

const NewTabLink = ({ url, children }: { url: string, children: React.ReactNode }) => <a href={url} target='_blank' rel='noreferrer'>{children}</a>

const columns: ColumnsType<CompanyEventFragment> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title, event) => event.striseUrl ? <NewTabLink url={event.striseUrl}>{title}</NewTabLink> : title
  },
  {
    title: 'Kind',
    dataIndex: 'kind',
    key: 'kind'
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (company: CompanyFragment) => <NewTabLink url={companyIdToStriseUrl(company.id)}>{company.name}</NewTabLink>
  },
  {
    title: 'Company Status',
    dataIndex: 'company',
    key: 'companyStatus',
    render: (company: CompanyFragment) => <>{company.status}</>
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
    dataIndex: 'trigger',
    key: 'trigger',
    render: (_, event) => {
      switch (event.__typename) {
        case 'AnnouncementEvent':
          return event.announcementTrigger
        case 'CreditEvent':
          return event.creditTrigger
        case 'FlagEvent':
          return event.flagTrigger
      }
    }
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code'
  }
]

export const CompanyEventsTable = ({ events }: { events: CompanyEventFragment[] }) => {
  return <Table columns={columns} dataSource={events} />
}
