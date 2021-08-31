/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, act } from '@testing-library/react'
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
    const { container } = render(
      <MockedProvider mocks={mockClientSideData} addTypename={false}>
        <Home serverSideData={mockServerSideData} />
      </MockedProvider>)

    expect(container).toMatchSnapshot()
  })

  it('shows the client side fetched message', async () => {
    await act(async() => {
      const { getByText } = render(
        <MockedProvider mocks={mockClientSideData} addTypename={false}>
          <Home serverSideData={mockServerSideData} />
        </MockedProvider>
      )

      await new Promise(resolve => setTimeout(resolve, 100))

      const clientSideMessage = getByText('This message was fetched from the graphql API on the client side: Hello from Apollo.')

      expect(clientSideMessage).toBeInTheDocument()
    })
  })
})
