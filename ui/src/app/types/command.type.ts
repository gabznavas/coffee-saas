import { DiningTable } from "./dining-table.type"

export type Command = {
  id: number

  clientName: string
  diningTable: DiningTable
  attendentId: number

  openedAt: Date
  canceledIn: Date | null
  closedAt: Date | null
}