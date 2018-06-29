import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Blog extends React.Component {

  render() {
    console.log('Blog finds these: ', this.props.blogsSorted)
    return (
      <div>
        <h3>Bloglist</h3>
        <div>
          {this.props.blogsSorted
            .map(blog =>
              <div className="blog" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <p>{blog.title}</p>
                  <p>By: {blog.author}</p>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const sortedBlogs = (blogs) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes)
  return sorted
}

const mapStateToProps = (state) => {
  return{
    blogsSorted: sortedBlogs(state.blogs)
  }
}

const ConnectedBlog = connect(
  mapStateToProps,
  null
)(Blog)

export default ConnectedBlog
