import React from 'react'
import { useQuery } from '@apollo/client'
import { AppContext } from '../components/AppContext'
import { UsersTable } from '../components/UsersTable'
import { UserFragment, UsersQuery, UsersQueryVariables } from '../types/graphql'
import USERS from '../graphql/users.graphql'

export const useUsers = (): { users: UserFragment[], loading: boolean } => {
  const { teamId } = React.useContext(AppContext)
  const { data, loading } = useQuery<UsersQuery, UsersQueryVariables>(USERS, { variables: { team: teamId } })
  const users = data?.users.edges.map(({ node }) => node) ?? []
  return { users, loading }
}

export const Users = () => {
  const { users } = useUsers()
  return (
    <>
      <UsersTable users={users} />
    </>
  )
}
