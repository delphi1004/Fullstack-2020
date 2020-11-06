import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Notification = () => {
  const classes = useStyles()
  const notification = useSelector(state => state.notification)

  if (notification.length > 0) {
    return (
      <div className={classes.root}>
        <Alert severity='info'>{notification}</Alert>
      </div>
    )
  }

  return null
}

export default Notification