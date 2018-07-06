import React from 'react'
import { Comments } from './Comments'
import renderer from 'react-test-renderer'

describe('<Comments />', () => {
  it('renders correctly', () => {
    const blog = {
      id: "5b392c65fa9613b090a7884b",
      likes: 5,
      title: "TechCrunch",
      author: "Michael Arrington & Keith Teare",
      url: "https://techcrunch.com/",
      user: {
        _id: "5b2fc1f7581f5d6dde0cabc2",
        username: "mikael"
      },
      comment: [
        {
          _id: "5b3990fd462d3cbd1e33d8d2",
          comment: "Very good!",
          date: "Sun Jul 01 2018 20:42:05 GMT-0600 (CST)"
        }
      ]
    }

    const tree = renderer
      .create(<Comments blog={blog} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
