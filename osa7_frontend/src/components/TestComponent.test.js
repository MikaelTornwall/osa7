import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TestComponent from './TestComponent'
import Blog from './Blog'

describe('<Blog />', () => {
  let toggleComponent

  beforeEach(() => {
    const blog = {
      title: "Testing...",
      author: "Mikael",
      url: "https://localhost:3001",
      likes: 5,
      user: null
    }

    toggleComponent = shallow(
      <Blog blog={blog} buttonLabel="Text...">
        <div className="testDiv" />
      </Blog>
    )
    console.log(toggleComponent.debug())
  })

  it('renders its children', () => {
    expect(toggleComponent.contains(<div className="testDiv" />))
  })

  it('by default children are not visible', () => {
    const div = toggleComponent.find('.togglableContent')
    console.log(div.debug())

    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after onClick, children are displayed', () => {
    const clickDiv = toggleComponent.find('.toggleDiv')

    clickDiv.at(0).simulate('click')
    const div = toggleComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })
})

describe('<TestComponent />', () => {
  it('renders title, author and the number of likes', () => {
    const blog = {
      title: 'Toimiiko testi?',
      author: 'Mikael',
      likes: 5
    }

    const blogComponent = shallow(<TestComponent blog={blog} />)
    console.log(blogComponent.debug())

    const infoDiv = blogComponent.find('.blog-info')
    console.log(infoDiv.debug())

    const likesDiv = blogComponent.find('.blog-likes')
    console.log(likesDiv.debug())

    expect(infoDiv.text()).toContain(blog.title, blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the button calls event handler twice', () => {
    const blog = {
      title: 'Toimiiko testi?',
      author: 'Mikael',
      likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <TestComponent
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
