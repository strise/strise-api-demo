import React from 'react'
import { AppContext } from '../components/AppContext'
import { UsersTable } from '../components/UsersTable'
import { useUsersQuery } from '../utils/graphqlOperations'
import { UserFragment } from '../types/graphqlOperationTypes'

export const useUsers = (): { users: UserFragment[]; loading: boolean } => {
  const { teamId } = React.useContext(AppContext)
  const { data, loading } = useUsersQuery({ variables: { team: teamId } })
  const users = data?.users.edges.map(({ node }) => node) ?? []
  return { users, loading }
}

export const Users = (): React.ReactElement => {
  const { users } = useUsers()
  return <UsersTable users={users} />
}
