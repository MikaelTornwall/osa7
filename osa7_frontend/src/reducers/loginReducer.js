import blogService from '../services/blogs'

const initialState = JSON.parse(window.localStorage.getItem('loggedUser'))

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    console.log('Login action.type is: ', action.type)
    return action.loggedUser
  case 'INIT_LOGGEDUSER':
    return action.loggedUser
  case 'LOGOUT':
    return action.loggedUser
  default:
    return state
  }
}

export const login = (newLogin) => {
  return async (dispatch) => {
    try {
      console.log('THIS SHOULD FIRE ON REFRESH')
      window.localStorage.setItem('loggedUser', JSON.stringify(newLogin))
      blogService.setToken(newLogin.token)
      dispatch({
        type: 'LOGIN',
        loggedUser: newLogin
      })
    } catch (exception) {
      return 'Invalid username or password'
    }
  }
}

export const initLoggedUser = (loggedUser) => {
  return async (dispatch) => {
    if (loggedUser) {
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'INIT_LOGGEDUSER',
        loggedUser
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
      loggedUser: null
    })
  }
}

export default loginReducer
