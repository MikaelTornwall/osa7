import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationRenderer', () => {
  it('returns new state with action NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'NOTIFICATION',
      notification: 'Testing notificationReducer'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toContain(action.notification)
  })
})
