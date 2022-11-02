import React from 'react'
import { AutoComplete, Button, Input, Tag } from 'antd'
import { CompanyAssignMutation, CompanyAssignMutationVariables, CompanyFragment, CompanyUnassignMutation, CompanyUnassignMutationVariables } from '../types/graphql'
import { ColumnsType } from 'antd/lib/table'
import { NewTabLink } from './CompanyEventsTable'
import { companyIdToStriseUrl } from '../utils/url'
import { FilterableTable } from './FilterableTable'
import { useUsers } from '../pages/Users'
import { filterObjects } from '../utils/object'
import { CloseOutlined, UserAddOutlined } from '@ant-design/icons'
import { AppContext } from './AppContext'
import { useMutation } from '@apollo/client'
import COMPANIES from '../graphql/companies.graphql'
import COMPANY_UNASSIGN from '../graphql/companyUnassign.graphql'
import COMPANY_ASSIGN from '../graphql/companyAssign.graphql'

const CompanyAssign = ({ companyId, assignees }: { companyId: string, assignees: CompanyFragment['assignees'] }) => {
  const { teamId } = React.useContext(AppContext)
  const assignedUsersObject = assignees.edges.reduce<{ [id: string]: boolean }>((acc, { node }) => ({ ...acc, [node.id]: true }), {})
  const [assign] = useMutation<CompanyAssignMutation, CompanyAssignMutationVariables>(COMPANY_ASSIGN, { refetchQueries: [{ query: COMPANIES, variables: { team: teamId } }] })
  const { users } = useUsers()
  const [filter, setFilter] = React.useState('')
  const filteredUsers = filterObjects(users.filter((user) => !assignedUsersObject[user.id]), filter)
  const [edit, setEdit] = React.useState(false)
  const options = filteredUsers.map((user) => ({ label: user.name, value: user.id }))

  const handleSelect = (userId: string) => {
    assign({ variables: { team: teamId, user: userId, company: companyId } })
    setEdit(false)
  }

  if (!edit) {
    return (
      <Button onClick={() => setEdit(true)}>
        <UserAddOutlined />
      </Button>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AutoComplete
        dropdownMatchSelectWidth={500}
        style={{ width: 250 }}
        options={options}
        onSelect={handleSelect}
      >
        <Input.Search size='large' value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='Search users ...' />
      </AutoComplete>
      <Button style={{ marginLeft: '0.5em' }} onClick={() => setEdit(false)}>
        <CloseOutlined />
      </Button>
    </div>
  )
}

const CompanyAssignees = ({ companyId, assignees }: { companyId: string, assignees: CompanyFragment['assignees'] }) => {
  const { teamId } = React.useContext(AppContext)
  const [unassign] = useMutation<CompanyUnassignMutation, CompanyUnassignMutationVariables>(COMPANY_UNASSIGN, { refetchQueries: [{ query: COMPANIES, variables: { team: teamId } }] })

  return (
    <>
      {assignees.edges.map(({ node }) => {
        const handleClose = async () => await unassign({ variables: { user: node.id, team: teamId, company: companyId } })

        return (
          <Tag key={companyId + node.id} closable onClose={handleClose}>
            {node.name}
          </Tag>
        )
      })}
      <CompanyAssign companyId={companyId} assignees={assignees} />
    </>
  )
}

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
  },
  {
    title: 'Assignees',
    key: 'assignees',
    dataIndex: 'assignees',
    render: (assignees: CompanyFragment['assignees'], company) => <CompanyAssignees companyId={company.id} assignees={assignees} />
  }
]

export const CompaniesTable = ({ companies }: { companies: CompanyFragment[] }) => {
  return <FilterableTable columns={columns} data={companies} />
}
