import { useGetBoardById } from "@/ahooks/useBoard"
import { UserCard } from "@/components/UserCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useNavigate, useParams } from "react-router-dom"

const BoardID = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: board } = useGetBoardById(id as string)

  return (
    <div className="container">
      <Button
        variant="black_out"
        onClick={() => navigate("/")}
        className="mb-5 w-full sm:w-min"
      >
        Home
      </Button>

      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
        )}
      >
        {board?.users.map((item, idx) => (
          <UserCard key={idx} user={item} />
        ))}
      </div>
    </div>
  )
}

export default BoardID
