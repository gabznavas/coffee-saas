export type Command = {
  id: number

  clientName: string
  diningTableId: number
  attendentId: number

  openedAt: Date
  canceledIn: Date | null
  closedAt: Date | null
}