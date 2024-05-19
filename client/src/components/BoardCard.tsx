import { dateHelpers } from "@/lib/dateHelpers"
import { IBoard } from "../types/board"
import { DialogBoardForm } from "@/page/home/_components/DialogBoardForm"
import DialogDelete from "./DialogDelete"
import { useDeleteBoardById } from "@/ahooks/useBoard"
import { DialogUserForm } from "@/page/home/_components/DialogUserForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface BoardCardPropsType {
  board: IBoard
}

export const BoardCard = ({ board }: BoardCardPropsType) => {
  const { id, title, description, eventDate, organizer } = board

  const { mutate: deleteBoard } = useDeleteBoardById()
  const navigate = useNavigate()

  return (
    <div className="border-box w-full justify-between">
      <div className="px-6 pb-0 flex flex-col h-[100%]">
        <div className="text-h3 mb-4 line-clamp-6 ">{title}</div>
        <div className="mb-4 line-clamp-6 ">{organizer}</div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-muted">
            {dateHelpers.getDayMonthYear(eventDate)}
          </span>
        </div>
        <div className="text-s mb-1 line-clamp-6">{description}</div>

        <div className="flex gap-3 mb-3 mt-auto">
          <Button
            variant="black_out"
            onClick={() => navigate(`/board/${id}`)}
            className="w-full"
          >
            Viev
          </Button>
          <DialogUserForm boardId={id} />
        </div>
        <div className="flex gap-3 justify-between mb-3 ">
          <DialogDelete
            nameDelete="SomeItem"
            onClick={() => {
              deleteBoard(id)
            }}
          />
          <DialogBoardForm id={id} />
        </div>
      </div>
    </div>
  )
}
