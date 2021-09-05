import { gql } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import { ShowLottieFile } from '../../components/ShowLottieFile'
import { initializeApollo } from '../../lib/apollo-client'
import { LottieFile } from '../../types'

export const GET_LOTTIE_FILE_QUERY = gql`
  query ($slug: String!) {
    lottieFile(slug: $slug) {
      id
      slug
      url
      createdAt
      updatedAt
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: GET_LOTTIE_FILE_QUERY,
    variables: { slug: query.slug },
  })

  return {
    props: {
      lottieFile: data.lottieFile as LottieFile | null,
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

type ShowLottieFilePageProps = {
  lottieFile: LottieFile | null
}

const ShowLottieFilePage: NextPage<ShowLottieFilePageProps> = ({
  lottieFile,
}) => {
  if (!lottieFile) {
    return <div>Lottie not found.</div>
  }

  return <ShowLottieFile lottieFile={lottieFile} />
}

export default ShowLottieFilePage
