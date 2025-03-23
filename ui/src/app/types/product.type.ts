export type ProductCategory = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  description: string
  category: ProductCategory
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}