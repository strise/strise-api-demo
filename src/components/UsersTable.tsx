import React from 'react'
import { UserFragment } from '../types/graphql'
import { ColumnsType } from 'antd/lib/table'
import { FilterableTable } from './FilterableTable'

const columns: ColumnsType<UserFragment> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }
]

export const UsersTable = ({ users }: { users: UserFragment[] }) => {
  return (
    <>
      <FilterableTable columns={columns} data={users} />
    </>
  )
}
