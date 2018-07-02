import React from 'react'
import Navigation from './components/Menu'
import Blog from './components/Blog'
import BlogInfo from './components/BlogInfo'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Create from './components/Create'
import { blogInitialization } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'
import { initLoggedUser } from './reducers/loginReducer'
import { findBlog } from './reducers/singleBlogReducer'
import { findUserById } from './reducers/singleUserReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container, Header, Icon } from 'semantic-ui-react'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.blogInitialization()
    this.props.userInitialization()

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    this.props.initLoggedUser(user)
  }

  render() {
    const blogById = (id) => this.props.findBlog(id)
    const userById = (id) => this.props.findUserById(id)

    const notLoggedIn = () => (
      <Route path="/login" render={() =>
        this.props.loggedUser
          ? <Redirect to="/" />
          : <LoginForm />} />
    )

    const blogForm = () => {
      return (
        <div>
          <Togglable buttonLabel="New blog">
            <Create />
          </Togglable>
          <Blog />
        </div>
      )
    }

    const loggedIn = () => (
      <div>
        <Navigation />
        <Route exact path="/" render={() =>
          this.props.loggedUser
            ? blogForm()
            : <Redirect to="/login" />
        }
        />
        <Route exact path="/users" render={() => <Users /> } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <BlogInfo blog={blogById(match.params.id)} />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <UserBlogs blogUser={userById(match.params.id)} />
        } />
      </div>
    )

    return (
      <Container>
        <Header as='h1' className='title'><Icon name='star half outline' flipped='horizontally' />Bloggist</Header>
        {this.props.notification
          ? <Notification />
          : null
        }
        <Router>
          <div>
            <div className="app">
              {this.props.loggedUser
                ? loggedIn()
                : <Redirect to="/login" />
              }
              {notLoggedIn()}
            </div>
          </div>
        </Router>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  blogInitialization,
  userInitialization,
  findBlog,
  findUserById,
  initLoggedUser
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    loggedUser: state.loggedUser,
    notification: state.notification
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
