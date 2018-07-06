import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Icon } from 'semantic-ui-react'

class Blog extends React.Component {

  render() {
    console.log('Blog finds these: ', this.props.blogsSorted)
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Blog ({this.props.blogsSorted.length})</Table.HeaderCell>
            <Table.HeaderCell>Added by</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.blogsSorted
            .map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Icon name='file outline' />
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Icon name='user circle' />
                  <Link className='username' to={`/users/${
                    blog.user._id
                      ? blog.user._id
                      : blog.user
                  }`}>
                    {blog.user.username
                      ? blog.user.username
                      : this.props.loggedUser.username}</Link>
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    )
  }
}

const sortedBlogs = (blogs) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes)
  return sorted
}

const mapStateToProps = (state) => {
  return{
    blogsSorted: sortedBlogs(state.blogs),
    loggedUser: state.loggedUser
  }
}

const ConnectedBlog = connect(
  mapStateToProps,
  null
)(Blog)

export default ConnectedBlog
