import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import './blogdetail.css'
import { loadBlog } from '../reducers/blogReducer'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const likesButonStyle = {
  textTransform: 'none',
  justifyContent: 'left',
  width: '20%'
}

const BlogDetail = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const blog = useSelector(state => state.blog)

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadBlog(match.params.id))
    }
  }, [loggedInUser])

  const handleUpdateLikes = async (blog) => {

    const blogToUpdate = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }

    dispatch(updateBlog(blogToUpdate))
  }

  const handleRemove = async (blog) => {

    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog)).then(() => {
        dispatch(setNotification(`${blog.title} removed`))
        history.push('/')
      }).catch(exception => {
        dispatch(setNotification(exception))
      })
    }
  }

  const handleBack = () => {
    history.push('/')
  }

  if (!blog) {
    return null
  }

  return (
    <div id='blog' >
      <button style={{ backgroundColor: 'lightblue', border: 'none' }} onClick={() => handleRemove(blog)}>remove</button>
      <TableContainer component={Paper} elevation={3} style={{ width: '80%' }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width='100%'>Blog added by <em>{loggedInUser.name}</em> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <h2>{blog.title}<em style={{ color: 'darkgray' , fontSize:13 }}> by {blog.author}</em> </h2>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {blog.url}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Button style={likesButonStyle} onClick={() => handleUpdateLikes(blog)}>{blog.likes} likes</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <button style={{ backgroundColor:'lightgray' , border: 'none' }} onClick={() => handleBack()}>back</button>
    </div>
  )
}

export default BlogDetail
