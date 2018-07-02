import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { Button } from 'semantic-ui-react'
import loginService from '../services/login'

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100
  },
  login: {
    border: '1px rgba(0, 182, 173, 1)',
    borderStyle: 'none none solid none',
    borderRadius: 5,
    padding: 25,
    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, .87)'
  },
  button: {
    marginTop: 5
  }
}

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
      const newLogin = await loginService.login(user)
      this.props.login(newLogin)
      this.props.notify(`Successful login. Welcome ${user.username}!`)
    } catch (exception) {
      this.props.notify('Invalid username or password.')
    }
  }

  handleLogin = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div style={style.container}>
        <div style={style.login}>
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
            <Button style={style.button} size='small' color='teal' type="submit">Log in</Button>
          </form>
        </div>
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
