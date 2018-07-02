import React from 'react'
import { addComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Comment, Header, Form, Button, Icon } from 'semantic-ui-react'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      comment: event.target.value
    })
  }

  render() {
    const { blog } = this.props
    const comments = blog.comment ? blog.comment.map(comment => comment) : []

    const newComment = () => {
      return async (event) => {
        event.preventDefault()
        const commentObject = {
          comment: this.state.comment,
          blogId: blog.id
        }
        this.props.notify(`Comment "${commentObject.comment}" added to blog "${blog.title}".`)
        this.setState({
          comment: ''
        })

        await this.props.addComment(commentObject)
      }
    }

    return (
      <Comment.Group size='large'>
        <Header as='h3' dividing>Comments ({comments.length})</Header>
        {comments.map(comment =>
          <Comment key={comment._id}>
            <Icon name='comment outline' />
            <Comment.Metadata>{comment.date}</Comment.Metadata>
            <Comment.Content>
              {comment.comment}
            </Comment.Content>
          </Comment>
        )}
        <br />
        <div>
          <Form reply onSubmit={newComment()}>
            <Form.TextArea name="comment" value={this.state.comment} onChange={this.handleChange} />
            <Button content='Comment' type='submit' icon='edit' color='teal' />
          </Form>
        </div>
      </Comment.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog
  }
}

const mapDispatchToProps = {
  addComment,
  notify
}

const ConnectedComments = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)

export default ConnectedComments
