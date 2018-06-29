import React from 'react'
import Menu from './components/Menu'
import Blog from './components/Blog'
import BlogInfo from './components/BlogInfo'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import blogService from './services/blogs'
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

class App extends React.Component {
  componentDidMount = async () => {
    this.props.blogInitialization()
    this.props.userInitialization()

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    this.props.initLoggedUser(user)
  }

  removeBlog = (blog) => {
    return async () => {
      try {
        if (window.confirm(`Do you really want delete blog "${blog.title}" by ${blog.author}?`)) {
          console.log('Delete blog', blog.id)
          const removedBlog = await blogService.remove(blog.id)
          const blogs = this.state.blogs.filter(b => b.id !== blog.id)
          this.setState({
            message: `Successfully deleted blog "${blog.title}" by ${blog.author}`,
            color: 'green',
            blogs
          })
          console.log('Success!')
          setTimeout(() => {
            this.setState({ message: null, color:null })
          }, 5000)
        }
      } catch (excpetion) {
        this.setState({ message: "The blog has already been deleted" })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      }
    }
  }

  like = (id) => {
    return async () => {
      console.log('This is the id: ', id)

      const blog = this.state.blogs.find(blog => blog.id === id)
      console.log("This is the blog.id", blog.id)
      console.log(blog.id === id)

      const blogObject = {
        loggedUser: blog.loggedUser,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }


      const changedBlog = await blogService.update(id, blogObject)

      const blogs = this.state.blogs.filter(blog => blog.id !== id)
      this.setState({ blogs: blogs.concat(changedBlog).sort((a, b) => b.likes - a.likes ) })
    }
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
        <Menu />
        <Route exact path="/" render={() =>
          this.props.loggedUser
            ? blogForm()
            : <Redirect to="/login" />
        }
        />
        <Route exact path="/users" render={() => <Users /> } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          this.props.blog
            ? <BlogInfo blog={blogById(match.params.id)} />
            : <Redirect to="/" />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <UserBlogs blogUser={userById(match.params.id)} />
        } />
      </div>
    )

    return (
      <div>
        <h1>Blog App</h1>
        <Notification />
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
      </div>
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
    blog: state.blog,
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
