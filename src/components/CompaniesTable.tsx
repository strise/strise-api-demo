import React from 'react'
import { Table } from 'antd'
import { CompanyFragment } from '../types/graphql'
import { ColumnsType } from 'antd/lib/table'
import { NewTabLink } from './CompanyEventsTable'
import { companyIdToStriseUrl } from '../utils/url'

const columns: ColumnsType<CompanyFragment> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, company) => <NewTabLink url={companyIdToStriseUrl(company.id)}>{name}</NewTabLink>
  },
  {
    title: 'Org#',
    dataIndex: 'organizationNumber',
    key: 'organizationNumber'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: CompanyFragment['tags']) => <>{tags.edges.map(({ node }) => node.name).join(', ')}</>
  }
]

export const CompaniesTable = ({ companies }: { companies: CompanyFragment[] }) => {
  return <Table columns={columns} dataSource={companies} />
}
