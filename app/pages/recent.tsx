import { GetServerSideProps, NextPage } from 'next'
import LottieFilesList, {
  LOTTIE_FILES_LIST_PAGE_SIZE,
  LOTTIE_FILES_QUERY,
} from '../components/LottieFilesList'
import { initializeApollo } from '../lib/apollo-client'
import { LottieFile } from '../types'

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: LOTTIE_FILES_QUERY,
    variables: { offset: 0, limit: LOTTIE_FILES_LIST_PAGE_SIZE },
  })

  return {
    props: {
      firstPageLotties: data.lottieFiles.lotties,
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

type RecentPageProps = {
  firstPageLotties: [LottieFile]
}

const RecentPage: NextPage<RecentPageProps> = ({ firstPageLotties }) => {
  return (
    <div className="container mx-auto mb-10">
      <LottieFilesList firstPageLotties={firstPageLotties} />
    </div>
  )
}

export default RecentPage
