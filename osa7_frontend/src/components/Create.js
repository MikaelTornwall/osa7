import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { create } from '../reducers/blogReducer'

export class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  submit = async (event) => {
    event.preventDefault()
    console.log('New blog submitted: ', this.state.title, this.state.author, this.state.url)
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      if (blogObject.title.length === 0 || blogObject.author.length === 0 || blogObject.url.length === 0) {
        this.props.notify('All fields must be filled')
        return
      }

      this.setState({
        title: '',
        author: '',
        url: ''
      })

      this.props.create(blogObject)
      this.props.notify(`A blog "${this.state.title}" by author ${this.state.author} has been created.`)
    } catch (exception) {
      this.props.notify('All fields must be filled')
    }
  }

  handleNewBlog = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h3>Create new blog</h3>
        <form onSubmit={this.submit}>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td><input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleNewBlog}
                /></td>
              </tr>
              <tr>
                <td>Author</td>
                <td><input
                  type="text"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleNewBlog}
                />
                </td>
              </tr>
              <tr>
                <td>Url</td>
                <td><input
                  type="url"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleNewBlog}
                />
                </td>
              </tr>
              <tr>
                <td></td>
                <td><input
                  type="submit"
                  value="Create"
                />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  notify,
  create
}

const ConnectedCreate = connect(
  null,
  mapDispatchToProps
)(Create)

export default ConnectedCreate
