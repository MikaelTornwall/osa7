import React from 'react'

const LoginForm = ({ login, handleLogin, username, password, error }) => (
    <div>
      <h2>Login</h2>
      {error}
      <form onSubmit={login}>
        <table>
          <tbody>
      <tr>
        <td>Username</td>
        <td><input
          type="text"
          name="username"
          value={username}
          onChange={handleLogin}
        />
        </td>
      </tr>
      <tr>
        <td>Password</td>
        <td><input
          type="password"
          name="password"
          value={password}
          onChange={handleLogin}
        />
        </td>
      </tr>
      </tbody>
      </table>
      <button type="submit">Log in</button>
      </form>
    </div>
)

export default LoginForm
