import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userInitialization } from '../reducers/userReducer'
import { List, Icon } from 'semantic-ui-react'

class Users extends React.Component {

  render() {
    return (
      <div>
        <h3>Users ({this.props.sortedUsers.length})</h3>
        <List>
        {this.props.sortedUsers.map(user =>
          <List.Item as={Link} to={`/users/${user.id}`} key={user.id}>
          <Icon name='user circle' />
          <List.Content>
            <List.Header color='teal' className="username">{user.username}</List.Header>
            <List.Description>{user.blogs.length} blogs</List.Description>
            </List.Content>
          </List.Item>
        )}
        </List>
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
