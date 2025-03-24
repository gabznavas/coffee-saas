import { ProductCategoryResponse } from "./product-category-response.type"

export type ProductResponse = {
  id: number
  name: string
  description: string
  category: ProductCategoryResponse
  stock: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}