export type Product = {
  id: number
  name: string
  description: string
  categoryId: number
  unitId: number
  stock: number
  price: number
  createdAt: Date
  updatedAt: Date | null
}