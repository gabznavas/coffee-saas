import { CommandState } from "../../types/command-state.type"

export type FindAllCommandsFilters = {
  searchInput: string
  minDate: string
  maxDate: string
  state: CommandState
  page: number,
  size: number,
  sortBy: string,
  orderBy: string
}