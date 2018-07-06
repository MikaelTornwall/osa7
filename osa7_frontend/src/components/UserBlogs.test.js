import React from 'react'
import { shallow } from 'enzyme'
import { UserBlogs } from './UserBlogs'

describe('<UserBlogs />', () => {
  it('renders correctly', () => {
    const user =
      {
        id: "5b2fc201581f5d6dde0cabc3",
        username: "haloman",
        name: "haloman",
        adult: true,
        blogs: [
          {
            _id: "5b3932b50583b7b317bb1ca0",
            title: "Gary Veynerchuk",
            author: "Gary Veynerchuk",
            url: "https://www.garyvaynerchuk.com/blog/",
            likes: 1
          }
        ]
      }

    const userblogsComponent = shallow(<UserBlogs user={user} />)
    const usernameSpan = userblogsComponent.find('.username')
    const userblogsDiv = userblogsComponent.find('.userblogs')
    console.log('userblogsDiv: ', userblogsDiv.debug())
    expect(usernameSpan.text()).toContain(user.username)
    expect(userblogsDiv.length).toEqual(user.blogs.length)
  })
})
