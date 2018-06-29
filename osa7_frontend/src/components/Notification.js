import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    return (
      <p style={{ color: 'green' }}>{this.props.notification}</p>
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
