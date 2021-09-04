/**
 * @jest-environment jsdom
 */

 import { render } from '@testing-library/react'
 import { MockedProvider } from '@apollo/client/testing'
import ShowLottieFilePage from '../../../pages/lotties/[slug]'

 describe('Share', () => {
   it('renders successfully when there is a lottie', () => {
     const lottie = {
      id: '4',
      slug: 'IDxl4QWcIVEWAtVTcF6ID',
      url: 'http://localhost:3001/local_file_store/IDxl4QWcIVEWAtVTcF6ID.json',
      createdAt: '1630786408304',
      updatedAt: '1630786408304'
    }

     const { container } = render(
       <MockedProvider mocks={[]} addTypename={false}>
         <ShowLottieFilePage lottieFile={lottie} />
       </MockedProvider>
     )

     expect(container).toMatchSnapshot()
   })

   it('renders successfully when the lottie is not found', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ShowLottieFilePage lottieFile={null} />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
   })
 })
