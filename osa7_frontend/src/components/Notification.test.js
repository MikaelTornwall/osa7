import React from 'react'
import { shallow } from 'enzyme'
import { Notification } from './Notification'

describe('<Notification />', () => {
  it('renders the notification', () => {
    const notification = {
      notification: 'Notification gets rendered'
    }

    const notificationComponent = shallow(<Notification notification={notification.notification} />)
    const notificationDiv = notificationComponent.find('.notification')

    expect(notificationDiv.text()).toContain(notification.notification)
  })
})
