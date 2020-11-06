import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import AddIcon from '@material-ui/icons/Add'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import InputBase from '@material-ui/core/InputBase'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import './blogdetail.css'
import { loadBlog } from '../reducers/blogReducer'

const useTableStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const useListStyles = makeStyles((theme) => ({
  root: {
    width: '79%',
    backgroundColor: theme.palette.background.paper,
  },
}))

const inputStyle = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: 600,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 650,
  },
}))

const BlogDetail = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classesTable = useTableStyles()
  const classesList = useListStyles()
  const classesInput = inputStyle()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const blog = useSelector(state => state.blog)
  const [userComment, setUserComment] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadBlog(match.params.id))
    }
  }, [loggedInUser])

  const handleDialogClose = async (shouldRemove) => {
    setOpenDialog(false)

    if (shouldRemove) {
      dispatch(removeBlog(blog)).then(() => {
        dispatch(setNotification(`${blog.title} removed`))
        history.push('/')
      }).catch(exception => {
        dispatch(setNotification(exception))
      })
    }
  }

  const ShowDialog = () => (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Are you absolutely sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`This will permanently delete the ${blog.title} by ${blog.author}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialogClose(false)} color='primary' autoFocus>
          No
        </Button>
        <Button onClick={() => handleDialogClose(true)} color='primary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )

  const handleUpdateLikes = async (blog) => {

    const blogToUpdate = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user,
      comments: blog.comments
    }

    dispatch(updateBlog(blogToUpdate))
  }

  const handleRemove = () => {
    setOpenDialog(true)
  }

  const handleComment = async (e) => {
    e.preventDefault()

    if (userComment.length > 0) {
      const blogToUpdate = { ...blog, comments: blog.comments.concat(userComment) }
      console.log(blogToUpdate)
      dispatch(updateBlog(blogToUpdate))
    }
    setUserComment('')
  }

  const handleBack = () => {
    history.push('/')
  }

  if (!blog) {
    return null
  }

  return (
    <div id='blog' >
      <IconButton style={{ color: 'orange' }} onClick={() => handleBack()}>
        <ArrowBackIcon />
      </IconButton>
      <TableContainer component={Paper} elevation={3} style={{ width: '80%' }}>
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width='100%'>Blog added by <em>{loggedInUser.name}</em> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                <h2>{blog.title}<em style={{ color: 'darkgray', fontSize: 13 }}> by {blog.author}</em> </h2>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                <Link rel='noreferrer' target='_blank' href={blog.url} onClick={() => { console.log('open') }}>
                  {blog.url}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                {blog.likes} likes
                <IconButton onClick={() => handleUpdateLikes(blog)}>
                  <FavoriteBorderIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton onClick={() => handleRemove(blog)}>
        <DeleteForeverIcon />
      </IconButton>
      <div className={classesList.root} style={{ marginTop: 50, paddingLeft: 10 }}>
        <h4>comments:</h4>
        <form onSubmit={handleComment}>
          <InputBase
            className={classesInput.input}
            placeholder='add your comment'
            value={userComment}
            inputProps={{ 'aria-label': 'add your comment' }}
            onChange={({ target }) => setUserComment(target.value)}
          />
          <IconButton type='submit' className={classesInput.iconButton} aria-label='add'>
            <AddIcon />
          </IconButton>
          <Divider className={classesInput.divider} />
          < ul component='nav'>
            {
              blog.comments && blog.comments.map((comment, index) => (
                <li key={index}>
                  <p>{comment}</p>
                </li>
              )
              )}
          </ul>
        </form>
      </div>
      <ShowDialog />
    </div >
  )
}

export default BlogDetail