import React from 'react'

const Logged = ({ user, logout }) => (
  <div>
    <p>{user} logged in <button onClick={logout}>Logout</button></p>
  </div>
)

export default Logged
