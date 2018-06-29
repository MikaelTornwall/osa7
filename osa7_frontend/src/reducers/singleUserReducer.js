import userService from '../services/users'

const singleUserReducer = (state = [], action) => {
  switch (action.type) {
  case 'SELECTED_USER':
    return action.user
  default:
    return state
  }
}

export const findUserById = (id) => {
  return async (dispatch) => {
    const user = await userService.getUser(id)
    console.log('This is what I found: ', user)
    dispatch({
      type: 'SELECTED_USER',
      user
    })
  }
}

export default singleUserReducer
