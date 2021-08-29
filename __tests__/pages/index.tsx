/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Home from '../../pages/index'

describe('Home', () => {
  it('renders hello world', () => {
    const { getByText } = render(<Home />)

    const helloWorld = getByText('Hello world.')

    expect(helloWorld).toBeInTheDocument()
  })

  it('matches the snapshot', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
