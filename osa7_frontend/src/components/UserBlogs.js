import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Header } from 'semantic-ui-react'

class UserBlogs extends React.Component {

  render() {
    const { user } = this.props
    let username = user.username
    let blogTitles = user.blogs === undefined ? [] : user.blogs
    console.log('blog titles: ', blogTitles)

    return (
      <div>
        <Header as="h3">Profile: <span className="username">{username}</span></Header>
        <List>
          <Header as="h4">Added blogs ({blogTitles.length}):</Header>
          {blogTitles.map(blog =>
            <List.Item
              key={blog._id}
              as={Link}
              to={`/blogs/${blog._id}`}
              icon='file outline'
              content={blog.title}
            />
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const ConnectedUserBlogs = connect(
  mapStateToProps,
  null
)(UserBlogs)

export default ConnectedUserBlogs
