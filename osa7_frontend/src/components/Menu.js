import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'


class Menu extends React.Component {

  render() {

    return (
      <div>
        <Link to="/">Home</Link> &nbsp;
        <Link to="/users">Users</Link> &nbsp;
        <span>{this.props.loggedUser.username} logged in <button onClick={() => this.props.logout(null)}>Logout</button></span>
      </div>
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

const ConnectedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default ConnectedMenu
