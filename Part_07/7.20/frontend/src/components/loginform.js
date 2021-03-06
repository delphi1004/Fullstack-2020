import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loggedInUserReducer'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useTableStyles = makeStyles({
  table: {
    minWidth: 650,
  }
})

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
    paddingLeft: 40,
  }
})(MuiTableCell)

const LoginForm = () => {

  const classesTable = useTableStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(login(username, password))
      .then(() => { history.push('/') })
      .catch(() => {
        dispatch(setNotification('wrong user name or password'))
      })
  }

  return (
    <TableContainer component={Paper} elevation={3} style={{ marginLeft: 30, marginTop: 50, width: 248, height: 200 }}>
      <Table className={classesTable.table} size='small' aria-label="login table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {' '}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <TextField required
                id='standard-required'
                label='user name'
                value={username}
                onChange={({ target }) => setUsername(target.value)} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <TextField required
                id='standard-password-required'
                label='password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button style={{ marginLeft: 40, marginTop:10  , width: 165 }} onClick={handleLogin}>login</Button>
    </TableContainer>
  )
}

export default LoginForm