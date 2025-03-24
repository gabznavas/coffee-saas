export type Product = {
  id: number
  name: string
  description: string
  categoryName: string
  stock: number
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}