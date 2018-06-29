import React from 'react'
import { connect } from 'react-redux'
import { removeBlog  } from '../reducers/singleBlogReducer'
import { blogsAfterRemove } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class BlogInfo extends React.Component {
remove = (id) => () => {
  console.log(id)
}

like = (id) => () => {
  console.log(id)
}

render() {
  const { blog, loggedUser } = this.props
  const username = blog.user === undefined ? null : blog.user.username
  console.log(loggedUser.username, username)

  const remove = (blog) => {
    return async () => {
      window.confirm(`Do you really want to delete blog "${blog.title}" by ${blog.author}?`)
      this.props.notify(`Blog titled "${blog.title}" by ${blog.author} has been deleted.`)
      this.props.removeBlog(blog.id)
      this.props.blogsAfterRemove(blog.id)
    }
  }

  const deleteButton = blog.user === false || username === loggedUser.username
    ? <button onClick={remove(blog)}>Delete</button>
    : null

  return (
    <div className="blog-info">
      <h3>{blog.title}</h3>
      <div>By: {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={this.like(blog.id)}>Like</button></div>
      <div>Added by {username}</div>
      {deleteButton}
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  removeBlog,
  blogsAfterRemove,
  notify
}

const ConnectedBlogInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogInfo)

export default ConnectedBlogInfo
