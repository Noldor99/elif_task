import { useSearchParams } from "react-router-dom"
import { Pagination } from "./Pagination"

interface WrapPaginationParam {
  totalCount: number
}

const WrapPagination = ({ totalCount }: WrapPaginationParam) => {
  const [searchParams] = useSearchParams()

  const initialPage = searchParams.get("page") || "1"

  return (
    <div>
      <Pagination
        totalCount={totalCount}
        currentPage={Number(initialPage)}
        items={8}
        count={8}
      />
    </div>
  )
}

export default WrapPagination
