import React from 'react'
import { Create } from './Create'
import renderer from 'react-test-renderer'

describe('<Create />', () => {
  it('renders correctly', () => {

    const tree = renderer
      .create(<Create />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
