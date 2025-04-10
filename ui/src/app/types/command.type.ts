import { DiningTable } from "./dining-table.type"
import { User } from "./user.type"

export type CommandAttendent = {
  id: number
  fullName: string
}

export type Command = {
  id: number

  clientName: string
  diningTable: DiningTable
  attendent: CommandAttendent

  priceTotal: number

  openedAt: Date
  canceledIn: Date | null
  closedAt: Date | null
}