import { Pagination as PaginationComp } from '@material-ui/lab'

type PaginationProps = {
  total: number
  offset: number
  limit: number
  onOffsetChange: (_newOffset: number) => void
}

export default function Pagination({
  total,
  offset,
  limit,
  onOffsetChange,
}: PaginationProps) {
  const pages = Math.ceil(total / limit)
  const currentPage = Math.ceil(offset / limit)

  const onChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    const newOffset = (page - 1) * limit
    onOffsetChange(newOffset)
  }

  /*
    Details of the PaginationComp here: https://material-ui.com/api/pagination/
  */

  return (
    <div className="flex flex-row justify-center">
      <PaginationComp count={pages} page={currentPage} onChange={onChange} />
    </div>
  )
}
