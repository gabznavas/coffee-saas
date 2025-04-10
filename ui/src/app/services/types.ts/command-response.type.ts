import { DiningTableResponse } from "./table-response.type"

export type CommandAttendentResponse = {
  id: number
  fullName: string
}

export type CommandResponse = {
  id: number

  clientName: string
  diningTable: DiningTableResponse
  attendent: CommandAttendentResponse

  priceTotal: number

  openedAt: string
  canceledIn: string | null
  closedAt: string | null
}