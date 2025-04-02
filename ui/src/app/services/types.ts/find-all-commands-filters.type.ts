import { CommandState } from "../../types/command-state.type"

export type FindAllCommandsFilters = {
  searchInput: string
  minDate: string
  maxDate: string
  minPrice: number
  maxPrice: number
  state: CommandState
  page: number,
  size: number,
  sortBy: string,
  orderBy: string
}