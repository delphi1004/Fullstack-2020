import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import './users.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const nameButonStyle = {
  textTransform: 'none',
  justifyContent: 'left',
  width: '50%'
}

const User = () => {
  const history = useHistory()
  const classes = useStyles()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)

  const handleNameClicked = (user) => {
    history.push(`/users/${user.id}`)
  }

  if (!user) {
    return (
      <p style={{ paddingLeft: 10 }}>Please login</p>
    )
  }

  return (
    <div id='users'>
      {users &&
        <TableContainer component={Paper} elevation={3} style={{ width: '50%' }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width='50%'>Users</TableCell>
                <TableCell width='50%' align="left">Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Button style={nameButonStyle} onClick={() => handleNameClicked(user)}>{user.name}</Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  )
}

export default User