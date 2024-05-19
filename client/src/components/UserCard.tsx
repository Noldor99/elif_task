import { dateHelpers } from "@/lib/dateHelpers"
import { IUser } from "../types/user"

interface UserCardPropsType {
  user: IUser
}

export const UserCard = ({ user }: UserCardPropsType) => {
  const { name, email, birth } = user

  return (
    <div className="paper-rounded w-full justify-between">
      <div className="px-6 pb-0 flex flex-col h-[100%]">
        <div className="text-h3 mb-4 line-clamp-6 ">{name}</div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-muted">
            {dateHelpers.getDayMonthYear(birth)}
          </span>
        </div>
        <div className="text-s mb-1 line-clamp-6">{email}</div>
      </div>
    </div>
  )
}
