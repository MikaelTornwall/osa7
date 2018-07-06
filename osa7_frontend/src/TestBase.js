import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import App from './App'
import { createStore } from 'redux'

export default TestBase = (state) => {
  const store = createStore(state)
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
  return [store, wrapper]
}
