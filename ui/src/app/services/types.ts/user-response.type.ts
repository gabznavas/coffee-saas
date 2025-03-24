export type UserResponse = {
  id: number
  fullName: string
  email: string
  profileImageUrl: string
  roles: string[]
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}