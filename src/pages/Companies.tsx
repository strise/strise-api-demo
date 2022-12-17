import React from 'react'
import { AppContext } from '../components/AppContext'
import { CompaniesTable } from '../components/CompaniesTable'
import { useCompaniesQuery } from '../utils/graphqlOperations'

export const Companies = (): React.ReactElement => {
  const { teamId } = React.useContext(AppContext)
  const { data, loading } = useCompaniesQuery({ variables: { team: teamId } })
  const companies = data?.companies.edges.map(({ node }) => node)
  if (loading) {
    return <>Loading ...</>
  }
  return <>{companies != null && <CompaniesTable companies={companies} />}</>
}
