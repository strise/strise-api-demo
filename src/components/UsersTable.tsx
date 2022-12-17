import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { FilterableTable } from './FilterableTable'
import { UserFragment } from '../types/graphqlOperationTypes'

const columns: ColumnsType<UserFragment> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }
]

export const UsersTable = ({ users }: { users: UserFragment[] }): React.ReactElement => {
  return (
    <>
      <FilterableTable columns={columns} data={users} />
    </>
  )
}
