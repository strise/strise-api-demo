import React from 'react'
import { useQuery } from '@apollo/client'
import { CompaniesQuery, CompaniesQueryVariables } from '../types/graphql'
import { AppContext } from '../components/AppContext'
import { CompaniesTable } from '../components/CompaniesTable'
import COMPANIES from '../graphql/companies.graphql'

export const Companies = () => {
  const { teamId } = React.useContext(AppContext)
  const { data, loading } = useQuery<CompaniesQuery, CompaniesQueryVariables>(COMPANIES, { variables: { team: teamId } })
  const companies = data?.companies.edges.map(({ node }) => node)
  if (loading) {
    return (
      <>
        Loading ...
      </>
    )
  }
  return (
    <>
      {(companies != null) && <CompaniesTable companies={companies} />}
    </>
  )
}
