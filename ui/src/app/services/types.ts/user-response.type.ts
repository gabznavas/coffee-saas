import { RoleResponse } from "./role-response.type"

export type UserResponse = {
  id: number
  fullName: string
  email: string
  profileImageUrl: string
  roles: RoleResponse[]
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  disabledAt: string | null
}