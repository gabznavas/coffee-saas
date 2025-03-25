import { ProductCategoryResponse } from "./product-category-response.type"

export type ProductResponse = {
  id: number
  name: string
  description: string
  categoryId: number
  unitId: number
  stock: number
  createdAt: string
  updatedAt: string | null
}