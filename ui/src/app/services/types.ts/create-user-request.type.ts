export type CreateUserRequest = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
  roleIds: number[]
}