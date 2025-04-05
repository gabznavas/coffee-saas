import { ProductResponse } from "./product-response.type"

export type CommandItemResponse = {
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
  createdAt: string
  canceledIn: string | null
}