export interface IBoards {
  totalCount: number
  boards: IBoard[]
}

export interface IBoard {
  id: string
  title: string
  organizer: string
  description: string
  eventDate: Date
  createdAt: Date
  updatedAt: Date
}
