import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './blogs.css'
import NewBlogForm from '../components/newblogform'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
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

const blogButonStyle = {
  textTransform: 'none',
  justifyContent: 'left',
  width: '100%'
}

const Blogs = () => {
  const history = useHistory()
  const [foundUser, setFoundUser] = useState('')
  const users = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const classes = useStyles()

  useEffect(() => {
    if (users && loggedInUser) {
      const tempUser = users.find(user => {
        if (user.id.includes(loggedInUser.id)) {
          return user
        }
      })
      setFoundUser(tempUser)
    }
  }, [users, loggedInUser])

  const handleBlogClicked = (id) => {
    history.push(`/blogs/${id}`)
  }

  if (!foundUser || !users) {
    return null
  }

  return (
    <div id='blogs'>
      <h3>{foundUser.name}</h3>
      <NewBlogForm />
      <TableContainer component={Paper} elevation={3} style={{ width: '70%' , marginTop:50 }}>
        <Table className={classes.table} size='small' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width='50%'>Title</TableCell>
              <TableCell width='50%' align="left">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foundUser.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component="th" scope="row">
                  <Button style={blogButonStyle} onClick={() => handleBlogClicked(blog.id)}>{blog.title}</Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
