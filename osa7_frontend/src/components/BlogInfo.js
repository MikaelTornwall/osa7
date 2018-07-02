import React from 'react'
import Comments from './Comments'
import { removeBlog  } from '../reducers/singleBlogReducer'
import { blogsAfterRemove, addLike } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Icon, Button } from 'semantic-ui-react'

class BlogInfo extends React.Component {

  render() {
    const { blog, loggedUser } = this.props
    const username = blog.user === undefined ? null : blog.user.username
    console.log(loggedUser.username, username)

    const remove = (blog) => {
      return async () => {
        if (window.confirm(`Do you really want to delete blog "${blog.title}" by ${blog.author}?`)) {
        this.props.notify(`Blog titled "${blog.title}" by ${blog.author} has been deleted.`)
        this.props.removeBlog(blog.id)
        this.props.blogsAfterRemove(blog.id)}
      }
    }

    const like = (blog) => {
      return async () => {
        this.props.notify(`Blog "${blog.title}" has been upvoted.`)
        this.props.addLike(blog)
      }
    }

    const deleteButton = blog.user === false || username === loggedUser.username
      ? <button onClick={remove(blog)}>Delete</button>
      : null

    const blogInfo = () => (
      <div>
        <Card color='teal'>
          <Card.Content>
            <Card.Header>{blog.title} </Card.Header>
            <Card.Meta>Added by user
              <Link className="username" to={
                blog.user
                  ? `/users/${blog.user._id}`
                  : '#'
              }> {username}</Link>
            </Card.Meta>
            <br />
            <Card.Content>
              <Icon name='world' />&nbsp;<a className='website' href={blog.url}>{blog.url}</a></Card.Content>
            <Card.Content><Icon name='keyboard outline' />&nbsp;{blog.author}</Card.Content>
            <br />
            <Button color='red' size='mini' onClick={like(blog)}><Icon name='heart outline' /> {blog.likes}</Button>
          </Card.Content>
          {deleteButton}

        </Card>
        <Comments />
      </div>
    )

    return (
      this.props.blog === 'This blog is removed'
        ? <Redirect to="/" />
        : blogInfo()
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
  addLike,
  notify
}

const ConnectedBlogInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogInfo)

export default ConnectedBlogInfo
