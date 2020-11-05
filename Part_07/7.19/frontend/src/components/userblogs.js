import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './userblogs.css'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useSelector } from 'react-redux'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UserBlogs = ({ match }) => {
  const history = useHistory()
  const [foundUser, setFoundUser] = useState('')
  const users = useSelector(state => state.users)
  const classes = useStyles()

  useEffect(() => {
    if (users) {
      const tempUser = users.find(user => {
        if (user.id.includes(match.params.id)) {
          return user
        }
      })

      setFoundUser(tempUser)
    }
  }, [users])

  const handleBack = () => {
    history.push('/users')
  }

  if (!foundUser) {
    return null
  }

  return (
    <div id='userbglos'>
      <h3>{foundUser.name}</h3>
      <button style={{ backgroundColor: 'lightblue', border: 'none' }} onClick={() => handleBack()}>back</button>
      <TableContainer component={Paper} elevation={3} style={{ width: '60%' }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width='50%'>Added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foundUser.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component="th" scope="row">
                  {blog.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserBlogs