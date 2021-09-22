import React from 'react'
import { Button, Drawer, Input } from 'antd'
import { ApiSelect } from './Api'
import { Teams } from './Team'
import { AppContext } from './AppContext'

export const SettingsDrawer = () => {
  const { api, setApi, teamId, setTeamId, token, setToken } = React.useContext(AppContext)
  const [open, setOpen] = React.useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button type='primary' onClick={onOpen} style={{ margin: 0 }}>
        Settings
      </Button>
      <Drawer title='Settings' placement='right' closable={false} onClose={onClose} visible={open}>
        <div style={{ flexGrow: 1 }}>
          Access token
          <Input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div style={{ flexGrow: 1 }}>
          API
          <ApiSelect api={api} setApi={setApi} />
        </div>
        <Teams teamId={teamId} setTeamId={setTeamId} />
      </Drawer>
    </>
  )
}
