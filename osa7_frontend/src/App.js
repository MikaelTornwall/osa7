import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogInfo from './components/BlogInfo'
import Logged from './components/Logged'
import Notification from './components/Notification'
import Create from './components/Create'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      color: null,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort((a, b) => b.likes - a.likes) })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    console.log('Logging in with username: "', this.state.username, '" and password "', this.state.password, '".')
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })

    } catch (exception) {
      this.setState({
        message: 'Invalid username or password',
        color: 'red'
      })
      setTimeout(() => {
        this.setState({
          message: null,
          color: null
        })
      }, 5000)
    }
  }

  submit = async (event) => {
    event.preventDefault()
    console.log("New blog submitted: ", this.state.title, this.state.author, this.state.url)
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      if (blogObject.author.length === 0 || blogObject.url.length === 0) {
        this.setState({ message: 'All fields must be filled' })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
        return
      }

      const addedBlog = await blogService.create(blogObject)

      this.setState({
        message: `A blog "${this.state.title}" by author ${this.state.author} has been created.`,
        color: 'green',
        blogs: this.state.blogs.concat(addedBlog),
        title: '',
        author: '',
        url: ''
      })

      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)

    } catch (exception) {
      this.setState({ message: 'All fields must be filled' })
    }

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
        console.log("This is the id: ", id)

      const blog = this.state.blogs.find(blog => blog.id === id)
        console.log("This is the blog.id", blog.id)
        console.log(blog.id === id)

      const blogObject = {
        user: blog.user,
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

  handleLogin = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  handleNewBlog = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {

    const renderMessage = () => (
    <Notification message={this.state.message} color={this.state.color} />
    )

    const loginForm = () => {
      return (
      <LoginForm
        login={this.login}
        handleLogin={this.handleLogin}
        username={this.state.username}
        password={this.state.password}
        error={renderMessage()}
      />
    )
    }

    const blogForm = () => {
      return (
        <div>
        <h2>Blogs</h2>
        <Logged user={this.state.user.name} logout={this.handleLogout}/>
        <Togglable buttonLabel="New blog">
        <Create
          create={this.handleNewBlog}
          submit={this.submit}
          title={this.state.title}
          author={this.state.author}
          url= {this.state.url}
          message={renderMessage()}
        />
        </Togglable>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog}>
            <BlogInfo
              key={blog.id}
              url={blog.url}
              likes={blog.likes}
              user={blog.user === undefined ? blog.user === null : blog.user.name}
              validate={this.state.user.name}
              like={this.like(blog.id)}
              remove={this.removeBlog(blog)}
            />
          </Blog>
        )}
        </div>
      )
    }

    return (
      <div>
        <h1>Blog App</h1>
        <div className="app">
        {this.state.user === null ?
        loginForm() :
        blogForm()
        }
        </div>
      </div>
    );
  }
}

export default App;
