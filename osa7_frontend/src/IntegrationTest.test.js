import React from 'react'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
  beforeEach(() => {
    app = mount(<App />)
  })

  it('does not render blogs', () => {
    app.update()
    const loginComponent = app.find('.app')
    console.log('blogComponents.length is: ', loginComponent.length)
    expect(loginComponent.length).toEqual(1)
    expect(loginComponent.text()).toContain('Login')
  })
})

describe('when user is logged in', () => {
  beforeEach(() => {
    const user = {
      username: 'jami',
      token: '123123123123',
      name: 'jami'
    }

    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    app = mount(<App />)
  })

  it('renders all blogs', () => {
    console.log('loggedUser: ', localStorage.getItem('loggedUser'))
    app.update()
    const blogComponents = app.find('.blog')

    console.log(blogComponents.debug())
    console.log('Blogs: ', blogService.blogs)
    console.log('blogComponents: ', blogComponents)
    console.log('blogComponents length is: ', blogComponents.length)

    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})
})
