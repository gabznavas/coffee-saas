import { Product } from "./product.type"

export type CommandItem = {
  id: number
  commandId: number
  quantity: number
  price: number
  product: {
    id: number
    name: string
    price: number
  }
  observations: string
  createdAt: Date
  canceledIn: Date | null
}