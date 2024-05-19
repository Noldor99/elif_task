import { useGetBoard } from "@/ahooks/useBoard"
import { BoardCard } from "@/components/BoardCard"
import WrapPagination from "@/components/WrapPagination"

import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DialogBoardForm } from "./_components/DialogBoardForm"
import { Button } from "@/components/ui/button"
import { SortVariant } from "@/actions/client/boardAction"
import FilterSelect from "@/components/FilterSelect"

const Home = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const getResult = useGetBoard({
    enabled: true,
    params: {
      limit: "8",
      page: searchParams.get("page") || "1",
      sort: searchParams.get("sort") || SortVariant.all,
    },
  })

  const { data: boardData, refetch } = getResult

  useEffect(() => {
    refetch()
    window.scrollTo(0, 0)
  }, [refetch, searchParams])

  return (
    <div className="container">
      <div className="paper-sharp mb-4 flex sm:justify-between sm:items-center flex-col sm:flex-row gap-3">
        <div className="flex justify-between items-center gap-4">
          <DialogBoardForm />
          <FilterSelect
            arrValue={["standard", "title", "eventDate", "organizer"]}
            paramName="sort"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="black_out"
            onClick={() => navigate("/user")}
            className="w-full"
          >
            Users
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "paper-sharp",
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
        )}
      >
        {boardData?.boards.map((item, idx) => (
          <BoardCard key={idx} board={item} />
        ))}
      </div>
      {boardData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {boardData && boardData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={boardData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default Home
