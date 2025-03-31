export type CommandResponse = {
  id: number

  clientName: string
  diningTableId: number
  attendentId: number

  openedAt: string
  canceledIn: string | null
  closedAt: string | null
}