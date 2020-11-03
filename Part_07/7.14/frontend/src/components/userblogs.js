/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './userblogs.css'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserBlog } from '../reducers/blogReducer'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UserBlogs = ({ match }) => {

  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const userBlogs = useSelector(state => state.blog)
  const users = useSelector(state => state.users)
  const classes = useStyles()

  useEffect(() => {
    if (users) {
      dispatch(loadUserBlog(match.params.id))
      users.every(user => {
        if (user.id.includes(match.params.id)) {
          setUserName(user.name)
          return false
        }
        return true
      })
    }
  }, [users])

  if (!users || !userBlogs) {
    return null
  }

  return (
    <div id='userbglos'>
      <h3>{userName}</h3>
      <TableContainer component={Paper} elevation={3} style={{ width: '50%' }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width='50%'>Added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component="th" scope="row">
                  {blog.title} by <em>{blog.author}</em>
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