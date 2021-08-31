/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import Home, { HELLO_MESSAGE_QUERY } from '../../pages/index'

const mockServerSideData = {
  hello: { message: 'Hello from Apollo.' }
}

const mockClientSideData = [
  {
    request: {
      query: HELLO_MESSAGE_QUERY
    },
    result: {
      data: {
        hello: { message: 'Hello from Apollo.' }
      }
    }
  }
]

describe('Home', () => {
  it('renders hello world', () => {
    const { getByText } = render(
      <MockedProvider mocks={mockClientSideData} addTypename={false}>
        <Home serverSideData={mockServerSideData} />
      </MockedProvider>
    )

    const helloWorld = getByText('Hello world.')

    expect(helloWorld).toBeInTheDocument()
  })

  it('matches the snapshot', () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockClientSideData} addTypename={false}>
        <Home serverSideData={mockServerSideData} />
      </MockedProvider>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('shows the client side fetched message', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mockClientSideData} addTypename={false}>
        <Home serverSideData={mockServerSideData} />
      </MockedProvider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))

    const clientSideMessage = getByText('This message was fetched from the graphql API on the client side: Hello from Apollo.')

    expect(clientSideMessage).toBeInTheDocument()
  })
})
