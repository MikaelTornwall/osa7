const notification = null

const notificationReducer = (state = notification, action) => {
  switch (action.type){
  case 'NOTIFICATION':
    console.log('action.type in notificationReducer is: ', action.type)
    console.log('action.notification in notificationReducer is: ', action.notification)
    return action.notification
  default:
    return state
  }
}

export const notify = (notification) => {
  return async (dispatch) => {
    console.log('Notification at notify action creator is: ', notification)
    dispatch({
      type: 'NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        notification: null
      })
    }, 5000)
  }
}

export default notificationReducer
