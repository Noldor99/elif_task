import { useGetUserById } from "@/ahooks/useUser"

import { useState } from "react"

import { IconEdit } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { UserForm } from "./UserForm"

interface DialogRoomProps {
  id?: string | undefined
  boardId?: string | undefined
}

export function DialogUserForm({ id, boardId }: DialogRoomProps) {
  const { data: user, isFetched } = useGetUserById(id!)
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {id ? (
          <Button
            className="p-2"
            variant="black_out"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <IconEdit />
          </Button>
        ) : (
          <Button variant="black_out" className="w-full">
            Register
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-h2 mb-3 text-center font-normal">
            {id ? "Edit user" : "Create new user"}
          </DialogTitle>
        </DialogHeader>
        {id ? (
          isFetched && <UserForm user={user} handleClose={handleOpenChange} />
        ) : (
          <UserForm handleClose={handleOpenChange} boardId={boardId} />
        )}
      </DialogContent>
    </Dialog>
  )
}
