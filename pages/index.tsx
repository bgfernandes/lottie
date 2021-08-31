import type { NextPage, GetServerSideProps } from 'next'
import { gql, useQuery } from '@apollo/client'
import client from '../apollo/client'

const HELLO_MESSAGE_QUERY = gql`
  query HelloMessage {
    hello {
      message
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const { data } = await client.query({
    query: HELLO_MESSAGE_QUERY,
  })

  return {
    props: { serverSideData: data },
  }
}

type HomeProps = {
  serverSideData: {
    hello: {
      message: String
    }
  }
}

const Home: NextPage<HomeProps> = ({ serverSideData }) => {
  const { data } = useQuery(HELLO_MESSAGE_QUERY)
  return (
    <div>
      Hello world.

      <p className="flex justify-center">
        This page is using tailwindcss.
      </p>

      <p>
        This message was fetched from the graphql API on the server side: { serverSideData.hello.message }
      </p>

      <p>
        This message was fetched from the graphql API on the client side: { data ? data.hello.message : 'loading' }
      </p>
    </div>
  )
}

export default Home
