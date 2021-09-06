import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Page from './Page'
import Loading from './Loading'
import Pagination from './Pagination'
import { LottieFile } from '../../types'

export const LOTTIE_FILES_QUERY = gql`
  query ($limit: Int!, $offset: Int!, $type: String) {
    lottieFiles(limit: $limit, offset: $offset, type: $type) {
      total
      lotties {
        id
        slug
        url
        createdAt
        updatedAt
      }
    }
  }
`

export const LOTTIE_FILES_LIST_PAGE_SIZE = 15

/*
  A list of lotties with pagination
  Will show as a grid in bigger screens
*/
export default function LottieFilesList({
  firstPageLotties,
}: {
  firstPageLotties: [LottieFile]
}) {
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: LOTTIE_FILES_LIST_PAGE_SIZE,
  })
  const { data, loading, error } = useQuery(LOTTIE_FILES_QUERY, {
    variables: { offset: pagination.offset, limit: pagination.limit },
  })

  const onOffsetChange = (newOffset: number) => {
    setPagination({ offset: newOffset, limit: pagination.limit })
  }

  let pageComp
  let paginationComp

  if (pagination.offset === 0) {
    pageComp = <Page lotties={firstPageLotties} />
    paginationComp = (
      <Pagination
        total={data?.lottieFiles?.total || 0}
        offset={pagination.offset}
        limit={pagination.limit}
        onOffsetChange={onOffsetChange}
      />
    )
  } else if (loading) {
    pageComp = <Loading />
    paginationComp = ''
  } else if (error) {
    pageComp = <span>{error.message}</span>
    paginationComp = ''
  } else {
    pageComp = <Page lotties={data.lottieFiles.lotties} />
    paginationComp = (
      <Pagination
        total={data.lottieFiles.total}
        offset={pagination.offset}
        limit={pagination.limit}
        onOffsetChange={onOffsetChange}
      />
    )
  }

  return (
    <div className="w-full md:w-2/3">
      {pageComp}
      {paginationComp}
    </div>
  )
}
