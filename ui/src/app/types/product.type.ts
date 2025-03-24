import { ProductCategory } from "./product-category.type"

export type Product = {
  id: number
  name: string
  description: string
  category: ProductCategory
  stock: number
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}