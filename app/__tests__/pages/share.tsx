/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Share from '../../pages/share'

describe('Share', () => {
  it('renders successfully', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Share />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
