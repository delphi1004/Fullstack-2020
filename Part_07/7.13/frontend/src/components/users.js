import React from 'react'
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

const User = () => {
  const classes = useStyles()
  const users = useSelector(state => state.users)

  const user = useSelector(state => state.user)

  if (!user) {
    return (
      <p style={{ paddingLeft: 10 }}>Please login</p>
    )
  }

  return (
    <div id='users'>
      {users &&
        <TableContainer component={Paper} style={{ width: 500 }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width='30%'>Users</TableCell>
                <TableCell align="left">Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
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