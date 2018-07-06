import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Menu, Header } from 'semantic-ui-react'


class Navigation extends React.Component {
state = {
  activeItem: 'Blogs'
}
handleItemClick = (e, { name }) => this.setState({ activeItem: name })

render() {
  const { activeItem } = this.state
  return (
    <Menu pointing secondary>
      <Menu.Item
        as={Link} to="/"
        name='Blogs'
        active={activeItem === 'Blogs'}
        onClick={this.handleItemClick}
      />
      <Menu.Item
        as={Link} to="/users"
        name='Users'
        active={activeItem === 'Users'}
        onClick={this.handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item>{this.props.loggedUser.username} logged in &nbsp;<Header as="h4" color='teal' style={{ cursor:'pointer' }} onClick={() => this.props.logout(null)}>Logout</Header></Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  logout
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default ConnectedNavigation
