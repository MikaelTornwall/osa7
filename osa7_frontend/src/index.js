import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import './index.css'
import store from './store'

console.log('Store state: ', store.getState())
store.subscribe(() => {
  const data = store.getState()
  console.log('Subscription: ', data)
})


const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
