import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import singleBlogReducer from './reducers/singleBlogReducer'
import singleUserReducer from './reducers/singleUserReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  loggedUser: loginReducer,
  users: userReducer,
  user: singleUserReducer,
  blogs: blogReducer,
  blog: singleBlogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
