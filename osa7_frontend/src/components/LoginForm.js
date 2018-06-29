import React from 'react'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = {
        username: this.state.username,
        password: this.state.password
      }

      this.props.login(user)
    } catch (exception) {
      this.props.notify('Invalid username of password')
    }
  }

  handleLogin = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login}>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td><input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLogin}
                />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLogin}
                />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  login,
  notify
}
const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
