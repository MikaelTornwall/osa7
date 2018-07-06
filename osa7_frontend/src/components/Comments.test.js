import React from 'react'
import { shallow } from 'enzyme'
import { Comments } from './Comments'

describe.only('<Comments />', () => {
  it ('renders comment and comment length from the blog object', () => {
    const blog = {
      id: "5b3932b50583b7b317bb1ca0",
      likes: 1,
      title: "Gary Veynerchuk",
      author: "Gary Veynerchuk",
      url: "https://www.garyvaynerchuk.com/blog/",
      user: {
        _id: "5b2fc201581f5d6dde0cabc3",
        username: "haloman"
      },
      comment: [
        {
          _id: "5b3932c40583b7b317bb1ca1",
          comment: "GaryVee!",
          date: "Sun Jul 01 2018 14:00:04 GMT-0600 (CST)"
        }
      ]
    }

    const commentsComponent = shallow(<Comments blog={blog} />)
    const commentDiv = commentsComponent.find('.comment')
    const headerSpan = commentsComponent.find('.comment-header')
    console.log(commentsComponent.debug())
    console.log(commentDiv.debug())
    expect(commentDiv.text()).toContain(blog.comment[0].comment)
    expect(headerSpan.text()).toContain(blog.comment.length)
  })
})
