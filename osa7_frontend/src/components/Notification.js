import React from 'react'

const Notification = ({ message, color }) => {
  return (
    <p style={{color: color}}>{message}</p>
  )
}

export default Notification
