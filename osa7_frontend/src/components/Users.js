import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userInitialization } from '../reducers/userReducer'

class Users extends React.Component {

  render() {
    return (
      <div>
        <h3>Users</h3>
        {this.props.sortedUsers.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.username} <br />
              Blogs: {user.blogs.length}
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const usersSorted = (users) => {
  const sorted = users.sort((a, b) => b.blogs.length - a.blogs.length)
  return sorted
}

const mapStateToProps = (state) => {
  return {
    sortedUsers: usersSorted(state.users)
  }
}

const ConnectedUsers = connect(
  mapStateToProps,
  { userInitialization }
)(Users)

export default ConnectedUsers
