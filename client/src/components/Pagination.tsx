import { useCallback, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hook/useMediaQuery"

type PaginationPropsType = {
  totalCount: number
  items: number
  count: number
  currentPage: number
  callback?: (page: number) => void
}

export const Pagination = ({
  totalCount,
  items,
  count,
  currentPage,
  callback,
}: PaginationPropsType) => {
  const totalPages = Math.ceil(totalCount / items)

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handlePrev = () => {
    if (currentPage > 1) {
      navigate(`?${createQueryString("page", (currentPage - 1).toString())}`)
      if (callback) {
        callback(currentPage - 1)
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`?${createQueryString("page", (currentPage + 1).toString())}`)
      if (callback) {
        callback(currentPage + 1)
      }
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    const startPage = Math.max(1, currentPage - Math.floor(count / 2))
    const endPage = Math.min(totalPages, startPage + count - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          variant="black_out"
          size={isSmallScreen ? "sm" : "default"}
          className={cn(i === +currentPage && "bg-black text-white")}
          key={i}
          onClick={() => {
            navigate(`?${createQueryString("page", i.toString())}`)
            if (callback) {
              callback(i)
            }
          }}
        >
          {i}
        </Button>
      )
    }

    return pageNumbers
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      navigate(`?${createQueryString("page", "1")}`)
      if (callback) {
        callback(1)
      }
    }
  }, [totalPages, currentPage, navigate, createQueryString, callback])

  const isSmallScreen = useMediaQuery("(max-width: 360px)")

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-4">
      {currentPage > 1 && (
        <Button
          size={isSmallScreen ? "sm" : "default"}
          variant="black_out"
          className={cn(currentPage === 1 && "hidden")}
          onClick={handlePrev}
        >
          {isSmallScreen ? "<" : "Prev"}
        </Button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <Button
          variant="black_out"
          size={isSmallScreen ? "sm" : "default"}
          className={cn(currentPage === totalPages && "hidden")}
          onClick={handleNext}
        >
          {isSmallScreen ? ">" : "Next"}
        </Button>
      )}
    </div>
  )
}
