import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

export class Notification extends React.Component {
  render() {
    return (
      <Message color='teal'><div className='notification'>{this.props.notification}</div></Message>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  null
)(Notification)

export default ConnectedNotification
