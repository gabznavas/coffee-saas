import { DiningTableResponse } from "./table-response.type"

export type CommandResponse = {
  id: number

  clientName: string
  diningTable: DiningTableResponse
  attendentId: number

  openedAt: string
  canceledIn: string | null
  closedAt: string | null
}