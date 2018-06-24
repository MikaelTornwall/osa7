import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

render() {
  const showWhenVisible = { display: this.state.visible ? '' : 'none' }

  return (
    <div className="blog">
  <div className="toggleDiv" onClick={this.toggleVisibility}>
    <p>{this.props.blog.title}</p> <p>By: <i>{this.props.blog.author}</i></p>
  </div>
    <div style={showWhenVisible} className="togglableContent">
      {this.props.children}
    </div>
  </div>
)
}
}

export default Blog
