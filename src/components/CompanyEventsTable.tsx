import React from 'react'
import { Button, Table } from 'antd'
import { companyIdToStriseUrl } from '../utils/url'
import { AttributeFragment, CompanyEventFragment, CompanyFragment } from '../types/graphql'
import moment from 'moment'
import { ColumnsType } from 'antd/lib/table'

const NewTabLink = ({ url, children }: { url: string, children: React.ReactNode }) => <a href={url} target='_blank' rel='noreferrer'>{children}</a>

const MetaBox = ({ meta }: { meta: AttributeFragment[] }) => {
  const [open, setOpen] = React.useState(false)
  if (meta.length === 0) return <>No meta</>
  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} type='text'>
        Show meta
      </Button>
    )
  } else {
    return (
      <>
        <Button onClick={() => setOpen(false)} type='text'>
          Hide meta
        </Button>
        {meta.map(({ key, value }) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </>
    )
  }
}


const columns: ColumnsType<CompanyEventFragment> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title, event) => <NewTabLink url={event.striseUrl}>{title}</NewTabLink>
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
    title: 'Meta',
    dataIndex: 'meta',
    key: 'meta',
    render: (meta: AttributeFragment[]) => <MetaBox meta={meta} />
  },
]

export const CompanyEventsTable = ({ events }: { events: CompanyEventFragment[] }) => {
  return <Table columns={columns} dataSource={events} />
}
