import React from 'react'
import { connect } from 'react-redux'

class UserBlogs extends React.Component {

  render() {
    const { user } = this.props
    let username = user.username
    let blogTitles = user.blogs === undefined ? [] : user.blogs
    console.log('blog titles: ', blogTitles)

    return (
      <div>
        <h3>{username}</h3>
        <div>
          <h3>Added blogs:</h3>
          {blogTitles.map(blog =>
            <div key={blog._id}>{blog.title}</div>
          )}
        </div>
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
